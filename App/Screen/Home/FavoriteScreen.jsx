import {
  ActivityIndicator,
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
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
import app from "../../Utiles/FirebaseConfig";
import PlaceItem from "../../Components/PlaceItem";
import { useFocusEffect } from "@react-navigation/native";
import Header from "../../Components/Header";

const FavoriteScreen = () => {
  const db = getFirestore(app);
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress.emailAddress;
  const [favList, setFavList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getFav = async () => {
    const querySnapshot = await getDocs(
      query(collection(db, "charge-ev"), where("email", "==", userEmail))
    );
    const favs = [];
    querySnapshot.forEach((doc) => {
      favs.push(doc.data());
    });
    setFavList([...favs]);
  };

  useEffect(() => {
    setLoading(true);
    user && getFav();
    setLoading(false);
  }, [user]);

  const toggleFav = async (place, toAdd) => {
    setLoading(true);
    try {
      if (toAdd) {
        await setDoc(doc(db, "charge-ev", place?.id?.toString()), {
          place: place,
          email: userEmail,
        });
      } else {
        await deleteDoc(doc(db, "charge-ev", place?.id?.toString()));
      }
      await getFav();
      setLoading(false);
    } catch (err) {
      console.error("Error adding document: ", err);
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      getFav();
      setLoading(false);
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      {Platform.OS === "android" && <StatusBar barStyle={"default"} />}
      <Header text={"My Favorite"} subText={"Place"} />
      <View style={{ flex: 1, justifyContent: "center" }}>
        {favList?.length ? (
          <FlatList
            data={favList}
            refreshing={loading}
            loading={
              <ActivityIndicator
                size={"large"}
                color={"green"}
              ></ActivityIndicator>
            }
            onRefresh={getFav}
            renderItem={({ item, index }) => (
              <PlaceItem
                isFav={false}
                place={item?.place}
                key={index}
                toggleFav={toggleFav}
                loading={loading}
              />
            )}
          ></FlatList>
        ) : (
          <Text style={styles.emptyMessage}>Favorite List Empty</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(208, 208, 192, 0.5)",
  },
  header: {
    // fontFamily: "outfit-bold",
    fontSize: 25,
    marginVertical: 10,
  },
  emptyMessage: {
    // fontFamily: "outfit"
  },
});
