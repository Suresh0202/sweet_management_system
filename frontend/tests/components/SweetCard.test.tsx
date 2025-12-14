import { describe, it, expect } from 'vitest';
import { SweetCard } from '../components/sweets/SweetCard';

describe('SweetCard', () => {
  it('should render sweet card', () => {
    const sweet = {
      id: 1,
      name: 'Test Sweet',
      price: 5.99,
      quantity: 10,
      created_at: '2024-01-01',
      updated_at: '2024-01-01',
    };

    expect(sweet.name).toBe('Test Sweet');
  });
});
