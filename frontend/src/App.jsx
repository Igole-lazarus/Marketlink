import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Auth/Login';
import Register from './Auth/Register';
import OtpVerification from './Auth/OtpVerification';
import './App.css';

// Role-Specific Dashboards
import AdminDashboard from './pages/admin/Dashboard';
import BuyerDashboard from './pages/buyer/Dashboard';
import SellerDashboard from './pages/seller/Dashboard';

// Security Component
import ProtectedRoute from './components/ProtectedRoute';

function Unauthorized() {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: "'Inter', sans-serif" }}>
      <h1 style={{ color: '#ef4444', fontSize: '36px' }}>403 - Access Denied</h1>
      <p style={{ color: '#64748b' }}>Your assigned role does not have permission to view this page.</p>
      <button 
        onClick={() => window.history.back()} 
        style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px' }}
      >
        Go Back
      </button>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route redirects to Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        {/* Admin Portal */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        {/* Seller Portal */}
        <Route element={<ProtectedRoute allowedRoles={['seller', 'admin']} />}>
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
        </Route>

        {/* Buyer Portal (Formerly Student Portal) */}
        <Route element={<ProtectedRoute allowedRoles={['buyer', 'seller', 'deliver', 'admin']} />}>
          <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
        </Route>

        {/* Fallback for the old dashboard path */}
        <Route path="/dashboard" element={<Navigate to="/buyer/dashboard" replace />} />
        
        {/* 404 Route */}
        <Route path="*" element={<div style={{ textAlign: 'center', marginTop: '100px' }}><h1>404 - Page Not Found</h1></div>} />
      </Routes>
    </Router>
  );
}

export default App;