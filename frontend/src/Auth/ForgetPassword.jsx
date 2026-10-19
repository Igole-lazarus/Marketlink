import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedEmail || !emailPattern.test(trimmedEmail)) {
      alert('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/api/auth/forgot-password`, {
        email: trimmedEmail,
      }, {
        withCredentials: true,
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      });

      setIsSent(true);
      alert(response.data.message || 'If an account exists for this email, a reset code has been sent.');
      navigate('/reset-password', { state: { email: trimmedEmail } });
    } catch (error) {
      if (error.response) {
        alert(`Request failed: ${error.response.data?.message || error.response.data?.error || 'Could not process request'}`);
      } else {
        alert('Could not connect to the server.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      backgroundColor: '#F9FAFB', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '40px', width: '100%',
        maxWidth: '440px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', border: '1px solid #F3F4F6', textAlign: 'center', boxSizing: 'border-box'
      }}>
        
        {/* Lock Icon */}
        <div style={{
          width: '48px', height: '48px', backgroundColor: '#EFF6FF', borderRadius: '12px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto', color: '#2563EB'
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>
        
        <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', margin: '0 0 8px 0', letterSpacing: '-0.025em' }}>
          Forgot Password
        </h2>
        
        {!isSent ? (
          <>
            <p style={{ fontSize: '15px', color: '#6B7280', margin: '0 0 28px 0' }}>
              Enter your email address and we'll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ textAlign: 'left' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required 
                    style={{ width: '100%', height: '46px', paddingLeft: '14px', borderRadius: '10px', border: '1px solid #D1D5DB', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              </div>
              
              <button type="submit" disabled={isLoading} style={{ width: '100%', height: '48px', backgroundColor: isLoading ? '#93C5FD' : '#2563EB', color: '#FFFFFF', fontSize: '16px', fontWeight: '600', border: 'none', borderRadius: '10px', cursor: isLoading ? 'not-allowed' : 'pointer', marginTop: '8px' }}>
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          </>
        ) : (
          <div style={{ backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '10px', padding: '20px', margin: '20px 0' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 10px auto', display: 'block' }}>
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <h3 style={{ color: '#065F46', margin: '0 0 8px 0', fontSize: '18px' }}>Email Sent</h3>
            <p style={{ color: '#047857', margin: 0, fontSize: '14px', lineHeight: '1.5' }}>
              If an account exists for <strong>{email}</strong>, you will receive password reset instructions.
            </p>
          </div>
        )}
        
        <p style={{ marginTop: '24px', marginBottom: '0', fontSize: '14px', color: '#6B7280' }}>
          Remember your password?{' '}
          <Link to="/login" style={{ color: '#2563EB', fontWeight: '600', textDecoration: 'none' }}>
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}