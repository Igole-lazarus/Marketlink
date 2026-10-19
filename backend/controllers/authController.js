// controllers/authController.js
const Staff = require('../models/Staff');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendOTPEmail = require('../utils/sendEmail');

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());

// Registration Controller
exports.registerStaff = async(req, res) => {
    try {
        const { email, password, name, role } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const userExists = await Staff.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const otp = generateOTP();

        // Allow selection only from supported roles; default to 'buyer'.
        const assignedRole = ['admin', 'seller', 'buyer'].includes(role) ? role : 'buyer';

        const newStaff = new Staff({
            email,
            password: hashedPassword,
            name: name || 'New User',
            department: 'Data Annotation',
            role: assignedRole,
            otp: otp,
            otpExpiry: Date.now() + 10 * 60 * 1000 // 10 minutes
        });

        await newStaff.save();

        if (process.env.NODE_ENV !== 'test') {
            await sendOTPEmail(email, otp);
        }

        res.status(201).json({
            message: 'Registration successful. Please verify your OTP.',
            requiresOTP: true,
            email: newStaff.email
        });
    } catch (error) {
        console.error('Error in register route:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

// Login Controller
exports.loginStaff = async(req, res) => {
    try {
        const { email, password } = req.body;

        const staff = await Staff.findOne({ email });
        if (!staff) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, staff.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        if (!['admin', 'seller', 'buyer'].includes(staff.role)) {
            staff.role = 'buyer';
        }

        const otp = generateOTP();
        staff.otp = otp;
        staff.otpExpiry = Date.now() + 10 * 60 * 1000;
        await staff.save();

        if (process.env.NODE_ENV !== 'test') {
            await sendOTPEmail(staff.email, otp);
        }

        res.status(200).json({
            message: 'Credentials valid. OTP sent to email.',
            requiresOTP: true,
            email: staff.email
        });
    } catch (error) {
        console.error('Error in login route:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
};

// OTP Verification Controller
exports.verifyOTP = async(req, res) => {
    try {
        const { email, otp } = req.body;

        const staff = await Staff.findOne({ email });

        if (!staff || staff.otp !== otp) {
            return res.status(400).json({ error: 'Invalid OTP' });
        }

        if (staff.otpExpiry < Date.now()) {
            return res.status(400).json({ error: 'OTP has expired' });
        }

        staff.otp = null;
        staff.otpExpiry = null;
        staff.isVerified = true;
        await staff.save();

        if (req.session) {
            req.session.userId = staff._id.toString();
        }

        // Include role directly into JWT token payload
        const token = jwt.sign({ id: staff._id, role: staff.role },
            process.env.JWT_SECRET || 'supersecretkey', { expiresIn: '1d' }
        );

        res.status(200).json({
            message: 'Authentication successful',
            token,
            user: {
                id: staff._id,
                email: staff.email,
                name: staff.name,
                role: staff.role
            }
        });
    } catch (error) {
        console.error('Error in verify route:', error);
        res.status(500).json({ error: 'Server error during verification' });
    }
};

exports.approveBuyerToSeller = async(req, res) => {
    try {
        const { userId } = req.params;

        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const staff = await Staff.findById(userId);
        if (!staff) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (staff.role !== 'buyer') {
            return res.status(409).json({ message: 'Only buyer accounts can be verified as sellers' });
        }

        if (!staff.isVerified) {
            return res.status(409).json({ message: 'The buyer must verify their email before seller approval' });
        }

        staff.role = 'seller';
        await staff.save();

        return res.status(200).json({
            message: 'Buyer verified as seller successfully',
            user: {
                _id: staff._id,
                name: staff.name,
                email: staff.email,
                role: staff.role,
                createdAt: staff.createdAt,
                isVerified: staff.isVerified
            }
        });
    } catch (error) {
        console.error('Error approving buyer as seller:', error);
        return res.status(500).json({ message: 'Could not verify this buyer as a seller' });
    }
};

exports.forgotPassword = async(req, res) => {
    try {
        const email = String(req.body.email || '').trim().toLowerCase();

        if (!email || !isValidEmail(email)) {
            return res.status(400).json({ message: 'Please enter a valid email address.' });
        }

        const staff = await Staff.findOne({ email });

        if (!staff) {
            return res.status(200).json({
                message: 'If an account exists for this email, a reset code has been sent.'
            });
        }

        const otp = generateOTP();
        staff.otp = otp;
        staff.otpExpiry = Date.now() + 10 * 60 * 1000;
        await staff.save();

        if (process.env.NODE_ENV !== 'test') {
            await sendOTPEmail(staff.email, otp);
        }

        res.status(200).json({
            message: 'If an account exists for this email, a reset code has been sent.',
            email: staff.email
        });
    } catch (error) {
        console.error('Error in forgot password route:', error);
        res.status(500).json({ message: 'Server error while processing password reset request' });
    }
};

exports.resetPassword = async(req, res) => {
    try {
        const { email, otp, password, confirmPassword } = req.body;
        const normalizedEmail = String(email || '').trim().toLowerCase();

        if (!normalizedEmail || !isValidEmail(normalizedEmail)) {
            return res.status(400).json({ message: 'Please provide a valid email address.' });
        }

        if (!otp || String(otp).trim().length !== 6) {
            return res.status(400).json({ message: 'Please enter the 6-digit reset code.' });
        }

        if (!password || password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match.' });
        }

        const staff = await Staff.findOne({ email: normalizedEmail });

        if (!staff) {
            return res.status(400).json({ message: 'We could not find an account with that email.' });
        }

        if (staff.otp !== String(otp).trim()) {
            return res.status(400).json({ message: 'The reset code is invalid.' });
        }

        if (!staff.otpExpiry || staff.otpExpiry < Date.now()) {
            return res.status(400).json({ message: 'The reset code has expired. Please request a new one.' });
        }

        const salt = await bcrypt.genSalt(10);
        staff.password = await bcrypt.hash(password, salt);
        staff.otp = null;
        staff.otpExpiry = null;
        await staff.save();

        res.status(200).json({
            message: 'Password reset successful. Please log in with your new password.'
        });
    } catch (error) {
        console.error('Error in reset password route:', error);
        res.status(500).json({ message: 'Server error while resetting password' });
    }
};