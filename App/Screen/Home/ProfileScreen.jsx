import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import Header from "../../Components/Header";

const ProfileScreen = () => {
  const { user } = useUser();

  return (
    <SafeAreaView style={styles.container}>
      {Platform.OS === "android" && <StatusBar barStyle={"default"} />}
      <Header text={"Profile Page"} />
      <View style={{ flex: 1, marginHorizontal: 15 }}>
        <View style={styles.detailsWrapper}>
          <Text style={styles.detailsText}>
            Name :{" "}
            {[user?.firstName?.toString(), user?.lastName?.toString()].join(
              " "
            )}
          </Text>
          <Text style={styles.detailsText}>
            Email : {user?.emailAddresses?.[0]?.emailAddress}
          </Text>
        </View>

        <TouchableOpacity style={styles.buttonWrapper}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: "rgba(208, 208, 192, 0.5)",
    fontFamily: "outfit-bold",
  },
  detailsWrapper: {
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#FFF",
  },
  detailsText: {
    fontSize: 15,
    fontFamily: "outfit",
  },
  buttonWrapper: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: "red",
  },
  buttonText: {
    textAlign: "center",
    color: "red",
    fontSize: 24,
    fontFamily: "outfit-bold",
  },
});
