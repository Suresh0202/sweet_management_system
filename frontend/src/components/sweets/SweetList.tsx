INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     127.0.0.1:53009 - "OPTIONS /api/v1/auth/register HTTP/1.1" 400 Bad Request
INFO:     127.0.0.1:54636 - "OPTIONS /api/v1/auth/login?username=Suresh&password=Guntuku%401234 HTTP/1.1" 400 Bad Request
INFO:     127.0.0.1:54636 - "OPTIONS /api/v1/auth/login?username=Suresh&password=Guntuku%401234 HTTP/1.1" 400 Bad Request
INFO:     127.0.0.1:54636 - "OPTIONS /api/v1/auth/login?username=Suresh&password=Guntuku%401234 HTTP/1.1" 400 Bad Requestimport React from 'react';
import { Sweet } from '../../types/sweet';
import { SweetCard } from './SweetCard';
import './SweetList.css';

interface SweetListProps {
  sweets: Sweet[];
  onBuy?: (sweetId: number) => void;
}

export const SweetList: React.FC<SweetListProps> = ({ sweets, onBuy }) => {
  return (
    <div className="sweet-list">
      {sweets.map((sweet) => (
        <SweetCard key={sweet.id} sweet={sweet} onBuy={onBuy} />
      ))}
    </div>
  );
};
