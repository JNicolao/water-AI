import React from 'react';
import { motion } from 'framer-motion';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  icon: React.ReactNode;
  isLoading: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  unit, 
  status, 
  icon,
  isLoading
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'normal':
        return 'bg-success';
      case 'warning':
        return 'bg-warning';
      case 'critical':
        return 'bg-error';
      default:
        return 'bg-success';
    }
  };

  return (
    <div className="card">
      {isLoading ? (
        <div className="animate-pulse">
          <div className="h-4 w-24 bg-neutral-200 rounded mb-4"></div>
          <div className="h-8 w-16 bg-neutral-200 rounded mb-2"></div>
          <div className="h-4 w-32 bg-neutral-200 rounded"></div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-neutral-500 text-sm">{title}</h3>
            <span className="text-neutral-400">
              {icon}
            </span>
          </div>
          
          <div className="flex items-baseline">
            <motion.span 
              key={value.toString()}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold"
            >
              {value}
            </motion.span>
            <span className="text-neutral-500 ml-1">{unit}</span>
          </div>
          
          <div className="flex items-center mt-3">
            <span className={`status-indicator ${getStatusColor()}`}></span>
            <span className="text-sm">
              {status === 'normal' && 'Normal'}
              {status === 'warning' && 'Warning'}
              {status === 'critical' && 'Critical'}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default MetricCard;