import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: (id: string) => void;
}

const toastVariants = {
  initial: { 
    opacity: 0, 
    x: 300,
    scale: 0.9
  },
  animate: { 
    opacity: 1, 
    x: 0,
    scale: 1
  },
  exit: { 
    opacity: 0, 
    x: 300,
    scale: 0.9
  }
};

const AnimatedToast: React.FC<ToastProps> = ({ id, message, type, onClose }) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-accent" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-destructive" />;
      default:
        return <AlertCircle className="w-5 h-5 text-primary" />;
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'success':
        return 'border-l-accent';
      case 'error':
        return 'border-l-destructive';
      default:
        return 'border-l-primary';
    }
  };

  return (
    <motion.div
      layout
      variants={toastVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }}
      className={`
        bg-card border border-border ${getBorderColor()} border-l-4 rounded-lg p-4 shadow-lg 
        flex items-center space-x-3 max-w-sm w-full backdrop-blur-sm
      `}
    >
      {getIcon()}
      <p className="text-foreground text-sm font-medium flex-1">{message}</p>
      <button
        onClick={() => onClose(id)}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export default AnimatedToast;