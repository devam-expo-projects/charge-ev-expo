import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Dimensions,
  Pressable,
} from "react-native";
import React from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { EXPO_PUBLIC_PLACE_API_KEY } from "@env";
import { Menu } from "react-native-paper";

const MapHeader = ({ setLocation }) => {
  const { user } = useUser();
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const { signOut } = useAuth();

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
            styles={{
              listView: {
                width:
                  Dimensions.get("window").width -
                  Dimensions.get("window").width * 0.1,
              },
            }}
            query={{
              key: EXPO_PUBLIC_PLACE_API_KEY,
              language: "en",
            }}
          />
        </View>

        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Pressable onPress={openMenu}>
              <Image
                source={{ uri: user?.imageUrl }}
                style={styles.userImage}
              />
            </Pressable>
          }
          anchorPosition="bottom"
        >
          <Menu.Item onPress={signOut} title="Logout" />
        </Menu>
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
    padding: 20,
  },
  searchContainer: {
    flex: 1,
    marginRight: 10,
  },
});
