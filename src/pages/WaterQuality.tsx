/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertTriangle, RefreshCw } from 'lucide-react';

import { getWaterQualityParameters } from '../utils/mockData';

const WaterQuality: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [parameters, setParameters] = React.useState<any[]>([]);
  
  React.useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setParameters(getWaterQualityParameters());
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setParameters(getWaterQualityParameters());
      setIsLoading(false);
    }, 800);
  };

  // Generate historical data for each parameter
  const generateHistoricalData = (parameter: string) => {
    const data = [];
    for (let i = 30; i >= 0; i--) {
      // Base value and variation depends on the parameter
      let baseValue = 0;
      let variation = 0;
      
      switch (parameter) {
        case 'pH Level':
          baseValue = 7.2;
          variation = 0.4;
          break;
        case 'Dissolved Oxygen':
          baseValue = 6.8;
          variation = 1.2;
          break;
        case 'Turbidity':
          baseValue = 2.5;
          variation = 1.5;
          break;
        case 'Total Dissolved Solids':
          baseValue = 250;
          variation = 80;
          break;
        case 'Temperature':
          baseValue = 22;
          variation = 3;
          break;
        default:
          baseValue = 5;
          variation = 2;
      }
      
      // Create a wavy pattern with random noise
      const value = baseValue + Math.sin(i / 5) * (variation / 2) + (Math.random() - 0.5) * variation;
      
      data.push({
        day: `Day ${30 - i}`,
        value: typeof baseValue === 'number' && baseValue > 100 ? Math.floor(value) : +value.toFixed(1)
      });
    }
    return data;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Water Quality Monitoring</h2>
          <p className="text-neutral-500 mt-1">Real-time analysis of water quality parameters</p>
        </div>
        
        <button 
          onClick={refreshData} 
          disabled={isLoading}
          className="btn btn-outline flex items-center space-x-2"
        >
          <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Parameter overview cards */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {isLoading ? (
          // Loading state
          Array(6).fill(0).map((_, index) => (
            <div key={index} className="card animate-pulse">
              <div className="h-5 w-32 bg-neutral-200 rounded mb-4"></div>
              <div className="h-8 w-20 bg-neutral-200 rounded mb-2"></div>
              <div className="h-4 w-full bg-neutral-200 rounded mb-4"></div>
              <div className="h-32 bg-neutral-200 rounded"></div>
            </div>
          ))
        ) : (
          // Actual data
          parameters.map((param) => (
            <motion.div 
              key={param.name}
              variants={itemVariants}
              className="card"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{param.name}</h3>
                <span className={`
                  text-xs px-2 py-1 rounded-full 
                  ${param.status === 'normal' ? 'bg-success/10 text-success' : 
                    param.status === 'warning' ? 'bg-warning/10 text-warning' : 
                    'bg-error/10 text-error'}
                `}>
                  {param.status === 'normal' ? 'Normal' : 
                   param.status === 'warning' ? 'Warning' : 'Critical'}
                </span>
              </div>
              
              <div className="flex items-baseline mb-2">
                <span className="text-2xl font-bold">{param.value}</span>
                <span className="text-neutral-500 ml-1">{param.unit}</span>
              </div>
              
              <div className="text-xs text-neutral-500 mb-4">
                Ideal range: {param.idealRange}
              </div>
              
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={generateHistoricalData(param.name)}
                    margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                    <XAxis 
                      dataKey="day" 
                      tick={{ fontSize: 10 }} 
                      tickFormatter={(value) => value.replace('Day ', '')}
                      stroke="#9CA3AF"
                    />
                    <YAxis tick={{ fontSize: 10 }} stroke="#9CA3AF" />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#0F52BA" 
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* AI Insights */}
      <motion.div 
        variants={itemVariants}
        className="card bg-primary/5 border border-primary/10"
      >
        <div className="flex items-start gap-4">
          <div className="bg-primary/10 p-3 rounded-lg text-primary">
            <AlertTriangle size={24} />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">AI Insights</h3>
            <p className="mb-4">
              Our AI analysis provides valuable insights into water quality trends and potential issues based on current and historical data.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-neutral-200">
                <h4 className="font-medium mb-2">Current Analysis</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="status-indicator status-good mt-1"></span>
                    <span>All parameters are within acceptable limits for safe consumption.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="status-indicator status-good mt-1"></span>
                    <span>Turbidity is slightly higher than average but within normal range.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="status-indicator status-warning mt-1"></span>
                    <span>pH levels show a slight downward trend over the past week.</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-neutral-200">
                <h4 className="font-medium mb-2">Recommendations</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="status-indicator bg-primary mt-1"></span>
                    <span>Continue regular monitoring of pH levels to track the downward trend.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="status-indicator bg-primary mt-1"></span>
                    <span>Increase sampling frequency during expected rainfall to monitor turbidity changes.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="status-indicator bg-primary mt-1"></span>
                    <span>Schedule maintenance for filtration systems within the next two weeks.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WaterQuality;