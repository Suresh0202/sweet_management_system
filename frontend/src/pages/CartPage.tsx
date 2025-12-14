import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Cart from '../components/common/Cart';
import './CartPage.css';

const CartPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCheckoutSuccess = () => {
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="cart-page">
      <Navbar />
      
      <main className="cart-page-content">
        <div className="cart-page-header">
          <h1>Shopping Cart</h1>
          <p>Review your items and proceed to checkout</p>
        </div>

        <Cart onCheckoutSuccess={handleCheckoutSuccess} />
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
