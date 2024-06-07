import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Provider } from 'react-redux';
import store from './App/Store/store';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import Route from './App/Screen/Route';
import { NavigationContainer } from '@react-navigation/native';
import { ClerkProvider } from '@clerk/clerk-expo';
import * as SecureStore from "expo-secure-store";
import { EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY } from "@env";
import { PaperProvider } from 'react-native-paper';

SplashScreen.preventAutoHideAsync();
export default function App() {
  const [fontsLoaded] = useFonts({
    'outfit': require('./assets/fonts/Outfit-Regular.ttf'),
    'outfit-bold': require('./assets/fonts/Outfit-Bold.ttf'),
    'outfit-semibold': require('./assets/fonts/Outfit-SemiBold.ttf'),
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function hideSplash() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
        setLoading(false);
      }
    }
    hideSplash();
  }, [fontsLoaded]);

  if (loading) {
    return null;
  }

  const tokenCache = {
    async getToken(key) {
      try {
        return SecureStore.getItemAsync(key);
      } catch (err) {
        return null;
      }
    },
    async saveToken(key, value) {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return;
      }
    },
  };

  return (
    <Provider store={store}>
      <ClerkProvider publishableKey={EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
        <View style={styles.container}>
          <PaperProvider>
            <NavigationContainer>
              <Route />
            </NavigationContainer>
          </PaperProvider>
        </View>
      </ClerkProvider>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
