import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { sweetService } from '../services/sweetService_new';
import { inventoryService } from '../services/inventoryService_new';
import { Sweet, CreateSweetRequest } from '../types/sweet';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import Modal from '../components/common/Modal';
import { Plus, Edit, Trash2, RefreshCw } from 'lucide-react';
import './AdminPanel.css';

export const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState({ text: '', type: 'success' });

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [selectedSweet, setSelectedSweet] = useState<Sweet | null>(null);

  const [formData, setFormData] = useState<CreateSweetRequest>({
    name: '',
    category: '',
    price: 0,
    quantity: 0,
    description: '',
    image_url: '',
  });

  const [restockData, setRestockData] = useState({ quantity: '', notes: '' });

  useEffect(() => {
    if (!user?.is_admin) {
      navigate('/');
    }
    loadSweets();
  }, [user, navigate]);

  const loadSweets = async () => {
    try {
      setLoading(true);
      const data = await sweetService.getAll();
      setSweets(data);
    } catch (err) {
      setError('Failed to load sweets');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSweet = () => {
    setSelectedSweet(null);
    setFormData({
      name: '',
      category: '',
      price: 0,
      quantity: 0,
      description: '',
      image_url: '',
    });
    setShowAddModal(true);
  };

  const handleEditSweet = (sweet: Sweet) => {
    setSelectedSweet(sweet);
    setFormData({
      name: sweet.name,
      category: sweet.category,
      price: sweet.price as number,
      quantity: sweet.quantity,
      description: sweet.description || '',
      image_url: sweet.image_url || '',
    });
    setShowEditModal(true);
  };

  const handleSaveSweet = async () => {
    try {
      if (selectedSweet) {
        await sweetService.update(selectedSweet.id, formData);
        showMessage('Sweet updated successfully', 'success');
      } else {
        await sweetService.create(formData);
        showMessage('Sweet added successfully', 'success');
      }
      setShowAddModal(false);
      setShowEditModal(false);
      loadSweets();
    } catch (err: any) {
      showMessage(err.response?.data?.detail || 'Failed to save sweet', 'error');
    }
  };

  const handleDeleteSweet = async (sweetId: number) => {
    if (!confirm('Are you sure you want to delete this sweet?')) return;

    try {
      await sweetService.delete(sweetId);
      showMessage('Sweet deleted successfully', 'success');
      loadSweets();
    } catch (err: any) {
      showMessage(err.response?.data?.detail || 'Failed to delete sweet', 'error');
    }
  };

  const handleRestock = async () => {
    if (!selectedSweet) return;

    try {
      await inventoryService.restock(selectedSweet.id, parseInt(restockData.quantity), restockData.notes);
      showMessage('Sweet restocked successfully', 'success');
      setShowRestockModal(false);
      loadSweets();
    } catch (err: any) {
      showMessage(err.response?.data?.detail || 'Failed to restock sweet', 'error');
    }
  };

  const showMessage = (text: string, type: string = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: 'success' }), 3000);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="admin-page">
      <Navbar />

      {message.text && <ErrorMessage message={message.text} type={message.type} />}

      <main className="admin-content">
        <section className="admin-header">
          <h1>Sweet Management</h1>
          <button onClick={handleAddSweet} className="add-btn">
            <Plus size={20} />
            Add New Sweet
          </button>
        </section>

        {error && <ErrorMessage message={error} type="error" />}

        <section className="sweets-management">
          <table className="sweets-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sweets.map((sweet) => (
                <tr key={sweet.id}>
                  <td>{sweet.name}</td>
                  <td>{sweet.category}</td>
                  <td>${(sweet.price as number).toFixed(2)}</td>
                  <td>{sweet.quantity}</td>
                  <td className="actions">
                    <button
                      onClick={() => {
                        setSelectedSweet(sweet);
                        setRestockData({ quantity: '', notes: '' });
                        setShowRestockModal(true);
                      }}
                      className="action-btn restock"
                      title="Restock"
                    >
                      <RefreshCw size={18} />
                    </button>
                    <button
                      onClick={() => handleEditSweet(sweet)}
                      className="action-btn edit"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteSweet(sweet.id)}
                      className="action-btn delete"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showAddModal || showEditModal}
        onClose={() => {
          setShowAddModal(false);
          setShowEditModal(false);
        }}
        title={selectedSweet ? 'Edit Sweet' : 'Add New Sweet'}
      >
        <form className="sweet-form" onSubmit={(e) => { e.preventDefault(); handleSaveSweet(); }}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            required
          />
          <input
            type="number"
            step="0.01"
            placeholder="Price"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value)})}
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            rows={3}
          />
          <input
            type="url"
            placeholder="Image URL"
            value={formData.image_url}
            onChange={(e) => setFormData({...formData, image_url: e.target.value})}
          />
          <button type="submit" className="save-btn">
            {selectedSweet ? 'Update' : 'Add'} Sweet
          </button>
        </form>
      </Modal>

      {/* Restock Modal */}
      <Modal
        isOpen={showRestockModal}
        onClose={() => setShowRestockModal(false)}
        title={`Restock: ${selectedSweet?.name}`}
      >
        <form className="restock-form" onSubmit={(e) => { e.preventDefault(); handleRestock(); }}>
          <p className="current-stock">Current Stock: <strong>{selectedSweet?.quantity}</strong></p>
          <input
            type="number"
            min="1"
            placeholder="Quantity to add"
            value={restockData.quantity}
            onChange={(e) => setRestockData({...restockData, quantity: e.target.value})}
            required
          />
          <textarea
            placeholder="Notes (optional)"
            value={restockData.notes}
            onChange={(e) => setRestockData({...restockData, notes: e.target.value})}
            rows={3}
          />
          <button type="submit" className="restock-btn">Restock</button>
        </form>
      </Modal>

      <Footer />
    </div>
  );
};
