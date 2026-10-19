import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Auth/Login';
import Register from './Auth/Register';
import ForgotPassword from './Auth/ForgetPassword';
import ResetPassword from './Auth/ResetPassword';
import OtpVerification from './Auth/OtpVerification';
import './App.css';

// Role-Specific Dashboards
import AdminDashboard from './pages/admin/AdminDashboard';
import BuyerDashboard from './pages/buyer/BuyerDashboard';
import SellerDashboard from './pages/seller/SellerDashboard';

// Security Component
import ProtectedRoute from './components/ProtectedRoute';

const getDashboardPathByRole = (role) => {
  const normalizedRole = String(role || '').toLowerCase();

  if (normalizedRole === 'admin') return '/admin/dashboard';
  if (normalizedRole === 'seller') return '/seller/dashboard';
  if (normalizedRole === 'buyer') return '/buyer/dashboard';
  return '/login';
};

function DashboardRedirect() {
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem('user_data') || 'null');
  } catch (error) {
    console.error('Could not read the signed-in user:', error);
  }

  return <Navigate to={getDashboardPathByRole(user?.role)} replace />;
}

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
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        {/* Admin Portal */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        {/* Seller Portal */}
        <Route element={<ProtectedRoute allowedRoles={['seller']} />}>
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
        </Route>

        {/* Buyer Portal */}
        <Route element={<ProtectedRoute allowedRoles={['buyer']} />}>
          <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
        </Route>

        {/* Fallback for the old dashboard path */}
        <Route path="/dashboard" element={<DashboardRedirect />} />
        
        {/* 404 Route */}
        <Route path="*" element={<div style={{ textAlign: 'center', marginTop: '100px' }}><h1>404 - Page Not Found</h1></div>} />
      </Routes>
    </Router>
  );
}

export default App;