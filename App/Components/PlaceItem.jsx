import {
  Dimensions,
  Image,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Header from "./Header";
const screenWidth = Dimensions.get("screen").width;

const PlaceItem = ({ place, toggleFav, isFav }) => {
  const API_KEY = "AIzaSyBKnfAl9mGbPIPlbSoqpTOJYAdWJtOqdas";
  const PHOTO_BASE_URL = "https://places.googleapis.com/v1/";

  const onDirectionClick = (place) => {
    const url = Platform.select({
      ios: "maps:" + place.location.latitude + "?q=" + place?.formattedAddress,
      android:
        "geo:" + place.location.latitude + "?q=" + place?.formattedAddress,
    });
    Linking.openURL(url);
  };

  return (
    <View key={place?.id} style={styles.renderItemContainer}>
      <View style={styles.imageContainer}>
        <TouchableOpacity
          style={styles.heartIcon}
          onPress={() => toggleFav(place, isFav)}
        >
          {isFav ? (
            <AntDesign name="hearto" size={24} color="black" />
          ) : (
            <AntDesign name="heart" size={24} color="red" />
          )}
        </TouchableOpacity>

        <Image
          source={
            place?.photos
              ? {
                  uri:
                    PHOTO_BASE_URL +
                    place?.photos[0]?.name +
                    `/media?key=${API_KEY}&maxHeightPx=800&maxWidthPx=1200`,
                }
              : require("../../assets/images/car-logo.png")
          }
          style={styles.image}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.displayName} numberOfLines={1}>
          {place?.displayName?.text}
        </Text>
        <View style={styles.detailsContainer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.address} numberOfLines={1}>
              {place?.shortFormattedAddress}
            </Text>
            <Text style={styles.connectors}>
              Connectors:{" "}
              <Text style={styles.connectorCount}>
                {place?.evChargeOptions?.connectorCount || 0}
              </Text>
            </Text>
          </View>
          <TouchableOpacity onPress={() => onDirectionClick(place)}>
            <MaterialIcons name="directions" size={32} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({
  renderItemContainer: {
    width: screenWidth - screenWidth * 0.1,
    backgroundColor: "white",
    borderRadius: 20,
    margin: 10,
    flex: 1,
  },
  heartIcon: {
    position: "absolute",
    zIndex: 1,
    right: 8,
    top: 8,
  },
  imageContainer: {
    margin: 10,
    flex: 1,
  },
  image: {
    width: "100%",
    height: 130,
    borderRadius: 10,
    marginBottom: 5,
  },
  infoContainer: {
    marginHorizontal: 10,
    marginBottom: 10,
    flex: 1,
  },
  displayName: {
    fontFamily: "outfit-bold",
    fontSize: 20,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    alignItems: "center",
  },
  address: {
    fontFamily: "outfit",
    fontSize: 15,
  },
  connectors: {
    fontFamily: "outfit",
    fontSize: 15,
  },
  connectorCount: {
    fontFamily: "outfit-semibold",
  },
});
