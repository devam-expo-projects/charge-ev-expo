import {
  ActivityIndicator,
  Dimensions,
  Image,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useMemo } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
// import { EXPO_GOOGLE_API_KEY } from "@env";
import { useAssets } from "expo-asset";
const screenWidth = Dimensions.get("screen").width;

const PlaceItem = ({ place, toggleFav, isFav, loading }) => {
  const EXPO_GOOGLE_API_KEY = "AIzaSyBK3N8jLF0URASWuHcrQQtAnIJsmU3Kl-I";
  const PHOTO_BASE_URL = "https://places.googleapis.com/v1/";

  const [assets, error] = useAssets([
    require("../../assets/images/car-logo.png"),
  ]);

  const onDirectionClick = (place) => {
    const { location, formattedAddress } = place;
    const url = Platform.select({
      ios: `maps:${location.latitude},${location.longitude}?q=${formattedAddress}`,
      android: `geo:${location.latitude},${location.longitude}?q=${formattedAddress}`,
    });
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open maps app:", err)
    );
  };

  const connectorCount = parseInt(place.evChargeOptions?.connectorCount) || 0;

  const imageURI = useMemo(() => {
    return place?.photos?.[0]?.name
      ? {
          uri: `${PHOTO_BASE_URL}${place.photos[0].name}/media?key=${EXPO_GOOGLE_API_KEY}&maxHeightPx=800&maxWidthPx=1200`,
        }
      : assets?.[0]
      ? assets[0]
      : null;
  }, [place, assets]);

  return (
    <View style={styles.renderItemContainer}>
      <View style={styles.imageContainer}>
        <TouchableOpacity
          style={styles.heartIcon}
          onPress={() => toggleFav(place, isFav)}
        >
          {loading ? (
            <ActivityIndicator />
          ) : !isFav ? (
            <AntDesign name="heart" size={24} color="red" />
          ) : (
            <AntDesign name="hearto" size={24} color="black" />
          )}
        </TouchableOpacity>
        {(imageURI || imageURI?.uri) && (
          <Image source={imageURI} style={styles.image} />
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.displayName} numberOfLines={1}>
          {place.displayName.text}
        </Text>
        <View style={styles.detailsContainer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.address} numberOfLines={1}>
              {place.shortFormattedAddress}
            </Text>
            <Text style={styles.connectors}>
              Connectors:{" "}
              <Text style={styles.connectorCount}>{connectorCount}</Text>
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
    fontSize: 20,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    alignItems: "center",
  },
  address: {
    fontSize: 15,
  },
  connectors: {
    fontSize: 15,
  },
  connectorCount: {
    fontWeight: "bold",
  },
});
