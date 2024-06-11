import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FontWeight } from "../Common/styles";
import { useAssets } from "expo-asset";

const GoogleSign = ({ title = "Sign in with Google", onClick }) => {
  const [assets, error] = useAssets([
    require("../../assets/images/google.png"),
  ]);

  return (
    <>
      <TouchableOpacity style={styles.googleButton} onPress={onClick}>
        {!!assets?.[0] && (
          <Image
            source={assets[0]}
            style={styles.googleImage}
            resizeMode="contain"
          />
        )}
        <Text style={[styles.buttonText, { color: "#111" }]}>{title}</Text>
      </TouchableOpacity>
    </>
  );
};

export default GoogleSign;

const styles = StyleSheet.create({
  googleButton: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    paddingHorizontal: 18,
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    gap: 8,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    fontWeight: FontWeight.MEDIUM,
    fontSize: 14,
    lineHeight: 22,
    color: "black",
    textAlign: "center",
  },
  googleImage: {
    height: 20,
    width: 20,
  },
});
