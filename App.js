import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { ClerkProvider } from '@clerk/clerk-expo';
import * as SecureStore from "expo-secure-store";
import { EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY } from "@env";
import { PaperProvider } from 'react-native-paper';
import Route from './App/Screen/Route';
import store from './App/Store/store';
import { name as appName } from './app.json';

export default function App() {
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
        <PaperProvider>
          <View style={styles.container}>
            {/* <Route /> */}
          </View>
        </PaperProvider>
      </ClerkProvider>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red'
  },
});
