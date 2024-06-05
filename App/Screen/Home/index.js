import React, { useEffect, useState } from "react";
import { RouteNames } from "../../Common/constants";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import HomeScreen from "./HomeScreen";
import FavoriteScreen from "./FavoriteScreen";
import * as Location from 'expo-location';
import { UserLocation } from "../../Context/UserLocation";
const Tab = createMaterialBottomTabNavigator();

export const Home = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let resLocation = await Location.getCurrentPositionAsync({});
            setLocation(resLocation?.coords);
        })();
    }, []);

    return (
        <UserLocation.Provider value={{ location, setLocation }}>
            <Tab.Navigator initialRouteName={RouteNames.HOME_SCRENN}>
                <Tab.Screen name={RouteNames.HOME_SCRENN} component={HomeScreen} options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="home" size={24} color="black" />
                    )
                }} />

                <Tab.Screen name={RouteNames.FAVORITE_SCREEN} component={FavoriteScreen} options={{
                    tabBarLabel: "Favorite",
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="hearto" size={24} color="black" />
                    )
                }} />

            </Tab.Navigator>
        </UserLocation.Provider>
    );
};

export default Home;