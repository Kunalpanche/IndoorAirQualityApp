import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';
import { useTheme } from '../ThemeContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 4;

const Header = ({ title, onBack, onSettings, onThemeToggle, isDarkMode }) => {
  const { theme } = useTheme();
  return (
    <View style={[styles.header, { backgroundColor: theme.cardBackground }]}>
      <TouchableOpacity onPress={onBack} style={styles.headerButton}>
        <Ionicons name="chevron-back" size={24} color={theme.text} />
      </TouchableOpacity>
      <Text style={[styles.headerTitle, { color: theme.text }]}>{title}</Text>
      <View style={styles.headerRightButtons}>
        <TouchableOpacity onPress={onThemeToggle} style={styles.headerButton}>
          <Ionicons name={isDarkMode ? "sunny" : "moon"} size={24} color={theme.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onSettings} style={styles.headerButton}>
          <Ionicons name="settings-outline" size={24} color={theme.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const StatusBar = ({ clearValue, days, temperature, humidity }) => {
  const { theme } = useTheme();
  return (
    <View style={[styles.statusBar, { borderBottomColor: theme.borderColor }]}>
      <View style={styles.statusItem}>
        <Ionicons name="checkmark-circle-outline" size={14} color={theme.secondaryText} />
        <Text style={[styles.statusText, { color: theme.secondaryText }]}>Clear {clearValue}</Text>
      </View>
      <View style={styles.statusItem}>
        <Ionicons name="calendar-outline" size={14} color={theme.secondaryText} />
        <Text style={[styles.statusText, { color: theme.secondaryText }]}>{days} days left</Text>
      </View>
      <View style={styles.statusItem}>
        <Ionicons name="thermometer-outline" size={14} color={theme.secondaryText} />
        <Text style={[styles.statusText, { color: theme.secondaryText }]}>{temperature}°C</Text>
      </View>
      <View style={styles.statusItem}>
        <Ionicons name="water-outline" size={14} color={theme.secondaryText} />
        <Text style={[styles.statusText, { color: theme.secondaryText }]}>{humidity}%</Text>
      </View>
    </View>
  );
};

const NavigationTabs = ({ activeTab, onTabChange }) => {
  const { theme } = useTheme();
  return (
    <View style={[styles.tabs, { borderBottomColor: theme.borderColor }]}>
      {['Overview', 'Schedule', 'Statistics'].map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, activeTab === tab && styles.activeTab]}
          onPress={() => onTabChange(tab)}
        >
          <Text style={[
            styles.tabText,
            { color: activeTab === tab ? theme.text : theme.secondaryText },
            activeTab === tab && styles.activeTabText
          ]}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const QualityIndicator = ({ value, label, status, color }) => {
  const { theme } = useTheme();
  return (
    <View style={styles.indicatorWrapper}>
      <View style={[styles.indicatorCard, { backgroundColor: theme.cardBackground }]}>
        <View style={[styles.indicatorCircle, { backgroundColor: color }]}>
          <Text style={styles.indicatorValue}>{value}</Text>
        </View>
        <Text style={[styles.indicatorLabel, { color: theme.secondaryText }]}>{label}</Text>
        <Text style={[styles.indicatorStatus, { color }]}>{status}</Text>
      </View>
    </View>
  );
};

const CustomSwitch = ({ isOn, onToggle }) => (
  <TouchableOpacity
    onPress={onToggle}
    style={[styles.switchTrack, isOn ? styles.switchTrackOn : styles.switchTrackOff]}
  >
    <View style={[styles.switchThumb, isOn ? styles.switchThumbOn : styles.switchThumbOff]} />
  </TouchableOpacity>
);

const ModeToggle = ({ icon, label, isActive, onToggle }) => {
  const { theme } = useTheme();
  return (
    <View style={[styles.modeCard, { backgroundColor: theme.cardBackground }]}>
      <Ionicons name={icon} size={24} color={isActive ? "#007AFF" : theme.secondaryText} />
      <Text style={[styles.modeLabel, isActive ? styles.modeLabelActive : { color: theme.secondaryText }]}>{label}</Text>
      <View style={styles.switchWrapper}>
        <Text style={[styles.switchLabel, { color: theme.secondaryText }]}>{isActive ? 'ON' : 'OFF'}</Text>
        <CustomSwitch isOn={isActive} onToggle={onToggle} />
      </View>
    </View>
  );
};

const FanSpeedScale = () => (
  <View style={styles.fanSpeedScale}>
    {[...Array(30)].map((_, i) => (
      <View
        key={i}
        style={[
          styles.scaleMark,
          i % 5 === 0 && styles.scaleMarkLarge
        ]}
      />
    ))}
  </View>
);

const FanController = ({ value, onValueChange }) => {
  const { isDarkMode } = useTheme();
  const lightGradientColors = ['#1a237e', '#4a148c'];
  const darkGradientColors = ['#303F9F', '#7B1FA2'];

  return (
    <View style={styles.fanControllerWrapper}>
      <LinearGradient
        colors={isDarkMode ? darkGradientColors : lightGradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.fanController}
      >
        <View style={styles.fanIconLeft}>
          <Ionicons name="fan" size={20} color="rgba(255,255,255,0.5)" />
        </View>
        <View style={styles.fanIconRight}>
          <Ionicons name="fan" size={20} color="rgba(255,255,255,0.5)" />
        </View>
        <FanSpeedScale />
        <View style={styles.sliderPointer} />
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          value={value}
          onValueChange={onValueChange}
          minimumTrackTintColor="transparent"
          maximumTrackTintColor="transparent"
          thumbStyle={styles.sliderThumb}
        />
      </LinearGradient>
    </View>
  );
};

export default function AirQualityScreen({ navigation }) {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('Overview');
  const [fanSpeed, setFanSpeed] = useState(50);
  const [modes, setModes] = useState({
    auto: true,
    silent: false,
    nearby: true,
  });

  const toggleMode = (mode) => {
    setModes(prevModes => ({
      ...prevModes,
      [mode]: !prevModes[mode]
    }));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Header
        title="Living room"
        onBack={() => navigation.goBack()}
        onSettings={() => navigation.navigate('Settings')}
        onThemeToggle={toggleTheme}
        isDarkMode={isDarkMode}
      />
      
      <StatusBar
        clearValue={100}
        days={125}
        temperature={24}
        humidity={29}
      />
      
      <NavigationTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.indicators}>
          <QualityIndicator value={51} label="PM 1.0" status="Moderate" color="#FFB800" />
          <QualityIndicator value={23} label="PM 2.5" status="Good" color="#23C16B" />
          <QualityIndicator value={128} label="PM 10" status="Bad" color="#FF647C" />
          <QualityIndicator value={102} label="TVOC" status="Bad" color="#FF647C" />
        </View>
        
        <View style={styles.modesSection}>
          <Text style={[styles.modesTitle, { color: theme.text }]}>Modes</Text>
          <View style={styles.modesGrid}>
            <ModeToggle
              icon="sync"
              label="Auto"
              isActive={modes.auto}
              onToggle={() => toggleMode('auto')}
            />
            <ModeToggle
              icon="moon"
              label="Silent"
              isActive={modes.silent}
              onToggle={() => toggleMode('silent')}
            />
            <ModeToggle
              icon="home"
              label="Nearby"
              isActive={modes.nearby}
              onToggle={() => toggleMode('nearby')}
            />
          </View>
        </View>
      </ScrollView>
      
      <FanController value={fanSpeed} onValueChange={setFanSpeed} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerButton: {
    padding: 8,
  },
  headerRightButtons: {
    flexDirection: 'row',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusText: {
    fontSize: 12,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 16,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  tabText: {
    color: '#666',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  indicatorWrapper: {
    width: CARD_WIDTH,
  },
  indicatorCard: {
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  indicatorCircle: {
    width: CARD_WIDTH - 24,
    height: CARD_WIDTH - 24,
    borderRadius: (CARD_WIDTH - 24) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  indicatorValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
  indicatorLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  indicatorStatus: {
    fontSize: 11,
    fontWeight: '500',
  },
  modesSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  modesTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  modesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  modeCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  modeLabel: {
    fontSize: 12,
    marginVertical: 8,
    fontWeight: '500',
  },
  modeLabelActive: {
    color: '#007AFF',
  },
  switchWrapper: {
    alignItems: 'center',
    gap: 4,
  },
  switchLabel: {
    fontSize: 10,
    fontWeight: '500',
  },
  switchTrack: {
    width: 36,
    height: 20,
    borderRadius: 10,
    padding: 2,
  },
  switchTrackOn: {
    backgroundColor: '#4CAF50',
  },
  switchTrackOff: {
    backgroundColor: '#E0E0E0',
  },
  switchThumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 1,
    elevation: 2,
  },
  switchThumbOn: {
    transform: [{ translateX: 16 }],
  },
  switchThumbOff: {
    transform: [{ translateX: 0 }],
  },
  fanControllerWrapper: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  fanController: {
    height: 120,
    borderRadius: 24,
    padding: 16,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  fanIconLeft: {
    position: 'absolute',
    left: 16,
    top: 16,
  },
  fanIconRight: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  fanSpeedScale: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 24,
    left: 48,
    right: 48,
  },
  scaleMark: {
    width: 1,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  scaleMarkLarge: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  sliderPointer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#fff',
    transform: [
      { translateX: -10 },
      { translateY: -20 },
      { rotate: '180deg' }
    ],
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderThumb: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});