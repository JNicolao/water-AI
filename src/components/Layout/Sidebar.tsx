import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Droplets, TrendingUp, Info, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: <Home size={20} /> },
    { path: '/water-quality', label: 'Water Quality', icon: <Droplets size={20} /> },
    { path: '/predictions', label: 'Predictions', icon: <TrendingUp size={20} /> },
    { path: '/about', label: 'About', icon: <Info size={20} /> },
  ];

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-neutral-900 bg-opacity-50 z-20 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}
      
      {/* Sidebar */}
      <motion.aside 
        className={`
          fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-neutral-200 z-30
          transform transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        initial={false}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-neutral-200">
          <Link to="/" className="flex items-center space-x-2" onClick={closeSidebar}>
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
              <Droplets size={18} className="text-white" />
            </div>
            <span className="font-semibold text-primary text-lg">WaterAI</span>
          </Link>
          
          <button 
            onClick={closeSidebar}
            className="p-1 rounded-md text-neutral-500 hover:bg-neutral-100 focus:outline-none md:hidden"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="py-4">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={closeSidebar}
                  className={`
                    flex items-center space-x-3 px-3 py-2 rounded-md transition-colors
                    ${location.pathname === item.path 
                      ? 'bg-primary-light/10 text-primary font-medium' 
                      : 'text-neutral-600 hover:bg-neutral-100'}
                  `}
                >
                  <span className={location.pathname === item.path ? 'text-primary' : 'text-neutral-500'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </motion.aside>
    </>
  );
};

export default Sidebar;