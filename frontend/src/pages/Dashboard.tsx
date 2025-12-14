import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { inventoryService } from '../services/inventoryService_new';
import { PurchaseHistory } from '../types/purchase';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { LogOut, ShoppingBag } from 'lucide-react';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuthContext();
  const [purchases, setPurchases] = useState<PurchaseHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
                      <td>{purchase.sweet?.name || 'N/A'}</td>
                      <td>{purchase.quantity}</td>
                      <td>${purchase.total_price.toFixed(2)}</td>
                      <td>{new Date(purchase.purchase_date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="user-stats">
          <div className="stat-card">
            <h3>Total Purchases</h3>
            <p className="stat-value">{purchases.length}</p>
          </div>
          <div className="stat-card">
            <h3>Total Spent</h3>
            <p className="stat-value">
              ${purchases.reduce((sum, p) => sum + p.total_price, 0).toFixed(2)}
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
