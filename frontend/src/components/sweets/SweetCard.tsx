import React, { useState } from 'react';
import { Sweet } from '../../types/sweet';
import { ShoppingCart, Package } from 'lucide-react';
import './SweetCard.css';

interface SweetCardProps {
  sweet: Sweet;
  onPurchase?: (sweetId: number, quantity: number) => void;
}

const SweetCard: React.FC<SweetCardProps> = ({ sweet, onPurchase }) => {
  const [quantity, setQuantity] = useState(1);

  const handlePurchase = () => {
    if (onPurchase) {
      onPurchase(sweet.id, quantity);
      setQuantity(1);
    }
  };

  return (
    <div className="sweet-card">
      <div className="sweet-image">
        {sweet.image_url ? (
          <img src={sweet.image_url} alt={sweet.name} />
        ) : (
          <div className="placeholder">
            <Package size={48} />
          </div>
        )}
      </div>

      <div className="sweet-content">
        <div className="sweet-header">
          <h3>{sweet.name}</h3>
          <span className="category">{sweet.category}</span>
        </div>

        {sweet.description && (
          <p className="description">{sweet.description}</p>
        )}

        <div className="sweet-footer">
          <div className="price-stock">
            <span className="price">${(sweet.price as number).toFixed(2)}</span>
            <span className={`stock ${sweet.quantity > 0 ? 'in-stock' : 'out-of-stock'}`}>
              {sweet.quantity > 0 ? `${sweet.quantity} in stock` : 'Out of Stock'}
            </span>
          </div>

          {onPurchase && sweet.quantity > 0 && (
            <div className="purchase-controls">
              <input
                type="number"
                min="1"
                max={sweet.quantity}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="quantity-input"
              />
              <button onClick={handlePurchase} className="purchase-btn">
                <ShoppingCart size={18} />
                Buy
              </button>
            </div>
          )}

          {sweet.quantity === 0 && (
            <button className="purchase-btn disabled" disabled>
              Out of Stock
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SweetCard;
