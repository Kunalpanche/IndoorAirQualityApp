import { registerRootComponent } from 'expo';
import { AppRegistry } from 'react-native';
import App from './App';

// Register the app
AppRegistry.registerComponent('main', () => App);

// This ensures proper registration for both Expo and bare React Native
registerRootComponent(App);