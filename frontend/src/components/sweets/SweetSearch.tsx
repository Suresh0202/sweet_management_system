import React, { useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import './SweetSearch.css';

interface SweetSearchProps {
  onSearch: (query: string) => void;
}

export const SweetSearch: React.FC<SweetSearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  React.useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  return (
    <div className="sweet-search">
      <input
        type="text"
        placeholder="Search sweets..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};
