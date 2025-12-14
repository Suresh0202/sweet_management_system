import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { sweetService } from '../services/sweetService_new';
import { inventoryService } from '../services/inventoryService_new';
import { Sweet } from '../types/sweet';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import SweetCard from '../components/sweets/SweetCard';
import './Home.css';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [filteredSweets, setFilteredSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [message, setMessage] = useState({ text: '', type: 'success' });

  useEffect(() => {
    loadSweets();
  }, []);

  useEffect(() => {
    filterSweets();
  }, [sweets, searchQuery, selectedCategory]);

  const loadSweets = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await sweetService.getAll();
      setSweets(data);
    } catch (err: any) {
      setError('Failed to load sweets');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filterSweets = () => {
    let filtered = sweets;

    if (searchQuery) {
      filtered = filtered.filter((sweet) =>
        sweet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sweet.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((sweet) => sweet.category === selectedCategory);
    }

    setFilteredSweets(filtered);
  };

  const handlePurchase = async (sweetId: number, quantity: number) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      await inventoryService.purchase(sweetId, quantity);
      showMessage('Purchase successful!', 'success');
      loadSweets();
    } catch (err: any) {
      showMessage(err.response?.data?.detail || 'Purchase failed', 'error');
    }
  };

  const showMessage = (text: string, type: string = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: 'success' }), 3000);
  };

  const categories = Array.from(new Set(sweets.map((s) => s.category)));

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="home-page">
      <Navbar />

      {message.text && <ErrorMessage message={message.text} type={message.type} />}

      <main className="home-content">
        <section className="hero">
          <div className="hero-content">
            <h1>Welcome to Sweet Shop</h1>
            <p>Discover our delicious collection of sweets and candies</p>
          </div>
        </section>

        {error && <ErrorMessage message={error} type="error" />}

        <section className="filters-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search sweets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="category-filter">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </section>

        {filteredSweets.length === 0 ? (
          <div className="no-results">
            <p>No sweets found matching your criteria</p>
          </div>
        ) : (
          <section className="sweets-grid">
            {filteredSweets.map((sweet) => (
              <SweetCard
                key={sweet.id}
                sweet={sweet}
                onPurchase={handlePurchase}
              />
            ))}
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};
