import React, { useState } from 'react';
import { SweetCreate } from '../../types/sweet';
import './SweetForm.css';

interface SweetFormProps {
  onSubmit: (data: SweetCreate) => void;
  isLoading?: boolean;
}

export const SweetForm: React.FC<SweetFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<SweetCreate>({
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    category: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'quantity' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="sweet-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Sweet Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        step="0.01"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={formData.quantity}
        onChange={handleChange}
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Adding...' : 'Add Sweet'}
      </button>
    </form>
  );
};
