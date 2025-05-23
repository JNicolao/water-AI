import React from 'react';

interface LocationsMapProps {
  isLoading: boolean;
}

// A simple map representation component
// In a real app, this would integrate with a mapping library like Leaflet or Google Maps
const LocationsMap: React.FC<LocationsMapProps> = ({ isLoading }) => {
  return (
    <div className="h-[400px] bg-neutral-100 rounded-lg overflow-hidden relative">
      {isLoading ? (
        <div className="h-full w-full flex items-center justify-center">
          <div className="animate-pulse text-neutral-400">Loading map data...</div>
        </div>
      ) : (
        <>
          {/* This is a placeholder for the map - in a real application we would integrate an actual map library */}
          <img 
            src="https://images.pexels.com/photos/2422588/pexels-photo-2422588.jpeg" 
            alt="Map of water monitoring locations" 
            className="w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-900/70 flex items-end">
            <div className="p-4 text-white">
              <h4 className="text-lg font-medium mb-1">12 Active Monitoring Stations</h4>
              <p className="text-sm text-neutral-200">
                Real-time data from sensors across the region providing continuous water quality metrics
              </p>
            </div>
          </div>
          
          {/* Placeholder dots for monitoring stations */}
          <div className="absolute top-[20%] left-[30%] h-3 w-3 bg-success rounded-full animate-pulse-slow"></div>
          <div className="absolute top-[35%] left-[45%] h-3 w-3 bg-success rounded-full animate-pulse-slow"></div>
          <div className="absolute top-[55%] left-[25%] h-3 w-3 bg-warning rounded-full animate-pulse-slow"></div>
          <div className="absolute top-[40%] left-[70%] h-3 w-3 bg-success rounded-full animate-pulse-slow"></div>
          <div className="absolute top-[70%] left-[55%] h-3 w-3 bg-success rounded-full animate-pulse-slow"></div>
          <div className="absolute top-[60%] left-[80%] h-3 w-3 bg-error rounded-full animate-pulse-slow"></div>
        </>
      )}
    </div>
  );
};

export default LocationsMap;