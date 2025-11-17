import React, { createContext, useState, ReactNode } from 'react';
import Toast from '../components/Toast';

interface ToastMessage {
  message: string;
  type: 'success' | 'error';
}

interface ToastContextType {
  toast: ToastMessage | null;
  showToast: (message: string, type: 'success' | 'error') => void;
  hideToast: () => void;
}

export const ToastContext = createContext<ToastContextType>({
  toast: null,
  showToast: () => {},
  hideToast: () => {},
});

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  return (
    <ToastContext.Provider value={{ toast, showToast, hideToast }}>
      {children}
      <Toast />
    </ToastContext.Provider>
  );
};
