import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Home, Wind } from 'lucide-react-native';

const AirQuality = ({ theme }) => {
  const QualityCard = ({ type, value, status, icon: Icon, color }) => (
    <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
      <View style={styles.cardContent}>
        <View style={[styles.iconContainer, { backgroundColor: color }]}>
          <Icon size={24} color="#FFFFFF" />
        </View>
        
        <View style={styles.textContainer}>
          <Text style={[styles.type, { color: theme.secondaryText }]}>
            {type.toUpperCase()}
          </Text>
          <Text style={[styles.status, { color: theme.text }]}>{status}</Text>
        </View>

        <View style={styles.valueContainer}>
          <Text style={[styles.value, { color: theme.text }]}>{value}</Text>
          <Text style={[styles.unit, { color: theme.secondaryText }]}>US AQI</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.text }]}>Air Quality</Text>
      <View style={styles.cardsContainer}>
        <QualityCard
          type="indoor"
          value="8"
          status="Excellent"
          icon={Home}
          color="#10B981"
        />
        <QualityCard
          type="outdoor"
          value="51"
          status="Moderate"
          icon={Wind}
          color="#F59E0B"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  cardsContainer: {
    gap: 12,
  },
  card: {
    borderRadius: 22,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 10,
          height: 23,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1,
      },
      android: {
        elevation: 1.5,
      },
    }),
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  type: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  status: {
    fontSize: 16,
    fontWeight: '600',
  },
  valueContainer: {
    alignItems: 'flex-end',
  },
  value: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 2,
  },
  unit: {
    fontSize: 15,
    fontWeight: '800',
  },
});

const defaultTheme = {
  cardBackground: '#FFFFFF',
  text: {
    color: '#1F2937',
  },
  secondaryText: {
    color: '#6B7280',
  },
};

export default AirQuality;