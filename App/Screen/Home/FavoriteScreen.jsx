import {
  ActivityIndicator,
  FlatList,
  Platform,
  SafeAreaView,
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
      setLoading(false);
    } catch (err) {
      console.error("Error adding document: ", err);
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getFav();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.header}>
          My Favorite <Text style={{ color: "green" }}>Place</Text>
        </Text>
      </View>
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
            onRefresh={() => getFav()}
            renderItem={({ item, index }) => (
              <PlaceItem
                place={item?.place}
                key={index}
                toggleFav={toggleFav}
              />
            )}
          ></FlatList>
        ) : (
          <Text style={{ fontFamily: "origin" }}>Favorite List Empty</Text>
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
  },
  header: {
    fontFamily: "outfit-bold",
    fontSize: 25,
    marginVertical: 10,
  },
});
