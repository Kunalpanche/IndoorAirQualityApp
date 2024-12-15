---

# Indoor Air Quality App

This app provides users with tools to monitor and manage their indoor air quality. It features authentication, profile management, and a theme switcher to suit individual preferences.

## Features
- **Authentication**: Secure login and sign-up functionality using Firebase.
- **Profile Management**: Update profile pictures and user details.
- **Dark Mode**: Switch between light and dark themes.
- **Custom Navigation**: User-friendly navigation with React Navigation.
- **Accessibility**: Support for seamless navigation and responsive design.

---

## Screens and Functionalities
- **Splash Screen**: Welcome screen with an introduction to the app.
- **Get Started Screen**: A guided start-up process for new users.
- **Authentication Screen**: Secure login/sign-up using Firebase.
- **Home Screen**: Dashboard with real-time air quality data (future extension).
- **Profile Screen**: Edit and manage user details, profile picture, and preferences.
- **Edit Profile Screen**: Update user-specific settings and details.

---

## Prerequisites
- **Node.js**: v16.x or higher
- **npm or yarn**: Latest version
- **Expo CLI**: Installed globally

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/indoor-air-quality-app.git
   cd indoor-air-quality-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Expo CLI globally (if not already installed):
   ```bash
   npm install -g expo-cli
   ```

---

## Running the App

### On Expo
```bash
npm start
```

- Use the QR code generated to run the app on your mobile device using the **Expo Go** app.

### On Android Emulator
```bash
npm run android
```

### On iOS Simulator
```bash
npm run ios
```

### On Web
```bash
npm run web
```

---

## Dependencies

The app uses the following dependencies:
```bash
npm i @react-native-async-storage/async-storage @react-native-firebase/app @react-native-firebase/auth @react-navigation/native @react-navigation/stack expo expo-auth-session expo-firebase-recaptcha expo-image-picker expo-random expo-splash-screen expo-status-bar firebase lucide-react-native nativewind react react-native react-native-dotenv react-native-gesture-handler react-native-heroicons react-native-linear-gradient react-native-safe-area-context react-native-screens react-native-svg react-native-webview
```

For development:
```bash
npm i -D @babel/core @babel/preset-env @babel/preset-react tailwindcss
```

---

## Folder Structure
```
.
├── App.js
├── index.js
├── screens/
│   ├── SplashScreen.js
│   ├── GetStartedScreen.js
│   ├── AuthScreen.js
│   ├── HomeScreen.js
│   ├── ProfileScreen.js
│   └── EditProfileScreen.js
├── config/
│   └── firebase.js
├── ThemeContext.js
└── README.md
```

---

## Future Extensions
- Real-time air quality monitoring using IoT integrations.
- Alerts for poor air quality levels.
- Multi-language support for global accessibility.

---

Feel free to adapt the above as needed!
