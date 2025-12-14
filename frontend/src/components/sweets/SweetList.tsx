import { Sweet } from '../../types/sweet';
import SweetCard from './SweetCard';
import './SweetList.css';

interface SweetListProps {
  sweets: Sweet[];
  onBuy?: (sweetId: number, quantity: number) => void;
}

export const SweetList: React.FC<SweetListProps> = ({ sweets, onBuy }) => {
  return (
    <div className="sweet-list">
      {sweets.map((sweet) => (
        <SweetCard key={sweet.id} sweet={sweet} onPurchase={onBuy} />
      ))}
    </div>
  );
};
