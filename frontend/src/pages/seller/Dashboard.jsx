import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SellerDashboard() {
  const navigate = useNavigate();

  const [products] = useState([
    { id: 1, name: 'Handcrafted Leather Bag', price: '$120.00', stock: 14, sales: 32 },
    { id: 2, name: 'Matte Neutral Ceramic Mug', price: '$24.50', stock: 45, sales: 89 },
    { id: 3, name: 'Minimalist Desktop Stand', price: '$45.00', stock: 8, sales: 19 },
  ]);

  const [orders] = useState([
    { id: 'ORD-9921', customer: 'David K.', item: 'Handcrafted Leather Bag', status: 'Pending Shipment', total: '$120.00' },
    { id: 'ORD-9918', customer: 'Sarah L.', item: 'Matte Neutral Ceramic Mug (x2)', status: 'Delivered', total: '$49.00' },
    { id: 'ORD-9915', customer: 'Michael B.', item: 'Minimalist Desktop Stand', status: 'In Transit', total: '$45.00' },
  ]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      {/* Header Bar */}
      <header style={styles.topbar}>
        <div style={styles.logo}>
          <h2>MarketLink <span style={styles.sellerTag}>Seller Center</span></h2>
        </div>
        <div style={styles.actions}>
          <button style={styles.primaryBtn}>+ Add New Product</button>
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        </div>
      </header>

      <div style={styles.content}>
        {/* Metric Cards */}
        <div style={styles.metricsGrid}>
          <div style={styles.metricCard}>
            <span style={styles.metricLabel}>Total Revenue</span>
            <div style={styles.metricVal}>$4,890.50</div>
            <span style={styles.subtext}>+$540.00 this week</span>
          </div>
          <div style={styles.metricCard}>
            <span style={styles.metricLabel}>Orders Pending</span>
            <div style={styles.metricVal}>3</div>
            <span style={{ ...styles.subtext, color: '#d97706' }}>Requires processing</span>
          </div>
          <div style={styles.metricCard}>
            <span style={styles.metricLabel}>Active Listings</span>
            <div style={styles.metricVal}>{products.length}</div>
            <span style={styles.subtext}>All items in stock</span>
          </div>
        </div>

        {/* Orders & Products Layout */}
        <div style={styles.gridTwoCols}>
          {/* Order Management Panel */}
          <div style={styles.panel}>
            <div style={styles.panelHeader}>
              <h3>Recent Orders</h3>
              <a href="#all-orders" style={styles.link}>View All</a>
            </div>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Order ID</th>
                  <th style={styles.th}>Customer</th>
                  <th style={styles.th}>Product</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} style={styles.tr}>
                    <td style={styles.td}><strong>{order.id}</strong></td>
                    <td style={styles.td}>{order.customer}</td>
                    <td style={styles.td}>{order.item}</td>
                    <td style={styles.td}>
                      <span style={order.status === 'Pending Shipment' ? styles.statusPending : styles.statusSuccess}>
                        {order.status}
                      </span>
                    </td>
                    <td style={styles.td}>{order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Top Inventory */}
          <div style={styles.panel}>
            <div style={styles.panelHeader}>
              <h3>My Inventory</h3>
              <a href="#inventory" style={styles.link}>Manage Catalog</a>
            </div>
            <div style={styles.productList}>
              {products.map((p) => (
                <div key={p.id} style={styles.productItem}>
                  <div>
                    <div style={{ fontWeight: '600' }}>{p.name}</div>
                    <div style={{ fontSize: '13px', color: '#64748b' }}>Stock: {p.stock} units | Sales: {p.sales}</div>
                  </div>
                  <div style={{ fontWeight: 'bold', color: '#0f172a' }}>{p.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#f1f5f9', fontFamily: "'Inter', sans-serif", color: '#0f172a' },
  topbar: { backgroundColor: '#ffffff', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0' },
  logo: { display: 'flex', alignItems: 'center', gap: '10px' },
  sellerTag: { fontSize: '12px', backgroundColor: '#e0e7ff', color: '#3730a3', padding: '4px 8px', borderRadius: '6px' },
  actions: { display: 'flex', gap: '12px' },
  primaryBtn: { backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' },
  logoutBtn: { backgroundColor: 'transparent', color: '#64748b', border: '1px solid #cbd5e1', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer' },
  content: { padding: '32px', maxWidth: '1200px', margin: '0 auto' },
  metricsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' },
  metricCard: { backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' },
  metricLabel: { fontSize: '13px', color: '#64748b', fontWeight: '600' },
  metricVal: { fontSize: '28px', fontWeight: 'bold', margin: '8px 0' },
  subtext: { fontSize: '12px', color: '#16a34a' },
  gridTwoCols: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' },
  panel: { backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' },
  panelHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  link: { color: '#2563eb', textDecoration: 'none', fontSize: '14px', fontWeight: '600' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '10px', borderBottom: '2px solid #e2e8f0', color: '#64748b', fontSize: '13px' },
  tr: { borderBottom: '1px solid #f1f5f9' },
  td: { padding: '12px 10px', fontSize: '14px' },
  statusPending: { backgroundColor: '#fef3c7', color: '#92400e', fontSize: '12px', padding: '4px 8px', borderRadius: '4px', fontWeight: '600' },
  statusSuccess: { backgroundColor: '#dcfce7', color: '#166534', fontSize: '12px', padding: '4px 8px', borderRadius: '4px', fontWeight: '600' },
  productList: { display: 'flex', flexDirection: 'column', gap: '16px' },
  productItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px' },
};