import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Header = ({ text = "", subText = "" }) => {
  return (
    <Text style={styles.header}>
      {text} <Text style={{ color: "green" }}>{subText}</Text>
    </Text>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    // fontFamily: "outfit-bold",
    fontSize: 25,
    marginVertical: 10,
    textAlign: "center",
    marginBottom: 10,
  },
});
