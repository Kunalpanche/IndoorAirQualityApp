import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme !== null) {
        setIsDarkMode(savedTheme === 'dark');
      }
    } catch (error) {
      console.error('Failed to load theme', error);
    } finally {
      setIsThemeLoaded(true);
    }
  };

  const toggleTheme = async () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    try {
      await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Failed to save theme', error);
    }
  };

  const theme = {
    isDarkMode,
    background: isDarkMode ? '#000000' : '#F3F4F6',
    text: isDarkMode ? '#FFFFFF' : '#1F2937',
    secondaryText: isDarkMode ? '#A0AEC0' : '#6B7280',
    cardBackground: isDarkMode ? '#111827' : '#FFFFFF',
    borderColor: isDarkMode ? '#2D3748' : '#E5E7EB',
    primary: isDarkMode ? '#3B82F6' : '#2563EB',
    success: isDarkMode ? '#10B981' : '#059669',
    warning: isDarkMode ? '#F59E0B' : '#D97706',
    danger: isDarkMode ? '#EF4444' : '#DC2626',
    inputBackground: isDarkMode ? '#1A202C' : '#F9FAFB',
    shadowColor: isDarkMode ? '#000000' : '#000000',
    shadowOpacity: isDarkMode ? 0.3 : 0.1,
  };

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme, isThemeLoaded }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);