import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { inventoryService } from '../services/inventoryService_new';
import { PurchaseHistory } from '../types/purchase';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { LogOut, ShoppingBag, Trash2 } from 'lucide-react';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthContext();
  const { clearCart, cartItems } = useCart();
  const [purchases, setPurchases] = useState<PurchaseHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [paymentMessage, setPaymentMessage] = useState('');

  useEffect(() => {
    loadPurchaseHistory();
  }, []);

  const loadPurchaseHistory = async () => {
    try {
      setLoading(true);
      const data = await inventoryService.getPurchaseHistory();
      setPurchases(data);
    } catch (err) {
      setError('Failed to load purchase history');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleProceedPayment = () => {
    if (cartItems.length === 0) {
      setPaymentMessage('✓ Cart is already empty!');
      setTimeout(() => setPaymentMessage(''), 3000);
      return;
    }
    
    clearCart();
    setPaymentMessage('✓ Payment processed! Cart has been cleared.');
    setTimeout(() => {
      setPaymentMessage('');
    }, 3000);
    loadPurchaseHistory();
  };

  const handleBuyNow = async () => {
    try {
      // Clear purchase history from database
      await inventoryService.clearPurchaseHistory();
      
      setPaymentMessage('✓ Payment Successful! Your purchase history has been cleared.');
      setPurchases([]);
      clearCart();
      setTimeout(() => {
        setPaymentMessage('');
      }, 3000);
    } catch (err) {
      setError('Failed to process payment');
      console.error(err);
      setTimeout(() => setError(''), 3000);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="dashboard-page">
      <Navbar />

      <main className="dashboard-content">
        <section className="dashboard-header">
          <div className="user-info">
            <h1>Welcome, {user?.username}!</h1>
            <p className="user-type">{user?.is_admin ? 'Admin User' : 'Regular User'}</p>
          </div>
          <button onClick={logout} className="logout-btn">
            <LogOut size={18} />
            Logout
          </button>
        </section>

        {error && <ErrorMessage message={error} type="error" />}

        {paymentMessage && (
          <div className="payment-success-message">
            {paymentMessage}
          </div>
        )}

        {cartItems.length > 0 && (
          <section className="purchase-payment-action">
            <button 
              onClick={handleProceedPayment}
              className="proceed-payment-btn"
            >
              <Trash2 size={20} />
              Proceed to Payment ({cartItems.length} items in cart)
            </button>
          </section>
        )}

        <section className="purchase-history">
          <h2>
            <ShoppingBag size={24} />
            Purchase History
          </h2>

          {purchases.length === 0 ? (
            <div className="no-purchases">
              <p>You haven't made any purchases yet</p>
            </div>
          ) : (
            <div className="purchases-table">
              <table>
                <thead>
                  <tr>
                    <th>Sweet Name</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {purchases.map((purchase) => (
                    <tr key={purchase.id}>
                      <td>{purchase.sweet_name || 'N/A'}</td>
                      <td>{purchase.quantity}</td>
                      <td>₹{purchase.total_price.toFixed(2)}</td>
                      <td>{new Date(purchase.purchased_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* {purchases.length > 0 && (
          <section className="buy-now-section">
            <button 
              onClick={handleBuyNow}
              className="buy-now-btn"
            >
              Buy Now
            </button>
          </section>
        )} */}

        <section className="user-stats">
          <div className="stat-card">
            <h3>Total Purchases</h3>
            <p className="stat-value">{purchases.length}</p>
          </div>
          <div className="stat-card">
            <h3>Total Spent</h3>
            <p className="stat-value">
              ₹{purchases.reduce((sum, p) => sum + p.total_price, 0).toFixed(2)}
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
