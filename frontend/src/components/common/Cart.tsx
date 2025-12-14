import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuthContext } from '../../context/AuthContext';
import { inventoryService } from '../../services/inventoryService_new';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import './Cart.css';

interface CartProps {
  onCheckoutSuccess?: () => void;
}

export const Cart: React.FC<CartProps> = ({ onCheckoutSuccess }) => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, getCartCount, clearCart } = useCart();
  const { isAuthenticated } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleQuantityChange = (sweetId: number, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(sweetId, newQuantity);
    }
  };

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      setError('Please log in to checkout');
      return;
    }

    if (cartItems.length === 0) {
      setError('Cart is empty');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Process each item in cart
      for (const item of cartItems) {
        await inventoryService.purchase(item.sweet.id, item.quantity);
      }

      setMessage('Checkout successful!');
      clearCart();
      onCheckoutSuccess?.();

      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  const cartTotal = getCartTotal();
  const cartCount = getCartCount();

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <ShoppingCart size={48} />
        <h3>Your cart is empty</h3>
        <p>Add some sweets to get started!</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>
          <ShoppingCart size={24} />
          Shopping Cart ({cartCount} items)
        </h2>
      </div>

      {error && <div className="cart-error">{error}</div>}
      {message && <div className="cart-success">{message}</div>}

      <div className="cart-items">
        <table className="cart-table">
          <thead>
            <tr>
              <th>Sweet Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.sweet.id} className="cart-row">
                <td className="sweet-name">
                  <strong>{item.sweet.name}</strong>
                  <br />
                  <small className="category">{item.sweet.category}</small>
                </td>
                <td className="price">₹{item.sweet.price.toFixed(2)}</td>
                <td className="quantity">
                  <div className="quantity-controls">
                    <button
                      onClick={() => handleQuantityChange(item.sweet.id, item.quantity - 1)}
                      className="qty-btn"
                      disabled={loading}
                      title="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      type="number"
                      min="1"
                      max={item.sweet.quantity}
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.sweet.id, parseInt(e.target.value) || 1)
                      }
                      className="qty-input"
                      disabled={loading}
                    />
                    <button
                      onClick={() => handleQuantityChange(item.sweet.id, item.quantity + 1)}
                      className="qty-btn"
                      disabled={loading || item.quantity >= item.sweet.quantity}
                      title="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </td>
                <td className="total">
                  ₹{(item.sweet.price * item.quantity).toFixed(2)}
                </td>
                <td className="action">
                  <button
                    onClick={() => removeFromCart(item.sweet.id)}
                    className="remove-btn"
                    disabled={loading}
                    title="Remove from cart"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span className="label">Subtotal:</span>
          <span className="value">₹{cartTotal.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span className="label">Tax (0%):</span>
          <span className="value">₹0.00</span>
        </div>
        <div className="summary-row total-row">
          <span className="label">Total Amount:</span>
          <span className="value total-amount">₹{cartTotal.toFixed(2)}</span>
        </div>
      </div>

      <div className="cart-actions">
        <button
          onClick={handleCheckout}
          className="checkout-btn"
          disabled={loading || cartItems.length === 0}
        >
          {loading ? 'Processing...' : `Proceed to Payment (₹${cartTotal.toFixed(2)})`}
        </button>
      </div>
    </div>
  );
};

export default Cart;
