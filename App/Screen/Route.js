import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { RouteNames } from "../Common/constants";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import Authentication from "./Auth";
import Home from "./Home";

const AppStack = createNativeStackNavigator();

const Route = () => {
    let initialRoute = RouteNames.AUTHENTICATION;

    return (
        <>
            <SignedIn>
                <AppStack.Navigator screenOptions={{ headerShown: false }}>
                    <AppStack.Screen name={RouteNames.HOME} component={Home} />
                </AppStack.Navigator>
            </SignedIn>
            <SignedOut>
                <AppStack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
                    <AppStack.Screen name={RouteNames.AUTHENTICATION} component={Authentication} />
                </AppStack.Navigator>
            </SignedOut>
        </>
    );
};

export default Route;

const styles = StyleSheet.create({});
