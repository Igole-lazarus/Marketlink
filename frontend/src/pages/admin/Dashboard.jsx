import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [stats] = useState({
    totalUsers: 1420,
    activeSellers: 88,
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

  const handleApprove = (id) => {
    setPendingSellers(pendingSellers.filter((s) => s.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
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
            <div style={styles.cardVal}>{stats.totalUsers}</div>
            <span style={styles.cardTrend}>+12% this month</span>
          </div>
          <div style={styles.card}>
            <div style={styles.cardTitle}>Active Sellers</div>
            <div style={styles.cardVal}>{stats.activeSellers}</div>
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