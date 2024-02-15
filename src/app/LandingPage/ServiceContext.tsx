import React, { createContext, useContext } from 'react';
import landingPageService from './LandingPage.service';

interface ServiceContextType {
  landingPageService: unknown;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const useService = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useService must be used within a ServiceProvider');
  }
  return context.landingPageService;
};

interface ServiceProviderProps {
  children: React.ReactNode;
}

export const ServiceProvider: React.FC<ServiceProviderProps> = ({ children }) => {
  return (
    <ServiceContext.Provider value={{ landingPageService }}>
      {children}
    </ServiceContext.Provider>
  );
};
