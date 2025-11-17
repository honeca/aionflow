import React, { useContext, useEffect, useState } from 'react';
import { ToastContext } from '../contexts/ToastContext';
import { CheckCircle, AlertTriangle } from 'lucide-react';

const Toast: React.FC = () => {
  const { toast, hideToast } = useContext(ToastContext);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (toast) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        // Allow time for fade-out animation before hiding
        setTimeout(hideToast, 300);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast, hideToast]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const bgColor = isSuccess ? 'bg-green-600/90' : 'bg-red-600/90';
  const Icon = isSuccess ? CheckCircle : AlertTriangle;

  return (
    <div
      className={`fixed top-5 right-5 z-[100] flex items-center gap-3 p-4 rounded-lg border border-gray-700/50 shadow-lg text-white transition-all duration-300 ${bgColor} ${
        visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
      }`}
    >
      <Icon size={20} />
      <span className="text-sm font-medium">{toast.message}</span>
    </div>
  );
};

export default Toast;
