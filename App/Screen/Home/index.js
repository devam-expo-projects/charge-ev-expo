import React from "react";
import { RouteNames } from "../../Common/constants";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import HomeScreen from "./HomeScreen";
import FavoriteScreen from "./FavoriteScreen";

const Tab = createMaterialBottomTabNavigator();
export const Home = () => {
    return (
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

            {/* <Tab.Screen
                name={RouteNames.FAVORITE_SCREEN}
                component={FavoriteScreen}
                options={{
                    tabBarLabel: "Favorite",
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="hearto" size={24} color={color} />
                    ),
                }}
            /> */}
        </Tab.Navigator>
    );
};

export default Home;