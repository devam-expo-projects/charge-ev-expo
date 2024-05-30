import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";

const ProfileScreen = () => {
  const { user } = useUser();

  const keys = Object.keys(user?.emailAddresses);
  console.log(user?.emailAddresses?.[0]?.emailAddress);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, marginHorizontal: 15 }}>
        <TouchableOpacity style={styles.detailsWrapper}>
          <Text style={styles.detailsText}>
            Name :
            {[user?.firstName?.toString(), user?.lastName?.toString()].join(
              " "
            )}
          </Text>
          <Text style={styles.detailsText}>
            Email : {user?.emailAddresses?.[0]?.emailAddress}
          </Text>
        </TouchableOpacity>

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
    backgroundColor: "#d0d0c0",
    fontFamily: "outfit-bold",
    borderWidth: 1,
  },
  detailsWrapper: {
    marginBottom: 10,
  },
  detailsText: {
    fontSize: 15,
    fontFamily: "outfit",
  },
  buttonWrapper: {
    borderWidth: 1,
    padding: 10,
    margin: 4,
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
