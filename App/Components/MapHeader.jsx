import { SafeAreaView, StyleSheet, Image, View } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { EXPO_PUBLIC_PLACE_API_KEY } from "@env";

const MapHeader = ({ setLocation }) => {
  const { user } = useUser();
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <GooglePlacesAutocomplete
            placeholder="Search EV charging station"
            enablePoweredByContainer={false}
            fetchDetails={true}
            onPress={(data, details = null) => {
              setLocation(details.geometry?.location);
            }}
            query={{
              key: EXPO_PUBLIC_PLACE_API_KEY,
              language: "en",
            }}
          />
        </View>
        <Image source={{ uri: user?.imageUrl }} style={styles.userImage} />
      </View>
    </SafeAreaView>
  );
};

export default MapHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchContainer: {
    flex: 1,
    marginRight: 10,
  },
});
