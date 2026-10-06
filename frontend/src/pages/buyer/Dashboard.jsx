import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BuyerDashboard() {
  const navigate = useNavigate();

  const [myOrders] = useState([
    { id: 'ORD-9918', date: 'Oct 01, 2026', store: 'Matte Neutral Ceramics', total: '$49.00', status: 'In Transit', estimated: 'Oct 04, 2026' },
    { id: 'ORD-8812', date: 'Sep 20, 2026', store: 'LuxeGlam Apparel', total: '$85.00', status: 'Delivered', estimated: 'Delivered' },
  ]);

  const [savedItems] = useState([
    { id: 1, name: 'Minimalist Desk Lamp', price: '$38.00', store: 'Urban Living' },
    { id: 2, name: 'Warm Stone Canvas Backpack', price: '$65.00', store: 'LuxeGlam Apparel' },
  ]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      {/* Top Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.logo}>MarketLink</div>
        <div style={styles.searchBar}>
          <input type="text" placeholder="Search products, stores, categories..." style={styles.searchInput} />
        </div>
        <div style={styles.navRight}>
          <button style={styles.cartBtn}>🛒 Cart (0)</button>
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        </div>
      </nav>

      <main style={styles.mainContent}>
        {/* Banner */}
        <section style={styles.welcomeBanner}>
          <h2>Welcome back to MarketLink!</h2>
          <p>Track your active orders or discover newly curated store collections.</p>
        </section>

        {/* Quick Stats / Overview */}
        <div style={styles.overviewCards}>
          <div style={styles.card}>
            <h4>Active Orders</h4>
            <span style={styles.cardVal}>1 Package</span>
            <small style={{ color: '#2563eb' }}>Arriving by Oct 04</small>
          </div>
          <div style={styles.card}>
            <h4>Wishlist Items</h4>
            <span style={styles.cardVal}>{savedItems.length} Saved</span>
            <small style={{ color: '#64748b' }}>Ready to purchase</small>
          </div>
          <div style={styles.card}>
            <h4>Reward Credits</h4>
            <span style={styles.cardVal}>$12.50</span>
            <small style={{ color: '#16a34a' }}>Applicable at checkout</small>
          </div>
        </div>

        {/* Active Orders Section */}
        <section style={styles.section}>
          <h3>My Orders</h3>
          <div style={styles.ordersGrid}>
            {myOrders.map((order) => (
              <div key={order.id} style={styles.orderCard}>
                <div style={styles.orderHeader}>
                  <div>
                    <strong>{order.store}</strong>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>Order #{order.id} • {order.date}</div>
                  </div>
                  <span style={order.status === 'In Transit' ? styles.tagTransit : styles.tagDelivered}>
                    {order.status}
                  </span>
                </div>
                <div style={styles.orderFooter}>
                  <div>Total: <strong>{order.total}</strong></div>
                  <button style={styles.trackBtn}>Track Package</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Saved Items */}
        <section style={styles.section}>
          <h3>Saved Wishlist</h3>
          <div style={styles.wishlistGrid}>
            {savedItems.map((item) => (
              <div key={item.id} style={styles.wishlistCard}>
                <div style={{ fontWeight: '600' }}>{item.name}</div>
                <div style={{ fontSize: '13px', color: '#64748b' }}>{item.store}</div>
                <div style={styles.wishlistPriceRow}>
                  <span style={{ fontWeight: 'bold' }}>{item.price}</span>
                  <button style={styles.addCartBtn}>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: "'Inter', sans-serif", color: '#1e293b' },
  navbar: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 32px', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' },
  logo: { fontSize: '22px', fontWeight: 'bold', color: '#0f172a' },
  searchBar: { flexGrow: 0.5 },
  searchInput: { width: '100%', padding: '10px 16px', borderRadius: '20px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' },
  navRight: { display: 'flex', gap: '12px', alignItems: 'center' },
  cartBtn: { backgroundColor: '#f1f5f9', border: 'none', padding: '8px 16px', borderRadius: '20px', fontWeight: '600', cursor: 'pointer' },
  logoutBtn: { backgroundColor: 'transparent', color: '#64748b', border: 'none', cursor: 'pointer', fontSize: '14px' },
  mainContent: { maxWidth: '1100px', margin: '0 auto', padding: '32px 16px' },
  welcomeBanner: { backgroundColor: '#1e293b', color: '#ffffff', padding: '28px', borderRadius: '12px', marginBottom: '28px' },
  overviewCards: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' },
  card: { backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0' },
  cardVal: { fontSize: '22px', fontWeight: 'bold', margin: '6px 0', display: 'block' },
  section: { marginBottom: '32px' },
  ordersGrid: { display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' },
  orderCard: { backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0' },
  orderHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
  orderFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '12px' },
  tagTransit: { backgroundColor: '#dbeafe', color: '#1e40af', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' },
  tagDelivered: { backgroundColor: '#dcfce7', color: '#166534', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' },
  trackBtn: { backgroundColor: '#0f172a', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer' },
  wishlistGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px', marginTop: '16px' },
  wishlistCard: { backgroundColor: '#ffffff', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '8px' },
  wishlistPriceRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' },
  addCartBtn: { backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' },
};