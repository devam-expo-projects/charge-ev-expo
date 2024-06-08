import { Button, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { RouteNames } from "../Common/constants";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import Authentication from "./Auth";
import Home from "./Home";
import { NavigationContainer } from "@react-navigation/native";
import { ClerkLoaded, useUser } from "@clerk/clerk-expo";
import * as SplashScreen from 'expo-splash-screen';

const AppStack = createNativeStackNavigator();


const Temp = () => {
    return <View style={{ flex: 1, borderWidth: 1, backgroundColor: 'gray' }}></View>
}

const Route = () => {
    const { isSignedIn, isLoaded } = useUser();

    useEffect(() => {
        if (isLoaded) {
            SplashScreen.hideAsync();
        }
    }, [isLoaded]);

    return (
        <NavigationContainer>
            <ClerkLoaded>
                {isSignedIn ?
                    <AppStack.Navigator screenOptions={{ headerShown: false }}>
                        <AppStack.Screen name={RouteNames.HOME} component={Home} />
                    </AppStack.Navigator>
                    : <AppStack.Navigator screenOptions={{ headerShown: false }}>
                        <AppStack.Screen name={RouteNames.AUTHENTICATION} component={Authentication} />
                    </AppStack.Navigator>
                }
            </ClerkLoaded>
        </NavigationContainer>
    );
};

export default Route;

const styles = StyleSheet.create({});
