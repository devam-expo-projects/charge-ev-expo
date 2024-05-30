import React from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import GoogleSign from "../../Components/googleSign";
import * as WebBrowser from "expo-web-browser";
import { useOAuth, useSignIn } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";

const { width, height } = Dimensions.get("window");
WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const { isLoaded, signIn, setActive } = useSignIn();

  const handleGoogleSignIn = async () => {
    if (!isLoaded) return;

    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../assets/images/car-logo.png")}
          style={styles.carImage}
          resizeMode="contain"
        />
      </View>
      <GoogleSign title="Login With Google" onClick={handleGoogleSignIn} />
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: height * 0.1,
  },
  carImage: {
    width: "100%",
    height: height * 0.4,
  },
});
