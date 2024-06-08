import {
  Dimensions,
  FlatList,
  StyleSheet,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { MarkerSelection } from "../Context/MarkerSelection";
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
  const flatListRef = useRef();
  const db = getFirestore(app);
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  const { selectedMarker, setSelectedMarker } = useContext(MarkerSelection);
  const [favList, setFavList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getFav = async () => {
    try {
      if (userEmail) {
        const querySnapshot = await getDocs(
          query(collection(db, "charge-ev"), where("email", "==", userEmail))
        );
        const favs = [];
        querySnapshot.forEach((doc) => {
          favs.push(doc.data());
        });
        setFavList(favs);
      } else {
        Alert.alert("User not found");
      }
    } catch (error) {
      console.error("Error fetching favorite places: ", error);
      Alert.alert("Error", "An error occurred while fetching favorite places.");
    }
  };

  const toggleFav = async (place, toAdd) => {
    setLoading(true);
    try {
      if (toAdd) {
        await setDoc(doc(db, "charge-ev", place?.id), {
          place: place,
          email: userEmail,
        });
      } else {
        await deleteDoc(doc(db, "charge-ev", place?.id));
      }
      await getFav();
    } catch (error) {
      console.error("Error toggling favorite: ", error);
      Alert.alert("Error", "An error occurred while updating favorites.");
    } finally {
      setLoading(false);
    }
  };

  const scrollToIndex = (index) => {
    try {
      flatListRef.current?.scrollToIndex({ animated: true, index });
    } catch (error) {
      console.error("Error scrolling to index: ", error);
    }
  };

  useEffect(() => {
    if (selectedMarker !== null) {
      scrollToIndex(selectedMarker);
    }
  }, [selectedMarker]);

  useEffect(() => {
    if (user) {
      getFav();
    }
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
        horizontal
        renderItem={({ item, index }) => {
          const isFavrite = isFav(item?.id);
          return (
            <PlaceItem
              place={item}
              key={index.toString()}
              toggleFav={toggleFav}
              isFav={isFavrite}
              loading={loading}
            />
          );
        }}
        showsHorizontalScrollIndicator={false}
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
});
