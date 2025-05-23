import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

interface WaterQualityCardProps {
  isLoading: boolean;
}

const WaterQualityCard: React.FC<WaterQualityCardProps> = ({ isLoading }) => {
  // Mock data for water quality components
  const data = [
    { name: 'Dissolved Oxygen', value: 24 },
    { name: 'pH Level', value: 22 },
    { name: 'Turbidity', value: 18 },
    { name: 'TDS', value: 16 },
    { name: 'Temperature', value: 14 },
    { name: 'Other', value: 6 },
  ];

  const COLORS = ['#0F52BA', '#2E8B57', '#F59E0B', '#10B981', '#6366F1', '#9CA3AF'];

  const waterQualityScore = 87;
  
  return (
    <div className="card h-full flex flex-col">
      <h3 className="text-lg font-semibold mb-1">Water Quality Analysis</h3>
      <p className="text-sm text-neutral-500 mb-4">Current composition and quality score</p>
      
      {isLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center space-y-4 animate-pulse">
          <div className="h-32 w-32 bg-neutral-200 rounded-full"></div>
          <div className="h-4 w-28 bg-neutral-200 rounded"></div>
        </div>
      ) : (
        <>
          <div className="relative flex-1 flex flex-col items-center justify-center mb-4">
            <div className="h-32 w-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend 
                    layout="vertical" 
                    verticalAlign="middle"
                    align="right"
                    iconType="circle"
                    iconSize={8}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
            >
              <span className="text-3xl font-bold">{waterQualityScore}</span>
              <span className="text-xs block text-neutral-500">/100</span>
            </motion.div>
          </div>
          
          <div className="bg-green-50 text-green-800 p-3 rounded-md text-sm">
            <span className="font-medium">Good water quality</span>: All parameters are within the acceptable range for human consumption.
          </div>
        </>
      )}
    </div>
  );
};

export default WaterQualityCard;