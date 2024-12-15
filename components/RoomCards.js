import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Plus, Wind, Moon } from 'lucide-react-native';

const RoomCards = ({ theme }) => {
  const rooms = [
    {
      id: 1,
      name: 'Living room',
      status: 'Clear 100',
      image: 'https://www.marthastewart.com/thmb/lxfu2-95SWCS0jwciHs1mkbsGUM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/modern-living-rooms-wb-1-bc45b0dc70e541f0ba40364ae6bd8421.jpg',
      pm25: { value: 'Good', status: 'good' },
      fanMode: { value: 'Auto mode', status: 'on' },
      silentMode: { value: 'Silent mode', status: 'off' }
    },
    {
      id: 2,
      name: 'Bedroom',
      status: 'Clear 95',
      image: 'https://www.houzlook.com/assets/images/upload/Rooms/Bed%20Rooms/View_03-20200822103639058.jpg',
      pm25: { value: 'Moderate', status: 'moderate' },
      fanMode: { value: 'Speed: 2', status: 'on' },
      silentMode: { value: 'Silent mode', status: 'on' }
    }
  ];

  const RoomCard = ({ room }) => (
    <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
      <Image source={{ uri: room.image }} style={styles.backgroundImage} />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={[styles.roomName, { color: theme.text }]}>{room.name}</Text>
          <Text style={[styles.roomStatus, { color: theme.secondaryText }]}>{room.status}</Text>
        </View>
        
        <View style={styles.statusContainer}>
          <View style={[styles.statusBox, styles[`status_${room.pm25.status}`]]}>
            <Text style={styles.statusTitle}>PM2.5</Text>
            <Text style={styles.statusValue}>{room.pm25.value}</Text>
          </View>

          <View style={[styles.statusBox, styles[`status_${room.fanMode.status}`]]}>
            <Wind size={16} color="#fff" style={styles.statusIcon} />
            <Text style={styles.statusValue}>{room.fanMode.value}</Text>
          </View>

          <View style={[styles.statusBox, styles[`status_${room.silentMode.status}`]]}>
            <Moon size={16} color="#fff" style={styles.statusIcon} />
            <Text style={styles.statusValue}>{room.silentMode.value}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Rooms</Text>
        <TouchableOpacity style={[styles.addButton, { borderColor: theme.borderColor }]}>
          <Plus size={20} color={theme.text} />
          <Text style={[styles.addButtonText, { color: theme.text }]}>Add new room</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {rooms.map(room => (
          <RoomCard key={room.id} room={room} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingRight: 32,
  },
  card: {
    width: 300,
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 16,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 1.2,
  },
  cardContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  cardHeader: {
    marginBottom: 8,
  },
  roomName: {
    fontSize: 24,
    fontWeight: '700',
    color: 'black',
    marginBottom: 4,
  },
  roomStatus: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.1,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  statusBox: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  statusTitle: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 4,
  },
  statusValue: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
  statusIcon: {
    marginBottom: 4,
  },
  status_good: {
    backgroundColor: 'rgba(24, 697, 47, 0.4)',
  },
  status_moderate: {
    backgroundColor: 'rgba(234, 179, 18, 0.6)',
  },
  status_bad: {
    backgroundColor: 'rgba(239, 68, 68, 0.6)',
  },
  status_on: {
    backgroundColor: 'rgba(59, 130, 246, 0.6)',
  },
  status_off: {
    backgroundColor: 'rgba(107, 114, 128, 0.6)',
  },
});

// Make sure to export the component as default
export default RoomCards;