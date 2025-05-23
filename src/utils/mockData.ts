// This file generates mock data for the application
// In a real application, this would be replaced with actual API calls

import { format, subDays } from 'date-fns';

// Generate mock water level data for the past 14 days
export const getWaterLevelData = () => {
  const data = [];
  for (let i = 14; i >= 0; i--) {
    const date = subDays(new Date(), i);
    
    // Simulate some randomness in the data
    const baseLevel = 8.5; // Base water level
    const randomFactor = Math.sin(i / 3) * 0.5; // Creates a sine wave pattern
    const dailyVariation = (Math.random() - 0.5) * 0.3; // Random daily variation
    
    // Actual recorded level
    const level = +(baseLevel + randomFactor + dailyVariation).toFixed(2);
    
    // Predicted level - slightly different to show prediction error
    const predicted = +(level + (Math.random() - 0.5) * 0.2).toFixed(2);
    
    data.push({
      name: format(date, 'MMM dd'),
      level,
      predicted,
    });
  }
  return data;
};

// Generate latest metrics
export const getLatestMetrics = () => {
  // Generate slightly different data each time to simulate changes
  const waterLevel = +(8.5 + (Math.random() - 0.5) * 0.3).toFixed(1);
  const waterLevelStatus = waterLevel < 8.2 ? 'warning' : waterLevel > 9.0 ? 'critical' : 'normal';
  
  const qualityIndex = Math.floor(75 + Math.random() * 15);
  const qualityStatus = qualityIndex < 80 ? 'warning' : 'normal';
  
  const supplyRisk = Math.floor(10 + Math.random() * 25);
  const riskStatus = supplyRisk > 25 ? 'critical' : supplyRisk > 15 ? 'warning' : 'normal';
  
  const predictionAccuracy = Math.floor(90 + Math.random() * 8);
  
  return {
    waterLevel,
    waterLevelStatus,
    qualityIndex,
    qualityStatus,
    supplyRisk,
    riskStatus,
    predictionAccuracy,
  };
};

// Generate water quality parameters
export const getWaterQualityParameters = () => {
  return [
    {
      name: 'pH Level',
      value: +(7.2 + (Math.random() - 0.5) * 0.4).toFixed(1),
      unit: 'pH',
      status: 'normal',
      idealRange: '6.5 - 8.5',
    },
    {
      name: 'Dissolved Oxygen',
      value: +(6.8 + (Math.random() - 0.5) * 1.5).toFixed(1),
      unit: 'mg/L',
      status: 'normal',
      idealRange: '> 5.0',
    },
    {
      name: 'Turbidity',
      value: +(2.5 + (Math.random() - 0.5) * 1.8).toFixed(1),
      unit: 'NTU',
      status: 'normal',
      idealRange: '< 5.0',
    },
    {
      name: 'Total Dissolved Solids',
      value: Math.floor(250 + Math.random() * 100),
      unit: 'mg/L',
      status: 'normal',
      idealRange: '< 500',
    },
    {
      name: 'Temperature',
      value: +(22 + (Math.random() - 0.5) * 4).toFixed(1),
      unit: '°C',
      status: 'normal',
      idealRange: '20 - 30',
    },
    {
      name: 'E. coli',
      value: Math.floor(Math.random() * 10),
      unit: 'CFU/100mL',
      status: 'normal',
      idealRange: '0',
    },
  ];
};

// Generate prediction data
export const getPredictionData = () => {
  const waterLevelPredictions = [];
  const qualityPredictions = [];
  const demandPredictions = [];
  
  for (let i = 0; i < 7; i++) {
    const date = format(subDays(new Date(), -i), 'MMM dd');
    
    // Water level predictions (baseline with variations)
    const waterLevel = +(8.5 + Math.sin(i / 2) * 0.3 + (Math.random() - 0.5) * 0.2).toFixed(1);
    
    // Quality predictions (generally high with slight variations)
    const quality = Math.floor(85 + Math.sin(i / 3) * 8 + (Math.random() - 0.5) * 3);
    
    // Demand predictions (weekend vs weekday patterns)
    const weekendFactor = (i + new Date().getDay()) % 7 < 2 ? 1.2 : 1;
    const demand = Math.floor((1000 + Math.sin(i / 2) * 100) * weekendFactor + (Math.random() - 0.5) * 50);
    
    waterLevelPredictions.push({ date, value: waterLevel });
    qualityPredictions.push({ date, value: quality });
    demandPredictions.push({ date, value: demand });
  }
  
  return {
    waterLevelPredictions,
    qualityPredictions,
    demandPredictions,
    insights: [
      "Based on current rainfall patterns, water levels will remain stable for the next 5 days.",
      "Water quality is predicted to improve due to reduced industrial activity in the upcoming week.",
      "Weekend demand peaks are expected to be 20% higher than weekdays.",
      "Risk of water shortages is minimal (< 5%) for the foreseeable future."
    ],
    anomalyRisk: Math.floor(Math.random() * 20),
    confidence: Math.floor(85 + Math.random() * 10),
  };
};