import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { Sun, Moon, Settings } from 'lucide-react-native';
import { useTheme } from '../ThemeContext';
import SensorInfo from '../components/SensorInfo';
import RoomCards from '../components/RoomCards';
import AirQuality from '../components/AirQuality';
import TabNavigator from '../components/TabNavigator';

export default function HomeScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('rooms');
  const { theme, isDarkMode, toggleTheme } = useTheme();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'airQuality') {
      navigation.navigate('AirQuality');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>My home</Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
              {isDarkMode ? (
                <Sun size={24} color={theme.text} />
              ) : (
                <Moon size={24} color={theme.text} />
              )}
            </TouchableOpacity>
            <TouchableOpacity>
              <Settings size={24} color={theme.text} />
            </TouchableOpacity>
          </View>
        </View>

        <SensorInfo theme={theme} />
        <RoomCards theme={theme} />
        <AirQuality theme={theme} />
      </ScrollView>
      <TabNavigator
        activeTab={activeTab}
        onTabChange={handleTabChange}
        theme={theme}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeToggle: {
    marginRight: 16,
  },
});