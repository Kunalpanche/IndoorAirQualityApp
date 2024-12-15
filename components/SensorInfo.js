import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Cloud } from 'lucide-react-native';

const SensorInfo = ({ theme }) => {
  return (
    <View style={[styles.container, { backgroundColor: theme }]}>
      <View style={styles.weatherContainer}>
        <Cloud size={24} color={theme.text} style={styles.icon} />
        <Text style={[styles.temperature, { color: theme.text }]}>7°C</Text>
        <Text style={[styles.location, { color: theme.secondaryText }]}>in SCET, Nagpur</Text>
      </View>
      <Text style={[styles.description, { color: theme.secondaryText }]}>Partially Cloudy</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  icon: {
    marginRight: 8,
  },
  temperature: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 4,
  },
  location: {
    fontSize: 16,
  },
  description: {
    fontSize: 14,
    marginLeft: 28, // Aligns with text after icon
  },
});


export default SensorInfo;