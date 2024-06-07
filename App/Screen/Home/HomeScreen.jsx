import React, { useContext, useEffect, useState, useMemo } from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { StatusBar } from "expo-status-bar";
import MapViewStyle from "../../Utiles/MapViewStyle.json";
import { UserLocation } from "../../Context/UserLocation";
import MapHeader from "../../Components/MapHeader";
import api from "../../Utiles/api";
import PlaceList from "../../Components/PlaceList";
import { MarkerSelection } from "../../Context/MarkerSelection";
import * as Location from "expo-location";

const HomeScreen = () => {
  const [placeListData, setPlaceList] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        let servicesEnabled = await Location.hasServicesEnabledAsync();
        if (!servicesEnabled) {
          setErrorMsg("Location services are disabled");
          return;
        }

        let resLocation = await Location.getCurrentPositionAsync({});
        setLocation(resLocation?.coords);
      } catch (error) {
        setErrorMsg(
          "Failed to get location. Please ensure location services are enabled."
        );
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (errorMsg) {
      Alert.alert("Error", errorMsg);
    }
  }, [errorMsg]);

  const getlocation = (search) => {
    console.log("get Location called");
    setLocation({
      latitude: search?.lat || 0,
      longitude: search?.lng || 0,
    });
    setSelectedMarker(0);
  };

  // const getPlaceHandler = async () => {
  //   if (!location) return;

  //   const data = {
  //     includedTypes: ["electric_vehicle_charging_station"],
  //     maxResultCount: 10,
  //     locationRestriction: {
  //       circle: {
  //         center: {
  //           latitude: location.latitude,
  //           longitude: location.longitude,
  //         },
  //         radius: 5000.0,
  //       },
  //     },
  //   };
  //   try {
  //     const res = await api.NewNearbyPlace(data);
  //     setPlaceList(res?.data?.places || []);
  //   } catch (error) {
  //     console.error("Error fetching nearby places:", error);
  //   }
  // };

  // useEffect(() => {
  //   if (location) {
  //     getPlaceHandler();
  //     getlocation({ lat: location?.latitude, lng: location?.longitude });  //TODO
  //   }
  // }, [location?.latitude, location?.longitude]);

  const mapRegion = useMemo(
    () => ({
      latitude: location?.latitude || 0,
      longitude: location?.longitude || 0,
      longitudeDelta: 0.0422,
      latitudeDelta: 0.0422,
    }),
    [location?.latitude, location?.longitude]
  );

  return (
    <MarkerSelection.Provider value={{ selectedMarker, setSelectedMarker }}>
      <UserLocation.Provider value={{ location, setLocation }}>
        <View style={{ flex: 1 }}>
          <StatusBar hidden={true} />
          <View style={styles.headerContainer}>
            <MapHeader setLocation={getlocation} />
          </View>
          <MapView style={styles.map} region={mapRegion}>
            {location && (
              <Marker
                coordinate={{
                  latitude: location?.latitude,
                  longitude: location?.longitude,
                }}
              >
                <Image
                  source={require("./../../../assets/images/uber.png")}
                  style={{ width: 40, height: 60, resizeMode: "contain" }}
                />
              </Marker>
            )}

            {placeListData?.map((item, index) => (
              <Marker
                coordinate={{
                  latitude: item?.location?.latitude,
                  longitude: item?.location?.longitude,
                }}
                onPress={() => setSelectedMarker(index)}
                index={index}
                key={index}
              />
            ))}
          </MapView>
          <View style={styles.placeList}>
            <PlaceList placeList={placeListData} />
          </View>
        </View>
      </UserLocation.Provider>
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
