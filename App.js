import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { ClerkProvider } from '@clerk/clerk-expo';
import * as SecureStore from "expo-secure-store";
import { PaperProvider } from 'react-native-paper';
import Route from './App/Screen/Route';
import store from './App/Store/store';
import { name as appName } from './app.json';
import * as Sentry from "@sentry/react-native";
import { EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY, SENTRY_DSN } from '@env';

// const SENTRY_DSN = 'https://69c77fca93d0d28e280e019a8aa6698e@o4507389493444608.ingest.us.sentry.io/4507389522345984'
// const EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY = 'pk_test_Z29yZ2VvdXMtYmFzcy0zMS5jbGVyay5hY2NvdW50cy5kZXYk'

Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: 1.0,
});

function App() {
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
    <ClerkProvider publishableKey={EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
      <Provider store={store}>
        <PaperProvider>
          <View style={styles.container}>
            <Route />
          </View>
        </PaperProvider>
      </Provider>
    </ClerkProvider>
  );
}

export default Sentry.wrap(App);

AppRegistry.registerComponent(appName, () => App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
