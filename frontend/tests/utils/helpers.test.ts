import { describe, it, expect } from 'vitest';
import { formatPrice, formatDate, truncateText } from '../utils/helpers';

describe('helpers', () => {
  it('should format price correctly', () => {
    expect(formatPrice(5.99)).toBe('$5.99');
  });

  it('should truncate text', () => {
    const text = 'This is a long text';
    expect(truncateText(text, 10)).toBe('This is a ...');
  });
});
