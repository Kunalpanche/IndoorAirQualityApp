import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Home, Wind, User } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../ThemeContext';

const { width } = Dimensions.get('window');

const TabNavigator = ({ activeTab = 'rooms', onTabChange }) => {
  const navigation = useNavigation();
  const { theme, isDarkMode } = useTheme();

  const tabs = [
    { 
      id: 'rooms', 
      label: 'Home', 
      icon: Home,
      onPress: () => onTabChange('rooms')
    },
    { 
      id: 'airQuality', 
      label: 'Air Quality', 
      icon: Wind,
      onPress: () => navigation.navigate('AirQuality')
    },
    { 
      id: 'profile', 
      label: 'Profile', 
      icon: User,
      onPress: () => navigation.navigate('Profile')
    }
  ];

  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: theme.cardBackground,
        borderColor: theme.borderColor,
      }
    ]}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tab}
            onPress={tab.onPress}
            accessibilityRole="button"
            accessibilityLabel={tab.label}
            accessibilityState={{ selected: isActive }}
          >
            <View style={[
              styles.iconContainer, 
              isActive && (theme.isDarkMode ? { backgroundColor: 'rgba(59, 130, 246, 0.2)' } : { backgroundColor: 'rgba(37, 99, 235, 0.1)' })
            ]}>
              <Icon
                size={24}
                color={isActive ? theme.primary : theme.secondaryText}
                style={styles.icon}
              />
            </View>
            <Text
              style={[
                styles.label,
                { 
                  color: isActive ? theme.primary : theme.secondaryText
                },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderRadius: 30,
    height: 70,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  activeIconContainer: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  icon: {
    marginBottom: 2,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default TabNavigator;