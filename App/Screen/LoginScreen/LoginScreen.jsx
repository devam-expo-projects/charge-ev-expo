import React from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import GoogleSign from "../../Components/googleSign";

const { width, height } = Dimensions.get("window");

const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../assets/images/car-logo.png")}
          style={styles.carImage}
          resizeMode="contain"
        />
      </View>
      <GoogleSign></GoogleSign>
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
