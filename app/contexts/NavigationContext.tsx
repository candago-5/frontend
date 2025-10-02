import React, { createContext, ReactNode, useContext, useState } from 'react';

export type ScreenType = 'onboarding' | 'login' | 'register';

interface NavigationContextType {
  currentScreen: ScreenType;
  navigateTo: (screen: ScreenType) => void;
  goBack: () => void;
  onQuickRegister: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('onboarding');
  const [screenHistory, setScreenHistory] = useState<ScreenType[]>(['onboarding']);

  const navigateTo = (screen: ScreenType) => {
    setScreenHistory(prev => [...prev, screen]);
    setCurrentScreen(screen);
  };

  const goBack = () => {
    if (screenHistory.length > 1) {
      const newHistory = screenHistory.slice(0, -1);
      setScreenHistory(newHistory);
      setCurrentScreen(newHistory[newHistory.length - 1]);
    } else {
      setScreenHistory(['onboarding']);
      setCurrentScreen('onboarding');
    }
  };

  const onQuickRegister = () => {
        console.log('Quick register clicked - camera will open');
  };

  return (
    <NavigationContext.Provider value={{ currentScreen, navigateTo, goBack, onQuickRegister }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

export default NavigationProvider;
