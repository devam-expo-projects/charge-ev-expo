import {
  Dimensions,
  FlatList,
  Image,
  Linking,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { MarkerSelection } from "../Context/MarkerSelection";
import { AntDesign } from "@expo/vector-icons";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import app from "../Utiles/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import { useFocusEffect } from "@react-navigation/native";
import PlaceItem from "./PlaceItem";

const screenWidth = Dimensions.get("screen").width;

const PlaceList = ({ placeList }) => {
  const API_KEY = "AIzaSyBKnfAl9mGbPIPlbSoqpTOJYAdWJtOqdas";
  const PHOTO_BASE_URL = "https://places.googleapis.com/v1/";
  const flatListRef = useRef();
  const db = getFirestore(app);
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress.emailAddress;

  const { selectedMarker, setSelectedMarker } = useContext(MarkerSelection);
  const [favList, setFavList] = useState([]);

  const getFav = async () => {
    const querySnapshot = await getDocs(
      query(collection(db, "charge-ev"), where("email", "==", userEmail))
    );
    const favs = [];
    querySnapshot.forEach((doc) => {
      favs.push(doc.data());
    });
    setFavList(favs);
  };

  const toggleFav = async (place, toAdd) => {
    try {
      if (toAdd) {
        await setDoc(doc(db, "charge-ev", place?.id?.toString()), {
          place: place,
          email: userEmail,
        });
        if (Platform.OS === "android") {
          ToastAndroid.show(
            "Document written with ID: ",
            place?.id?.toString()
          );
        }
      } else {
        await deleteDoc(doc(db, "charge-ev", place?.id?.toString()));
        if (Platform.OS === "android") {
          ToastAndroid.show("Document Removed of ID: ", place?.id?.toString());
        }
      }

      getFav();
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };

  const scrollToIndex = (index) => {
    flatListRef.current?.scrollToIndex({ animated: true, index });
  };

  const getItemLayout = (_, index) => ({
    length: screenWidth - screenWidth * 0.1,
    offset: screenWidth * index,
    index,
  });

  useEffect(() => {
    selectedMarker && scrollToIndex(selectedMarker);
  }, [selectedMarker]);

  useEffect(() => {
    user && getFav();
  }, [user]);

  const isFav = (placeId) => {
    const result = favList?.find((item) => item.place.id === placeId);
    return !!result ? false : true;
  };

  useFocusEffect(
    React.useCallback(() => {
      getFav();
    }, [])
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={placeList}
        ref={flatListRef}
        getItemLayout={getItemLayout}
        horizontal={true}
        renderItem={({ item, index }) => {
          const isFavrite = isFav(item?.id);
          return (
            <PlaceItem
              place={item}
              key={index}
              toggleFav={toggleFav}
              isFav={isFavrite}
            />
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default PlaceList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  renderItemContainer: {
    width: screenWidth - screenWidth * 0.1,
    backgroundColor: "white",
    borderRadius: 20,
    margin: 10,
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
