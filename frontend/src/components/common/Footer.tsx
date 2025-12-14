import React from 'react';
import { Heart } from 'lucide-react';
import './Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <p>
            <span>Sweet Shop Management System</span>
            <Heart size={16} />
          </p>
          <p className="copyright">
            &copy; {currentYear} Sweet Shop. All rights reserved.
          </p>
        </div>
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Privacy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
