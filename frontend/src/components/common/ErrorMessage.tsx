import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';
import './ErrorMessage.css';

interface ErrorMessageProps {
  message: string;
  type?: 'error' | 'success' | 'warning' | 'info';
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  type = 'error',
  onClose,
  autoClose = true,
  duration = 3000,
}) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (autoClose && show) {
      const timer = setTimeout(() => {
        setShow(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [show, autoClose, duration, onClose]);

  if (!show) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} />;
      case 'error':
        return <AlertCircle size={20} />;
      default:
        return <AlertCircle size={20} />;
    }
  };

  return (
    <div className={`message-alert message-${type}`}>
      <div className="message-content">
        {getIcon()}
        <span>{message}</span>
      </div>
      <button
        onClick={() => {
          setShow(false);
          onClose?.();
        }}
        className="message-close"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default ErrorMessage;
