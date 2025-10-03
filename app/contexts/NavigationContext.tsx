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

  // onQuickRegister deve acionar o fluxo que você já tem (abre câmera)
  // aqui mantemos só a navegação por conveniência (chame onQuickRegister da UI)
  const onQuickRegister = () => {
    // se o seu fluxo já abre a câmera, pode manter vazio ou iniciar o fluxo da câmera aqui
    // Exemplo simples: navegar para a tela de câmera/registro quando já houver foto
    // navigateTo('register');
  };

  return (
    <NavigationContext.Provider value={{ currentScreen, navigateTo, goBack, onQuickRegister }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

export default NavigationProvider;