import { Image, StyleSheet, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StatusBar } from "expo-status-bar";
import MapViewStyle from "../../Utiles/MapViewStyle.json";
import { UserLocation } from "../../Context/UserLocation";
import MapHeader from "../../Components/MapHeader";
import api from "../../Utiles/api";
import PlaceList from "../../Components/PlaceList";
import { MarkerSelection } from "../../Context/MarkerSelection";

const HomeScreen = () => {
  const { location, setLocation } = useContext(UserLocation);
  const [placeListData, setPlaceList] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const getlocation = (search) => {
    setLocation({
      latitude: search?.lat,
      longitude: search?.lng,
    });
    setSelectedMarker(0);
  };

  const getPlaceHandler = async () => {
    const data = {
      includedTypes: ["electric_vehicle_charging_station"],
      maxResultCount: 10,
      locationRestriction: {
        circle: {
          center: {
            latitude: location?.latitude,
            longitude: location?.longitude,
          },
          radius: 5000.0,
        },
      },
    };

    api.NewNearbyPlace(data).then((res) => {
      setPlaceList(res?.data?.places);
    });
  };

  useEffect(() => {
    location && getPlaceHandler();
    location &&
      getlocation({ lat: location?.latitude, lng: location?.longitude });
  }, [location?.latitude]);

  return (
    <MarkerSelection.Provider value={{ selectedMarker, setSelectedMarker }}>
      <View style={{ flexGrow: 1 }}>
        <StatusBar hidden={true} />
        <View style={styles.headerContainer}>
          <MapHeader setLocation={getlocation} />
        </View>
        <MapView
          style={styles.map}
          // customMapStyle={MapViewStyle} //Google Map
          region={{
            latitude: location?.latitude,
            longitude: location?.longitude,
            longitudeDelta: 0.0422,
            latitudeDelta: 0.0422,
          }}
        >
          {location?.latitude && location?.longitude && (
            <Marker
              coordinate={{
                latitude: location?.latitude,
                longitude: location?.longitude,
              }}
            >
              <Image
                source={require("./../../../assets/images/uber.png")}
                style={{ width: 70, height: 100, resizeMode: "contain" }}
              ></Image>
            </Marker>
          )}

          {placeListData &&
            placeListData?.map((item, index) => {
              return (
                <Marker
                  coordinate={{
                    latitude: item?.location?.latitude,
                    longitude: item?.location?.longitude,
                  }}
                  onPress={() => setSelectedMarker(index)}
                  index={index}
                  key={index}
                ></Marker>
              );
            })}
        </MapView>
        <View style={styles.placeList}>
          <PlaceList placeList={placeListData} />
        </View>
      </View>
    </MarkerSelection.Provider>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  headerContainer: {
    position: "absolute",
    zIndex: 1,
    padding: 20,
    width: "100%",
  },
  placeList: {
    position: "absolute",
    zIndex: 1,
    width: "100%",
    bottom: 10,
  },
});
