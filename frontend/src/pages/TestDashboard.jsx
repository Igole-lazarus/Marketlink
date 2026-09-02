import { useNavigate } from 'react-router-dom'; /*[cite: 3]*/

export default function TestDashboard() { /*[cite: 3]*/
  const navigate = useNavigate(); /*[cite: 3]*/

  const handleLogout = () => { /*[cite: 3]*/
    // Later, you'll clear tokens from local storage here[cite: 3]
    navigate('/login'); /*[cite: 3]*/
  };

  return (
    <div style={styles.container}>
      {/* Sidebar Navigation */}
      <aside style={styles.sidebar}>
        <div style={styles.logoContainer}>
          <div style={styles.logoBox}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
          </div>
          <div style={styles.logoText}>
            <span style={styles.logoTitle}>MarketLink</span>
            <span style={styles.logoSubtitle}>Enterprise ERP</span>
          </div>
        </div>

        <nav style={styles.navMenu}>
          <a href="#overview" style={{ ...styles.navItem, ...styles.navItemActive }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            Overview
          </a>
          <a href="#analytics" style={styles.navItem}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
            Analytics
          </a>
          <a href="#marketplace" style={styles.navItem}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            Marketplace
          </a>
          <a href="#integrations" style={styles.navItem}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
            Integrations
          </a>
          <a href="#settings" style={styles.navItem}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            Settings
          </a>
        </nav>

        <div style={styles.sidebarFooter}>
          <div style={styles.userProfile}>
            <div style={styles.avatar}>JD</div>
            <div style={styles.userInfo}>
              <span style={styles.userName}>John Doe</span>
              <span style={styles.userEmail}>john@marketlink.com</span>
            </div>
          </div>
          <button style={styles.logoutButton} onClick={handleLogout} title="Logout"> {/*[cite: 3]*/}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={styles.mainContent}>
        {/* Header Bar */}
        <header style={styles.header}>
          <div>
            <span style={styles.bagde}>Test Dashboard</span> {/*[cite: 3]*/}
            <h1 style={styles.title}>Marketlink</h1> {/*[cite: 3]*/}
            <p style={styles.description}>Easy. Safety. Reliability.</p> {/*[cite: 3]*/}
          </div>
          <div style={styles.headerActions}>
            <div style={styles.searchBar}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input type="text" placeholder="Search analytics..." style={styles.searchInput} />
            </div>
            <button style={styles.primaryButton}>+ New Link</button>
          </div>
        </header>

        {/* Dashboard Grid Content */}
        <div style={styles.grid}>
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <span style={styles.cardTitle}>Total Active Links</span>
              <span style={styles.badgeSuccess}>+12.5%</span>
            </div>
            <div style={styles.cardValue}>1,284</div>
            <p style={styles.cardSubtext}>Active connections across networks</p>
          </div>

          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <span style={styles.cardTitle}>System Security Status</span>
              <span style={styles.badgePrimary}>Protected</span>
            </div>
            <div style={styles.cardValue}>99.98%</div>
            <p style={styles.cardSubtext}>Uptime guarantee verified</p>
          </div>

          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <span style={styles.cardTitle}>Daily Transactions</span>
              <span style={styles.badgeSuccess}>+8.1%</span>
            </div>
            <div style={styles.cardValue}>$42,850</div>
            <p style={styles.cardSubtext}>Processed via MarketLink relay</p>
          </div>
        </div>

        {/* Workspace Card Container */}
        <div style={styles.workspaceCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0, color: '#111827', fontSize: '18px' }}>Active Connections</h3>
            <button style={styles.secondaryButton}>View All</button>
          </div>
          <div style={styles.tablePlaceholder}>
            <p style={{ color: '#6b7280', margin: 0, fontSize: '14px' }}>
              All systems operating normally. Workspace metrics ready to display.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    backgroundColor: '#f8fafc',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  sidebar: {
    width: '260px',
    backgroundColor: '#0f172a',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '1.5rem 1rem',
    borderRight: '1px solid #1e293b',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '2rem',
    padding: '0 0.5rem',
  },
  logoBox: {
    width: '36px',
    height: '36px',
    backgroundColor: '#2563eb',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    display: 'flex',
    flexDirection: 'column',
  },
  logoTitle: {
    fontWeight: '700',
    fontSize: '16px',
    color: '#ffffff',
    lineHeight: '1.2',
  },
  logoSubtitle: {
    fontSize: '11px',
    color: '#94a3b8',
  },
  navMenu: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    flex: 1,
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1rem',
    color: '#94a3b8',
    textDecoration: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s',
  },
  navItemActive: {
    backgroundColor: '#1e293b',
    color: '#38bdf8',
  },
  sidebarFooter: {
    borderTop: '1px solid #1e293b',
    paddingTop: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userProfile: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  avatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#334155',
    color: '#38bdf8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: '14px',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  userName: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#f8fafc',
  },
  userEmail: {
    fontSize: '11px',
    color: '#64748b',
  },
  logoutButton: {
    background: 'none',
    border: 'none',
    color: '#94a3b8',
    cursor: 'pointer',
    padding: '0.5rem',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
  },
  mainContent: {
    flex: 1,
    padding: '2rem 2.5rem',
    overflowY: 'auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '2rem',
  },
  bagde: {
    display: 'inline-block',
    marginBottom: '0.5rem',
    color: '#2563eb',
    fontWeight: '600',
    fontSize: '13px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  title: {
    margin: '0 0 0.25rem',
    fontSize: '28px',
    fontWeight: '700',
    color: '#0f172a',
  },
  description: {
    margin: 0,
    color: '#16a34a',
    fontSize: '14px',
    fontWeight: '500',
  },
  headerActions: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '0.5rem 0.75rem',
    width: '220px',
  },
  searchInput: {
    border: 'none',
    outline: 'none',
    fontSize: '14px',
    width: '100%',
    color: '#0f172a',
  },
  primaryButton: {
    padding: '0.6rem 1.25rem',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
  },
  secondaryButton: {
    padding: '0.4rem 0.8rem',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    backgroundColor: '#ffffff',
    color: '#475569',
    fontSize: '13px',
    cursor: 'pointer',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  card: {
    padding: '1.5rem',
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  cardTitle: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#64748b',
  },
  badgeSuccess: {
    backgroundColor: '#dcfce7',
    color: '#16a34a',
    fontSize: '12px',
    fontWeight: '600',
    padding: '0.2rem 0.5rem',
    borderRadius: '12px',
  },
  badgePrimary: {
    backgroundColor: '#dbeafe',
    color: '#2563eb',
    fontSize: '12px',
    fontWeight: '600',
    padding: '0.2rem 0.5rem',
    borderRadius: '12px',
  },
  cardValue: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: '0.25rem',
  },
  cardSubtext: {
    margin: 0,
    fontSize: '12px',
    color: '#94a3b8',
  },
  workspaceCard: {
    padding: '1.5rem',
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
  },
  tablePlaceholder: {
    padding: '3rem 1.5rem',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    border: '1px dashed #cbd5e1',
    textAlign: 'center',
  },
};