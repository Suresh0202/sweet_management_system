import { useState, useEffect } from 'react';
import { Sweet } from '../types/sweet';
import { sweetService } from '../services/sweetService';

export const useSweets = () => {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSweets = async () => {
    try {
      setLoading(true);
      const data = await sweetService.getAllSweets();
      setSweets(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch sweets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  return { sweets, loading, error, refetch: fetchSweets };
};
