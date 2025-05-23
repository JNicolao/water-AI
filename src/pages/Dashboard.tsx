/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Droplet, AlertTriangle, TrendingUp, RefreshCw } from 'lucide-react';

import WaterQualityCard from '../components/Dashboard/WaterQualityCard';
import MetricCard from '../components/Dashboard/MetricCard';
import LocationsMap from '../components/Dashboard/LocationsMap';
import { getWaterLevelData, getLatestMetrics } from '../utils/mockData';

const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [waterLevelData, setWaterLevelData] = React.useState<any[]>([]);
  const [metrics, setMetrics] = React.useState<any>(null);
  
  React.useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setWaterLevelData(getWaterLevelData());
      setMetrics(getLatestMetrics());
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setWaterLevelData(getWaterLevelData());
      setMetrics(getLatestMetrics());
      setIsLoading(false);
    }, 800);
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

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Water Management Dashboard</h2>
        
        <button 
          onClick={refreshData} 
          disabled={isLoading}
          className="btn btn-outline flex items-center space-x-2"
        >
          <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Overview stats */}
      <motion.div 
        variants={childVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <MetricCard
          title="Water Level"
          value={metrics?.waterLevel || "0"}
          unit="m"
          status={metrics?.waterLevelStatus || "normal"}
          icon={<Droplet />}
          isLoading={isLoading}
        />
        <MetricCard
          title="Water Quality Index"
          value={metrics?.qualityIndex || "0"}
          unit="/100"
          status={metrics?.qualityStatus || "normal"}
          icon={<Droplet />}
          isLoading={isLoading}
        />
        <MetricCard
          title="Supply Risk"
          value={metrics?.supplyRisk || "0"}
          unit="%"
          status={metrics?.riskStatus || "normal"}
          icon={<AlertTriangle />}
          isLoading={isLoading}
        />
        <MetricCard
          title="Prediction Accuracy"
          value={metrics?.predictionAccuracy || "0"}
          unit="%"
          status="normal"
          icon={<TrendingUp />}
          isLoading={isLoading}
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Water Level Chart */}
        <motion.div 
          variants={childVariants}
          className="card lg:col-span-2"
        >
          <h3 className="text-lg font-semibold mb-4">Water Level Trends</h3>
          <div className="h-[300px]">
            {isLoading ? (
              <div className="h-full flex items-center justify-center">
                <div className="animate-pulse h-4 w-32 bg-neutral-200 rounded"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={waterLevelData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                  <XAxis dataKey="name" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="level" 
                    stroke="#0F52BA" 
                    fill="#4D7BD6" 
                    fillOpacity={0.3} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="predicted" 
                    stroke="#2E8B57" 
                    fill="#5BAD7D" 
                    fillOpacity={0.2} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="flex items-center space-x-6 mt-2 text-sm text-neutral-500">
            <div className="flex items-center">
              <span className="h-3 w-3 bg-primary mr-2 rounded"></span>
              <span>Actual</span>
            </div>
            <div className="flex items-center">
              <span className="h-3 w-3 bg-secondary mr-2 rounded"></span>
              <span>Predicted</span>
            </div>
          </div>
        </motion.div>

        {/* Water Quality */}
        <motion.div 
          variants={childVariants}
          className="lg:col-span-1"
        >
          <WaterQualityCard isLoading={isLoading} />
        </motion.div>
      </div>

      {/* Map */}
      <motion.div 
        variants={childVariants}
        className="card"
      >
        <h3 className="text-lg font-semibold mb-4">Monitoring Locations</h3>
        <LocationsMap isLoading={isLoading} />
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;