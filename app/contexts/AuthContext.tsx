import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import api, { User } from '../services/api';

interface AuthContextData {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, name?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredUser();
  }, []);

  const loadStoredUser = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      
      if (token) {
        const response = await api.getCurrentUser();
        
        if (response.data?.user) {
          setUser(response.data.user);
        } else {
          // Token invalid, clear it
          await api.logout();
        }
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await api.login(email, password);

      if (response.error) {
        return { success: false, error: response.error.message };
      }

      if (response.data?.user) {
        setUser(response.data.user);
        return { success: true };
      }

      return { success: false, error: 'Erro desconhecido' };
    } catch (error) {
      return { success: false, error: 'Erro ao fazer login' };
    }
  };

  const register = async (email: string, password: string, name?: string) => {
    try {
      const response = await api.register(email, password, name);

      if (response.error) {
        return { success: false, error: response.error.message };
      }

      if (response.data?.user) {
        setUser(response.data.user);
        return { success: true };
      }

      return { success: false, error: 'Erro desconhecido' };
    } catch (error) {
      return { success: false, error: 'Erro ao criar conta' };
    }
  };

  const logout = async () => {
    await api.logout();
    setUser(null);
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default AuthContext;

