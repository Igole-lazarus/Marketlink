import { useState } from 'react'; /*[cite: 1] */
import { useNavigate, Link } from 'react-router-dom'; /*[cite: 1] */

export default function Login() {
  const [email, setEmail] = useState(''); /*[cite: 1] */
  const [password, setPassword] = useState(''); /*[cite: 1] */
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); /*[cite: 1] */

  const handleLogin = async (e) => {
    e.preventDefault(); /*[cite: 1] */
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', { /*[cite: 1] */
        method: 'POST', /*[cite: 1] */
        headers: {
          'Content-Type': 'application/json', /*[cite: 1] */
        },
        body: JSON.stringify({ email, password }), /*[cite: 1] */
      });

      const data = await response.json(); /*[cite: 1] */

      if (response.ok) { /*[cite: 1] */
        // In a full production app, you would save a JWT token here[cite: 1]
        alert("Login successful!"); /*[cite: 1] */
        navigate('/dashboard'); // Sends them to the protected page[cite: 1]
      } else {
        alert(`Login failed: ${data.message}`); /*[cite: 1] */
      }
    } catch (error) {
      console.error("Failed to connect to server:", error); /*[cite: 1] */
      alert("Could not connect to the server. Make sure your Node backend is running!"); /*[cite: 1] */
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(180deg, #1e3a8a 0%, #60a5fa 50%, #1e3a8a 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    }}>
      <div style={{
        backgroundColor: '#18181b',
        padding: '40px',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '420px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}>
        <h2 style={{ color: '#ffffff', margin: '0 0 8px 0', fontSize: '28px', fontWeight: '700' }}>
          Welcome back
        </h2>
        <p style={{ color: '#a1a1aa', margin: '0 0 32px 0', fontSize: '15px' }}>
          Enter your credentials to access your account
        </p>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}> {/*[cite: 1] */}
          
          {/* Email Input */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: '#ffffff', fontSize: '14px', fontWeight: '600' }}>Email address</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <div style={{ position: 'absolute', left: '14px', color: '#a1a1aa', display: 'flex' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
              </div>
              <input 
                type="email" 
                placeholder="hello@apex.design" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} /*[cite: 1] */
                required /*[cite: 1] */
                style={{ 
                  width: '100%', 
                  padding: '12px 12px 12px 42px', 
                  backgroundColor: '#18181b', 
                  border: '1px solid #27272a', 
                  borderRadius: '8px', 
                  color: '#ffffff',
                  fontSize: '15px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          {/* Password Input */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: '#ffffff', fontSize: '14px', fontWeight: '600' }}>Password</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <div style={{ position: 'absolute', left: '14px', color: '#3b82f6', display: 'flex' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••••••" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} /*[cite: 1] */
                required /*[cite: 1] */
                style={{ 
                  width: '100%', 
                  padding: '12px 48px 12px 42px', 
                  backgroundColor: '#18181b', 
                  border: '1px solid #3b82f6', 
                  borderRadius: '8px', 
                  color: '#ffffff',
                  fontSize: '15px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              <div style={{ position: 'absolute', right: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '1px', height: '16px', backgroundColor: '#3f3f46' }}></div>
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ background: 'none', border: 'none', color: '#71717a', cursor: 'pointer', padding: 0, display: 'flex' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                    <line x1="2" x2="22" y1="2" y2="22"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-10px' }}>
            <a href="#" style={{ color: '#3b82f6', fontSize: '14px', textDecoration: 'none', fontWeight: '500' }}>Forgot password?</a>
          </div>

          <button type="submit" style={{ 
            width: '100%', 
            padding: '12px', 
            cursor: 'pointer', 
            backgroundColor: '#2563eb', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px', 
            fontWeight: '600',
            fontSize: '15px',
            marginTop: '10px',
            transition: 'background-color 0.2s'
          }}>
            Sign In
          </button> {/*[cite: 1] */}
        </form>

        <div style={{ height: '1px', backgroundColor: '#27272a', margin: '32px 0 24px 0' }}></div>

        <p style={{ textAlign: 'center', color: '#a1a1aa', fontSize: '14px', margin: 0 }}>
          Don't have an account? <Link to="/register" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: '600' }}>Log in</Link> {/*[cite: 1] */}
        </p>
      </div>
    </div>
  );
}