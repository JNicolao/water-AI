import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="bg-error/10 p-6 rounded-full mb-6"
      >
        <AlertCircle size={48} className="text-error" />
      </motion.div>
      
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Page Not Found</h1>
      
      <p className="text-neutral-600 max-w-md mb-6">
        The page you are looking for doesn't exist or has been moved to another location.
      </p>
      
      <Link to="/" className="btn btn-primary flex items-center">
        <Home size={18} className="mr-2" />
        Back to Dashboard
      </Link>
    </motion.div>
  );
};

export default NotFound;