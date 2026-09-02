import { useState } from 'react'; /*[cite: 2]*/
import { useNavigate, Link } from 'react-router-dom'; /*[cite: 2]*/

export default function Register() { /*[cite: 2]*/
  const [email, setEmail] = useState(''); /*[cite: 2]*/
  const [password, setPassword] = useState(''); /*[cite: 2]*/
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate(); /*[cite: 2]*/

  const handleRegister = async (e) => { /*[cite: 2]*/
    e.preventDefault(); /*[cite: 2]*/
    
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try { /*[cite: 2]*/
      const response = await fetch('http://localhost:5000/api/auth/register', { /*[cite: 2]*/
        method: 'POST', /*[cite: 2]*/
        headers: { /*[cite: 2]*/
          'Content-Type': 'application/json', /*[cite: 2]*/
        }, /*[cite: 2]*/
        body: JSON.stringify({ email, password }), /*[cite: 2]*/
      }); /*[cite: 2]*/

      const data = await response.json(); /*[cite: 2]*/

      if (response.ok) { /*[cite: 2]*/
        alert("Registration successful! You can now log in."); /*[cite: 2]*/
        navigate('/login'); /*[cite: 2]*/
      } else { /*[cite: 2]*/
        alert(`Registration failed: ${data.message}`); /*[cite: 2]*/
      } /*[cite: 2]*/
    } catch (error) { /*[cite: 2]*/
      console.error("Failed to connect to server:", error); /*[cite: 2]*/
      alert("Could not connect to the server. Make sure your Node backend is running!"); /*[cite: 2]*/
    } /*[cite: 2]*/
  }; /*[cite: 2]*/

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' 
    }}>
      <div style={{ width: '100%', maxWidth: '440px', padding: '20px' }}>
        
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: '0 0 8px 0' }}>
          Get started with MarketLink
        </h2>
        <p style={{ fontSize: '15px', color: '#2a62d3', margin: '0 0 32px 0' }}>
          Configure your secure platform environment in under 2 minutes.
        </p>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
          <button type="button" style={{ 
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', 
            padding: '10px', backgroundColor: '#ffffff', border: '1px solid #e5e7eb', 
            borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', color: '#195cc7' 
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m15 9-6 6"></path><path d="m9 9 6 6"></path></svg>
            Google
          </button>
          <button type="button" style={{ 
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', 
            padding: '10px', backgroundColor: '#ffffff', border: '1px solid #e5e7eb', 
            borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', color: '#286bd7' 
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"></path><path d="M10 2c1 .5 2 2 2 5"></path></svg>
            Apple
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', margin: '24px 0' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }}></div>
          <span style={{ padding: '0 12px', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>
            OR SIGN UP WITH EMAIL
          </span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }}></div>
        </div>

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}> {/*[cite: 2]*/}
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>Full Name</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <div style={{ position: 'absolute', left: '12px', color: '#2250aa', display: 'flex' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
              <input 
                type="text" 
                placeholder="e.g. Sarah Connor" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{ width: '100%', padding: '12px 12px 12px 40px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '15px', color: '#374151', boxSizing: 'border-box', outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>Email Address</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <div style={{ position: 'absolute', left: '12px', color: '#2554b2', display: 'flex' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
              </div>
              <input 
                type="email" 
                placeholder="you@company.com" 
                value={email} /*[cite: 2]*/
                onChange={(e) => setEmail(e.target.value)} /*[cite: 2]*/
                required /*[cite: 2]*/
                style={{ width: '100%', padding: '12px 12px 12px 40px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '15px', color: '#374151', boxSizing: 'border-box', outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>Password</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <div style={{ position: 'absolute', left: '12px', color: '#1f4ba3', display: 'flex' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </div>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="At least 8 characters" 
                value={password} /*[cite: 2]*/
                onChange={(e) => setPassword(e.target.value)} /*[cite: 2]*/
                required /*[cite: 2]*/
                style={{ width: '100%', padding: '12px 40px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '15px', color: '#374151', boxSizing: 'border-box', outline: 'none' }}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '12px', background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', display: 'flex', padding: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path><line x1="2" x2="22" y1="2" y2="22"></line></svg>
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>Confirm Password</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <div style={{ position: 'absolute', left: '12px', color: '#1f53bc', display: 'flex' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </div>
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                placeholder="Re-enter your password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '12px 40px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '15px', color: '#374151', boxSizing: 'border-box', outline: 'none' }}
              />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ position: 'absolute', right: '12px', background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', display: 'flex', padding: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path><line x1="2" x2="22" y1="2" y2="22"></line></svg>
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
            <input type="checkbox" id="terms" required style={{ width: '16px', height: '16px', borderRadius: '4px', border: '1px solid #d1d5db' }} />
            <label htmlFor="terms" style={{ fontSize: '14px', color: '#286bc9' }}>
              I agree to the <a href="#" style={{ color: '#2563eb', textDecoration: 'none' }}>Terms of Service</a> and <a href="#" style={{ color: '#2563eb', textDecoration: 'none' }}>Privacy Policy</a>.
            </label>
          </div>

          <button type="submit" style={{ 
            width: '100%', padding: '12px', backgroundColor: '#2563eb', color: 'white', 
            border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '15px', 
            cursor: 'pointer', marginTop: '8px'
          }}>
            Create Account
          </button> {/*[cite: 2]*/}
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#254fa3' }}>
          Already have an account? <Link to="/login" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '600' }}>Sign in</Link> {/*[cite: 2]*/}
        </p>
      </div>
    </div>
  );
} /*[cite: 2]*/