import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [accountsLoading, setAccountsLoading] = useState(true);
  const [accountsError, setAccountsError] = useState('');
  const [accountsNotice, setAccountsNotice] = useState('');
  const [updatingAccountId, setUpdatingAccountId] = useState(null);

  const [stats] = useState({
    totalGMV: '$42,500',
    pendingApprovals: 5,
  });

  const [pendingSellers, setPendingSellers] = useState([
    { id: 101, storeName: 'LuxeGlam Boutique', owner: 'Jane Doe', email: 'jane@luxeglam.com', date: '2026-09-28' },
    { id: 102, storeName: 'Urban Tech Hub', owner: 'Alex Smith', email: 'alex@urbantech.com', date: '2026-09-30' },
    { id: 103, storeName: 'Fresh Harvest Organics', owner: 'Samuel Green', email: 'sam@harvest.org', date: '2026-10-01' },
  ]);

  const [recentLogs] = useState([
    { id: 1, action: 'User #409 registered as Buyer', time: '10 mins ago', type: 'info' },
    { id: 2, action: 'Seller #88 posted new product catalog', time: '25 mins ago', type: 'info' },
    { id: 3, action: 'Payout processed for Seller #12 ($1,240.00)', time: '1 hour ago', type: 'success' },
    { id: 4, action: 'Flagged review resolved by Admin', time: '3 hours ago', type: 'warning' },
  ]);

  useEffect(() => {
    const controller = new AbortController();
    const token = localStorage.getItem('jwt_token');

    if (!token) {
      setAccountsError('Please log in again to view accounts.');
      setAccountsLoading(false);
      return () => controller.abort();
    }

    axios.get(`${BACKEND_URL}/api/auth/admin/users`, {
      signal: controller.signal,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': 'true',
      },
    }).then((response) => {
      setAccounts(Array.isArray(response.data) ? response.data : []);
      setAccountsError('');
    }).catch((error) => {
      if (!controller.signal.aborted) {
        setAccountsError(error.response?.data?.message || 'Could not load accounts.');
      }
    }).finally(() => {
      if (!controller.signal.aborted) {
        setAccountsLoading(false);
      }
    });

    return () => controller.abort();
  }, []);

  const activeSellers = accounts.filter((account) => account.role === 'seller').length;

  const handleVerifySeller = async (account) => {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      setAccountsError('Please log in again to verify accounts.');
      return;
    }

    setUpdatingAccountId(account._id);
    try {
      const response = await axios.patch(
        `${BACKEND_URL}/api/auth/admin/users/${account._id}/approve-seller`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'true',
          },
        }
      );

      setAccounts((currentAccounts) => currentAccounts.map((currentAccount) => (
        currentAccount._id === account._id ? { ...currentAccount, ...response.data.user } : currentAccount
      )));
      setAccountsNotice(`${account.name || account.email} is now a seller. They must sign in again to access the seller dashboard.`);
    } catch (error) {
      window.alert(error.response?.data?.message || 'Could not verify this buyer as a seller.');
    } finally {
      setUpdatingAccountId(null);
    }
  };

  const handleApprove = (id) => {
    setPendingSellers(pendingSellers.filter((s) => s.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_data');
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.brand}>
          <h2>MarketLink</h2>
          <span style={styles.badgeAdmin}>ADMIN PORTAL</span>
        </div>
        <nav style={styles.nav}>
          <a href="#overview" style={{ ...styles.navLink, ...styles.navLinkActive }}>Overview</a>
          <a href="#users" style={styles.navLink}>User Management</a>
          <a href="#sellers" style={styles.navLink}>Seller Approvals</a>
          <a href="#finance" style={styles.navLink}>Transactions & GMV</a>
          <a href="#settings" style={styles.navLink}>Platform Settings</a>
        </nav>
        <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
      </aside>

      {/* Main Content */}
      <main style={styles.main}>
        <header style={styles.header}>
          <div>
            <h1 style={styles.title}>System Overview</h1>
            <p style={styles.subtitle}>Welcome back, System Administrator.</p>
          </div>
          <div style={styles.userProfile}>
            <div style={styles.avatar}>A</div>
            <div>
              <strong>Admin User</strong>
              <div style={{ fontSize: '12px', color: '#64748b' }}>admin@marketlink.com</div>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <section style={styles.statsGrid}>
          <div style={styles.card}>
            <div style={styles.cardTitle}>Total Users</div>
            <div style={styles.cardVal}>{accountsLoading ? '...' : accounts.length}</div>
            <span style={styles.cardTrend}>+12% this month</span>
          </div>
          <div style={styles.card}>
            <div style={styles.cardTitle}>Active Sellers</div>
            <div style={styles.cardVal}>{accountsLoading ? '...' : activeSellers}</div>
            <span style={styles.cardTrend}>+4 new this week</span>
          </div>
          <div style={styles.card}>
            <div style={styles.cardTitle}>Total GMV</div>
            <div style={styles.cardVal}>{stats.totalGMV}</div>
            <span style={styles.cardTrend}>+18.4% vs last month</span>
          </div>
          <div style={styles.cardHighlight}>
            <div style={styles.cardTitle}>Pending Approvals</div>
            <div style={{ ...styles.cardVal, color: '#dc2626' }}>{pendingSellers.length}</div>
            <span style={{ fontSize: '12px', color: '#991b1b' }}>Action required</span>
          </div>
        </section>

        {/* Two-Column Section */}
        <div style={styles.columns}>
          {/* Seller Approvals Table */}
          <section style={{ ...styles.panel, flex: 2 }}>
            <h3 style={styles.panelTitle}>Pending Seller Verification Requests</h3>
            {pendingSellers.length === 0 ? (
              <p style={{ color: '#64748b', margin: '20px 0' }}>All pending requests have been processed.</p>
            ) : (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Store Name</th>
                    <th style={styles.th}>Owner</th>
                    <th style={styles.th}>Applied Date</th>
                    <th style={styles.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingSellers.map((seller) => (
                    <tr key={seller.id} style={styles.tr}>
                      <td style={styles.td}>
                        <strong>{seller.storeName}</strong>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>{seller.email}</div>
                      </td>
                      <td style={styles.td}>{seller.owner}</td>
                      <td style={styles.td}>{seller.date}</td>
                      <td style={styles.td}>
                        <button onClick={() => handleApprove(seller.id)} style={styles.approveBtn}>Approve</button>
                        <button onClick={() => handleApprove(seller.id)} style={styles.rejectBtn}>Reject</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>

          {/* Activity Log */}
          <section style={{ ...styles.panel, flex: 1 }}>
            <h3 style={styles.panelTitle}>Recent System Activity</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: '15px 0 0 0' }}>
              {recentLogs.map((log) => (
                <li key={log.id} style={styles.logItem}>
                  <div>{log.action}</div>
                  <small style={{ color: '#94a3b8' }}>{log.time}</small>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section id="users" className="admin-accounts-panel">
          <div className="admin-accounts-heading">
            <div>
              <span className="admin-accounts-kicker">DIRECTORY</span>
              <h2>Created accounts</h2>
            </div>
            <span className="admin-accounts-count">{accountsLoading ? 'Loading' : `${accounts.length} accounts`}</span>
          </div>

          {accountsNotice && <p className="admin-accounts-message admin-accounts-notice" role="status">{accountsNotice}</p>}

          {accountsError ? (
            <p className="admin-accounts-message admin-accounts-error" role="alert">{accountsError}</p>
          ) : accountsLoading ? (
            <p className="admin-accounts-message" role="status">Loading accounts...</p>
          ) : accounts.length === 0 ? (
            <p className="admin-accounts-message">No accounts have been created yet.</p>
          ) : (
            <div className="admin-accounts-table-wrap">
              <table className="admin-accounts-table">
                <thead>
                  <tr><th>Name</th><th>Email</th><th>Role</th><th>Joined</th><th>Verification</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {accounts.map((account) => (
                    <tr key={account._id}>
                      <td>{account.name || 'Name not provided'}</td>
                      <td>{account.email}</td>
                      <td><span className={`admin-account-role admin-account-role-${String(account.role || 'unknown').toLowerCase()}`}>{account.role || 'Unknown'}</span></td>
                      <td>{account.createdAt ? new Date(account.createdAt).toLocaleDateString() : '—'}</td>
                      <td>{account.isVerified ? 'Verified' : 'Pending'}</td>
                      <td>
                        {account.role === 'buyer' && account.isVerified ? (
                          <button
                            className="admin-verify-seller-button"
                            disabled={updatingAccountId === account._id}
                            onClick={() => handleVerifySeller(account)}
                          >
                            {updatingAccountId === account._id ? 'Verifying...' : 'Verify as seller'}
                          </button>
                        ) : account.role === 'buyer' ? 'Verify email first' : account.role === 'seller' ? 'Seller verified' : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

const styles = {
  container: { display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: "'Inter', sans-serif", color: '#1e293b' },
  sidebar: { width: '250px', backgroundColor: '#0f172a', color: '#f8fafc', padding: '24px 20px', display: 'flex', flexDirection: 'column' },
  brand: { marginBottom: '32px' },
  badgeAdmin: { backgroundColor: '#dc2626', color: '#fff', fontSize: '10px', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' },
  nav: { display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 },
  navLink: { color: '#94a3b8', textDecoration: 'none', padding: '10px 14px', borderRadius: '6px', fontSize: '14px' },
  navLinkActive: { backgroundColor: '#1e293b', color: '#ffffff', fontWeight: 'bold' },
  logoutBtn: { backgroundColor: '#334155', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer', marginTop: 'auto' },
  main: { flexGrow: 1, padding: '32px', overflowY: 'auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' },
  title: { margin: 0, fontSize: '26px' },
  subtitle: { margin: '4px 0 0 0', color: '#64748b', fontSize: '14px' },
  userProfile: { display: 'flex', alignItems: 'center', gap: '12px' },
  avatar: { width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#2563eb', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 'bold' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' },
  card: { backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0' },
  cardHighlight: { backgroundColor: '#fef2f2', padding: '20px', borderRadius: '10px', border: '1px solid #fecaca' },
  cardTitle: { fontSize: '13px', color: '#64748b', fontWeight: '600' },
  cardVal: { fontSize: '28px', fontWeight: 'bold', margin: '8px 0 4px 0' },
  cardTrend: { fontSize: '12px', color: '#16a34a' },
  columns: { display: 'flex', gap: '24px', flexWrap: 'wrap' },
  panel: { backgroundColor: '#ffffff', padding: '24px', borderRadius: '10px', border: '1px solid #e2e8f0' },
  panelTitle: { margin: 0, fontSize: '18px' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '16px' },
  th: { textAlign: 'left', padding: '12px 8px', borderBottom: '2px solid #e2e8f0', color: '#64748b', fontSize: '13px' },
  tr: { borderBottom: '1px solid #f1f5f9' },
  td: { padding: '12px 8px', fontSize: '14px' },
  approveBtn: { backgroundColor: '#16a34a', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', marginRight: '6px', fontSize: '12px' },
  rejectBtn: { backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' },
  logItem: { borderBottom: '1px solid #f1f5f9', padding: '10px 0', fontSize: '13px' },
};