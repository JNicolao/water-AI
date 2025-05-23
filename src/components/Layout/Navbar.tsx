import React from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Bell, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const location = useLocation();
  
  // Get page title based on current route
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/water-quality':
        return 'Water Quality Monitoring';
      case '/predictions':
        return 'Predictive Analysis';
      case '/about':
        return 'About the Project';
      default:
        return 'Water Resource Management AI';
    }
  };

  return (
    <header className="bg-white border-b border-neutral-200 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar} 
          className="mr-4 p-1 rounded-md text-neutral-500 hover:bg-neutral-100 focus:outline-none md:hidden"
        >
          <Menu size={24} />
        </button>
        
        <motion.h1 
          key={location.pathname}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-semibold text-neutral-800"
        >
          {getPageTitle()}
        </motion.h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-1 rounded-md text-neutral-500 hover:bg-neutral-100 focus:outline-none relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-accent"></span>
        </button>
        
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
            <User size={18} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;