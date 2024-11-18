import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { auth } from '../config';
import { updateProfile } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../ThemeContext';

export default function EditProfileScreen({ route }) {
  const { user } = route.params;
  const [displayName, setDisplayName] = useState(user.displayName);
  const navigation = useNavigation();
  const { theme } = useTheme();

  const handleSave = async () => {
    try {
      await updateProfile(auth.currentUser, { displayName });
      navigation.goBack();
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.borderColor }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Edit Profile</Text>
      </View>

      <View style={styles.form}>
        <Text style={[styles.label, { color: theme.secondaryText }]}>Display Name</Text>
        <TextInput
          style={[styles.input, { color: theme.text, borderColor: theme.borderColor, backgroundColor: theme.cardBackground }]}
          value={displayName}
          onChangeText={setDisplayName}
          placeholder="Enter your display name"
          placeholderTextColor={theme.secondaryText}
        />

        <TouchableOpacity 
          style={[styles.saveButton, { backgroundColor: theme.cardBackground }]}
          onPress={handleSave}
        >
          <Text style={[styles.saveButtonText, { color: theme.text }]}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  form: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 24,
  },
  saveButton: {
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});