import React, { useState } from 'react';
import './RestockForm.css';

interface RestockFormProps {
  onSubmit: (sweetId: number, quantity: number) => void;
  isLoading?: boolean;
}

export const RestockForm: React.FC<RestockFormProps> = ({ onSubmit, isLoading }) => {
  const [sweetId, setSweetId] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(parseInt(sweetId), parseInt(quantity));
  };

  return (
    <form className="restock-form" onSubmit={handleSubmit}>
      <h2>Restock Sweet</h2>
      <input
        type="number"
        placeholder="Sweet ID"
        value={sweetId}
        onChange={(e) => setSweetId(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Restocking...' : 'Restock'}
      </button>
    </form>
  );
};
