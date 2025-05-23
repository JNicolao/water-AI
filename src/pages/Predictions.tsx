import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { RefreshCw, TrendingUp, Zap, AlertTriangle } from 'lucide-react';

import { getPredictionData } from '../utils/mockData';

const Predictions: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [predictionData, setPredictionData] = React.useState<any>(null);
  
  React.useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setPredictionData(getPredictionData());
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setPredictionData(getPredictionData());
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
          <h2 className="text-2xl font-bold">Predictive Analysis</h2>
          <p className="text-neutral-500 mt-1">AI-powered predictions and insights for water resource management</p>
        </div>
        
        <button 
          onClick={refreshData} 
          disabled={isLoading}
          className="btn btn-outline flex items-center space-x-2"
        >
          <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
          <span>Refresh Predictions</span>
        </button>
      </div>

      {/* Prediction charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Water Level Predictions */}
        <motion.div 
          variants={itemVariants}
          className="card"
        >
          <h3 className="text-lg font-semibold mb-1">Water Level Forecast</h3>
          <p className="text-sm text-neutral-500 mb-4">7-day prediction</p>
          
          <div className="h-48">
            {isLoading ? (
              <div className="h-full flex items-center justify-center animate-pulse">
                <div className="h-4 w-32 bg-neutral-200 rounded"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={predictionData.waterLevelPredictions}
                  margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                  <XAxis dataKey="date" stroke="#6B7280" />
                  <YAxis domain={[8, 9]} stroke="#6B7280" />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#0F52BA" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
          
          <div className="mt-4 p-3 bg-primary/5 rounded-md text-sm">
            <span className="font-medium text-primary">Insight:</span> {isLoading ? "Loading..." : predictionData?.insights[0]}
          </div>
        </motion.div>

        {/* Water Quality Predictions */}
        <motion.div 
          variants={itemVariants}
          className="card"
        >
          <h3 className="text-lg font-semibold mb-1">Quality Index Forecast</h3>
          <p className="text-sm text-neutral-500 mb-4">7-day prediction</p>
          
          <div className="h-48">
            {isLoading ? (
              <div className="h-full flex items-center justify-center animate-pulse">
                <div className="h-4 w-32 bg-neutral-200 rounded"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={predictionData.qualityPredictions}
                  margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                  <XAxis dataKey="date" stroke="#6B7280" />
                  <YAxis domain={[70, 100]} stroke="#6B7280" />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#2E8B57" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
          
          <div className="mt-4 p-3 bg-secondary/5 rounded-md text-sm">
            <span className="font-medium text-secondary">Insight:</span> {isLoading ? "Loading..." : predictionData?.insights[1]}
          </div>
        </motion.div>

        {/* Water Demand Predictions */}
        <motion.div 
          variants={itemVariants}
          className="card"
        >
          <h3 className="text-lg font-semibold mb-1">Demand Forecast</h3>
          <p className="text-sm text-neutral-500 mb-4">7-day prediction (m³)</p>
          
          <div className="h-48">
            {isLoading ? (
              <div className="h-full flex items-center justify-center animate-pulse">
                <div className="h-4 w-32 bg-neutral-200 rounded"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={predictionData.demandPredictions}
                  margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                  <XAxis dataKey="date" stroke="#6B7280" />
                  <YAxis domain={[800, 1300]} stroke="#6B7280" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#F59E0B" barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
          
          <div className="mt-4 p-3 bg-accent/5 rounded-md text-sm">
            <span className="font-medium text-accent">Insight:</span> {isLoading ? "Loading..." : predictionData?.insights[2]}
          </div>
        </motion.div>
      </div>

      {/* Prediction details */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Model Details */}
        <div className="card md:col-span-2">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <TrendingUp size={20} className="mr-2 text-primary" />
            AI Model Information
          </h3>
          
          {isLoading ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-4 w-3/4 bg-neutral-200 rounded"></div>
              <div className="h-4 w-1/2 bg-neutral-200 rounded"></div>
              <div className="h-4 w-5/6 bg-neutral-200 rounded"></div>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                <p>
                  Our predictive model uses a hybrid approach combining machine learning with physical hydrological models to accurately forecast water conditions.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-neutral-50 p-4 rounded-md">
                    <h4 className="font-medium mb-2">Training Data</h4>
                    <ul className="text-sm space-y-1">
                      <li>• 5 years of historical water quality data</li>
                      <li>• Weather patterns from 12 regional stations</li>
                      <li>• Consumption patterns from urban areas</li>
                      <li>• Seasonal variation factors</li>
                    </ul>
                  </div>
                  
                  <div className="bg-neutral-50 p-4 rounded-md">
                    <h4 className="font-medium mb-2">Algorithms Used</h4>
                    <ul className="text-sm space-y-1">
                      <li>• LSTM Neural Networks for time series</li>
                      <li>• Gradient Boosting for classification</li>
                      <li>• Ensemble methods for final predictions</li>
                      <li>• Physics-informed neural networks</li>
                    </ul>
                  </div>
                </div>
                
                <p className="text-sm text-neutral-500">
                  Model confidence score: <span className="font-medium text-neutral-800">{predictionData?.confidence}%</span>
                </p>
              </div>
            </>
          )}
        </div>
        
        {/* Prediction Status */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Zap size={20} className="mr-2 text-accent" />
            Prediction Insights
          </h3>
          
          {isLoading ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-4 w-3/4 bg-neutral-200 rounded"></div>
              <div className="h-20 w-full bg-neutral-200 rounded mt-4"></div>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-neutral-600">Anomaly Risk</span>
                  <span className="text-sm font-medium">{predictionData?.anomalyRisk}%</span>
                </div>
                <div className="h-2 w-full bg-neutral-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${predictionData?.anomalyRisk < 10 ? 'bg-success' : predictionData?.anomalyRisk < 20 ? 'bg-warning' : 'bg-error'}`}
                    style={{ width: `${predictionData?.anomalyRisk}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="p-3 bg-warning/10 rounded-md mb-4">
                <div className="flex items-start">
                  <AlertTriangle size={18} className="text-warning mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-warning">Potential Anomalies</p>
                    <p className="text-xs mt-1">Monitoring for unusual patterns in water quality data.</p>
                  </div>
                </div>
              </div>
              
              <div className="text-sm">
                <p className="font-medium mb-2">Next Steps:</p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-xs bg-primary/10 text-primary rounded-full h-4 w-4 flex items-center justify-center mr-2 mt-0.5">1</span>
                    <span>Continue monitoring key parameters</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-xs bg-primary/10 text-primary rounded-full h-4 w-4 flex items-center justify-center mr-2 mt-0.5">2</span>
                    <span>Refine model with new data points</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-xs bg-primary/10 text-primary rounded-full h-4 w-4 flex items-center justify-center mr-2 mt-0.5">3</span>
                    <span>Prepare contingency plans for demand peaks</span>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Predictions;