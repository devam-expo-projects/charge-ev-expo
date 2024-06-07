import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
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
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                }

                let servicesEnabled = await Location.hasServicesEnabledAsync();
                if (!servicesEnabled) {
                    setErrorMsg('Location services are disabled');
                    return;
                }

                let resLocation = await Location.getCurrentPositionAsync({});
                setLocation(resLocation?.coords);
            } catch (error) {
                setErrorMsg('Failed to get location. Please ensure location services are enabled.');
                console.error(error);
            }
        })();
    }, []);

    useEffect(() => {
        if (errorMsg) {
            Alert.alert('Error', errorMsg);
        }
    }, [errorMsg]);

    return (
        <UserLocation.Provider value={{ location, setLocation }}>
            <Tab.Navigator initialRouteName={RouteNames.HOME_SCREEN}>
                <Tab.Screen
                    name={RouteNames.HOME_SCREEN}
                    component={HomeScreen}
                    options={{
                        tabBarLabel: "Home",
                        tabBarIcon: ({ color, size }) => (
                            <AntDesign name="home" size={24} color={color} />
                        ),
                    }}
                />

                <Tab.Screen
                    name={RouteNames.FAVORITE_SCREEN}
                    component={FavoriteScreen}
                    options={{
                        tabBarLabel: "Favorite",
                        tabBarIcon: ({ color, size }) => (
                            <AntDesign name="hearto" size={24} color={color} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </UserLocation.Provider>
    );
};

export default Home;