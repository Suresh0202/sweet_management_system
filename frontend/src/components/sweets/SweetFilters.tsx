import React from 'react';
import { CONSTANTS } from '../../utils/constants';
import './SweetFilters.css';

interface SweetFiltersProps {
  onCategoryChange: (category: string) => void;
}

export const SweetFilters: React.FC<SweetFiltersProps> = ({ onCategoryChange }) => {
  return (
    <div className="sweet-filters">
      <select onChange={(e) => onCategoryChange(e.target.value)} defaultValue="">
        <option value="">All Categories</option>
        {CONSTANTS.SWEET_CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};
