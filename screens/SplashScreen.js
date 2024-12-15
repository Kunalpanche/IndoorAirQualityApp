import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

export default function SplashScreenComponent({ navigation }) {
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
        navigation.replace('GetStarted');
      }
    }
    prepare();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/splash.png')}
        style={styles.image}
      />
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
});