import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SellerDashboard.css';

const initialProducts = [
  { id: 1, name: 'Handcrafted Leather Bag', category: 'Accessories', price: 120, stock: 14, sales: 32 },
  { id: 2, name: 'Matte Ceramic Mug', category: 'Homeware', price: 24.5, stock: 45, sales: 89 },
  { id: 3, name: 'Minimal Desk Stand', category: 'Workspace', price: 45, stock: 8, sales: 19 },
];

const initialOrders = [
  { id: 'ORD-9921', customer: 'David K.', product: 'Handcrafted Leather Bag', total: 120, status: 'Processing', date: 'Oct 08, 2026' },
  { id: 'ORD-9918', customer: 'Sarah L.', product: 'Matte Ceramic Mug x2', total: 49, status: 'Shipped', date: 'Oct 07, 2026' },
  { id: 'ORD-9915', customer: 'Michael B.', product: 'Minimal Desk Stand', total: 45, status: 'Delivered', date: 'Oct 05, 2026' },
];

const formatCurrency = (amount) => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format(amount);

const readUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user_data') || 'null');
  } catch {
    return null;
  }
};

export default function SellerDashboard() {
  const navigate = useNavigate();
  const [section, setSection] = useState('overview');
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState('');
  const [showProductForm, setShowProductForm] = useState(false);
  const [productDraft, setProductDraft] = useState({ name: '', category: '', price: '', stock: '' });
  const user = readUser();

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    if (!normalizedSearch) return products;
    return products.filter((product) =>
      `${product.name} ${product.category}`.toLowerCase().includes(normalizedSearch)
    );
  }, [products, search]);

  const pendingOrders = orders.filter((order) => order.status === 'Processing').length;
  const revenue = orders
    .filter((order) => order.status === 'Delivered')
    .reduce((total, order) => total + order.total, 0);

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_data');
    navigate('/login', { replace: true });
  };

  const handleAddProduct = (event) => {
    event.preventDefault();
    const product = {
      id: Date.now(),
      name: productDraft.name.trim(),
      category: productDraft.category.trim(),
      price: Number(productDraft.price),
      stock: Number(productDraft.stock),
      sales: 0,
    };
    setProducts((currentProducts) => [product, ...currentProducts]);
    setProductDraft({ name: '', category: '', price: '', stock: '' });
    setShowProductForm(false);
  };

  const markOrderShipped = (orderId) => {
    setOrders((currentOrders) => currentOrders.map((order) => (
      order.id === orderId ? { ...order, status: 'Shipped' } : order
    )));
  };

  return (
    <div className="seller-app">
      <aside className="seller-sidebar">
        <a className="seller-brand" href="#overview" onClick={() => setSection('overview')}>
          <span className="seller-brand-mark" aria-hidden="true">M</span>
          <span><strong>MarketLink</strong><small>SELLER CENTER</small></span>
        </a>

        <nav className="seller-nav" aria-label="Seller dashboard">
          <button className={section === 'overview' ? 'is-active' : ''} onClick={() => setSection('overview')}>
            <span className="seller-nav-dot" />Overview
          </button>
          <button className={section === 'products' ? 'is-active' : ''} onClick={() => setSection('products')}>
            <span className="seller-nav-dot" />Products
          </button>
          <button className={section === 'orders' ? 'is-active' : ''} onClick={() => setSection('orders')}>
            <span className="seller-nav-dot" />Orders <span className="seller-nav-count">{pendingOrders}</span>
          </button>
        </nav>

        <div className="seller-sidebar-footer">
          <div className="seller-account">
            <span className="seller-avatar">{(user?.name || user?.email || 'S').slice(0, 1).toUpperCase()}</span>
            <span className="seller-account-copy"><strong>{user?.name || 'Seller account'}</strong><small>{user?.email || 'Your store'}</small></span>
          </div>
          <button className="seller-logout" onClick={handleLogout}>Log out</button>
        </div>
      </aside>

      <main className="seller-main">
        <header className="seller-topbar">
          <div>
            <p className="seller-eyebrow">MARKETPLACE / SELLER</p>
            <h1>{section === 'overview' ? 'Store overview' : section === 'products' ? 'Your products' : 'Order management'}</h1>
          </div>
          <button className="seller-primary-button" onClick={() => setShowProductForm(true)}>Add product</button>
        </header>

        {section === 'overview' && (
          <>
            <section className="seller-welcome" aria-label="Store welcome">
              <div>
                <span className="seller-welcome-kicker">YOUR STORE, AT A GLANCE</span>
                <h2>Good to see you{user?.name ? `, ${user.name.split(' ')[0]}` : ''}.</h2>
                <p>Keep your catalog fresh and orders moving. Here is what needs your attention today.</p>
              </div>
              <div className="seller-welcome-art" aria-hidden="true"><span /><span /><span /></div>
            </section>

            <section className="seller-metrics" aria-label="Store metrics">
              <article className="seller-metric seller-metric-revenue">
                <span>Delivered order value</span><strong>{formatCurrency(revenue)}</strong><small>From delivered orders shown</small>
              </article>
              <article className="seller-metric">
                <span>Needs attention</span><strong>{pendingOrders.toString().padStart(2, '0')}</strong><small>Orders awaiting shipment</small>
              </article>
              <article className="seller-metric">
                <span>Active products</span><strong>{products.length.toString().padStart(2, '0')}</strong><small>{products.filter((product) => product.stock <= 10).length} running low on stock</small>
              </article>
            </section>

            <section className="seller-panel">
              <div className="seller-panel-heading">
                <div><span className="seller-eyebrow">FULFILLMENT</span><h2>Recent orders</h2></div>
                <button className="seller-text-button" onClick={() => setSection('orders')}>All orders <span aria-hidden="true">-&gt;</span></button>
              </div>
              <OrderTable orders={orders.slice(0, 3)} onShip={markOrderShipped} compact />
            </section>
          </>
        )}

        {section === 'products' && (
          <section className="seller-panel">
            <div className="seller-panel-heading seller-list-heading">
              <div><span className="seller-eyebrow">CATALOG</span><h2>Product inventory</h2></div>
              <label className="seller-search"><span className="seller-sr-only">Search products</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products" /></label>
            </div>
            <div className="seller-table-wrap">
              <table className="seller-table">
                <thead><tr><th>Product</th><th>Price</th><th>Stock</th><th>Sales</th><th>Availability</th></tr></thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td><strong>{product.name}</strong><small>{product.category}</small></td>
                      <td>{formatCurrency(product.price)}</td>
                      <td>{product.stock}</td>
                      <td>{product.sales}</td>
                      <td><span className={`seller-status ${product.stock <= 10 ? 'seller-status-low' : 'seller-status-good'}`}>{product.stock <= 10 ? 'Low stock' : 'In stock'}</span></td>
                    </tr>
                  ))}
                  {filteredProducts.length === 0 && <tr><td className="seller-empty" colSpan="5">No products match that search.</td></tr>}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {section === 'orders' && (
          <section className="seller-panel">
            <div className="seller-panel-heading">
              <div><span className="seller-eyebrow">FULFILLMENT</span><h2>All orders</h2></div>
              <span className="seller-order-summary">{orders.length} orders</span>
            </div>
            <OrderTable orders={orders} onShip={markOrderShipped} />
          </section>
        )}
      </main>

      {showProductForm && (
        <div className="seller-modal-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setShowProductForm(false);
        }}>
          <section className="seller-modal" role="dialog" aria-modal="true" aria-labelledby="seller-modal-title">
            <div className="seller-modal-heading"><div><span className="seller-eyebrow">CATALOG</span><h2 id="seller-modal-title">Add a product</h2></div><button className="seller-modal-close" onClick={() => setShowProductForm(false)} aria-label="Close">×</button></div>
            <form onSubmit={handleAddProduct} className="seller-product-form">
              <label>Product name<input required maxLength={80} value={productDraft.name} onChange={(event) => setProductDraft({ ...productDraft, name: event.target.value })} /></label>
              <label>Category<input required maxLength={40} value={productDraft.category} onChange={(event) => setProductDraft({ ...productDraft, category: event.target.value })} /></label>
              <div className="seller-form-row">
                <label>Price (USD)<input required min="0.01" step="0.01" type="number" value={productDraft.price} onChange={(event) => setProductDraft({ ...productDraft, price: event.target.value })} /></label>
                <label>Stock<input required min="0" step="1" type="number" value={productDraft.stock} onChange={(event) => setProductDraft({ ...productDraft, stock: event.target.value })} /></label>
              </div>
              <div className="seller-modal-actions"><button type="button" className="seller-secondary-button" onClick={() => setShowProductForm(false)}>Cancel</button><button type="submit" className="seller-primary-button">Save product</button></div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

function OrderTable({ orders, onShip, compact = false }) {
  return (
    <div className="seller-table-wrap">
      <table className={`seller-table ${compact ? 'seller-table-compact' : ''}`}>
        <thead><tr><th>Order</th><th>Customer</th><th>Product</th><th>Total</th><th>Status</th><th /></tr></thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td><strong>{order.id}</strong><small>{order.date}</small></td>
              <td>{order.customer}</td>
              <td>{order.product}</td>
              <td>{formatCurrency(order.total)}</td>
              <td><span className={`seller-status ${order.status === 'Processing' ? 'seller-status-pending' : order.status === 'Delivered' ? 'seller-status-good' : 'seller-status-shipped'}`}>{order.status}</span></td>
              <td>{order.status === 'Processing' && <button className="seller-small-button" onClick={() => onShip(order.id)}>Mark shipped</button>}</td>
            </tr>
          ))}
          {orders.length === 0 && <tr><td className="seller-empty" colSpan="6">No orders to show.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
