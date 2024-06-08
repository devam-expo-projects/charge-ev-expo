import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Pressable,
  Alert,
} from "react-native";
import React, { useMemo } from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { EXPO_PUBLIC_PLACE_API_KEY } from "@env";
import { Menu } from "react-native-paper";

const MapHeader = ({ setLocation }) => {
  const { user } = useUser() || {};
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
      Alert.alert("Error", "An error occurred while signing out.");
    }
  };

  const handlePlaceSelect = (data, details = null) => {
    try {
      const location = details?.geometry?.location;
      if (location) {
        setLocation(location);
      } else {
        throw new Error("Location details not available");
      }
    } catch (error) {
      console.error("Error selecting place:", error);
      Alert.alert("Error", "An error occurred while selecting the place.");
    }
  };

  const imageURL = useMemo(() => {
    return user?.imageUrl || "https://via.placeholder.com/40";
  }, [user]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <GooglePlacesAutocomplete
            placeholder="Search EV charging station"
            enablePoweredByContainer={false}
            fetchDetails={true}
            onPress={handlePlaceSelect}
            query={{
              key: EXPO_PUBLIC_PLACE_API_KEY,
              language: "en",
            }}
          />
        </View>

        {imageURL && (
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <Pressable onPress={openMenu}>
                <Image source={{ uri: imageURL }} style={styles.userImage} />
              </Pressable>
            }
            anchorPosition="bottom"
          >
            <Menu.Item onPress={handleSignOut} title="Logout" />
          </Menu>
        )}
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
