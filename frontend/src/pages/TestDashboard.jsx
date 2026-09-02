import { useNavigate } from 'react-router-dom';

export default function TestDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Later, you'll clear tokens from local storage here
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <span style={styles.bagde}>Test Dashboard</span>
        <h1 style={styles.title}>Marketlink </h1>
        <p style={styles.description}>
          Easy. Safety. Reliability.
        </p>
        
        <button style={styles.button} onClick={handleLogout} color="primary">
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6',
    padding: '2rem',
  },
  card: {
    maxWidth: '600px',
    padding: '2rem',
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  bagde: {
    display: 'inline-block',
    marginBottom: '1rem',
    color: '#2563eb',
    fontWeight: '600',
  },
  title: {
    margin: '0 0 1rem',
  },
  description: {
    marginBottom: '1.5rem',
    color: '#1eaf47',
    lineHeight: 1.5,
  },
  button: {
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    cursor: 'pointer',
  },
};