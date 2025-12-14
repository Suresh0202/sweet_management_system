import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Sweet } from '../types/sweet';

interface SweetContextType {
  sweets: Sweet[];
  setSweets: (sweets: Sweet[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const SweetContext = createContext<SweetContextType | undefined>(undefined);

export const SweetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const value: SweetContextType = {
    sweets,
    setSweets,
    loading,
    setLoading,
    error,
    setError,
  };

  return <SweetContext.Provider value={value}>{children}</SweetContext.Provider>;
};

export const useSweetContext = () => {
  const context = useContext(SweetContext);
  if (!context) {
    throw new Error('useSweetContext must be used within SweetProvider');
  }
  return context;
};
