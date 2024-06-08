import { Button, StyleSheet, View } from "react-native";
import React from "react";
import { RouteNames } from "../Common/constants";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import Authentication from "./Auth";
import Home from "./Home";
import { NavigationContainer } from "@react-navigation/native";

const AppStack = createNativeStackNavigator();


const Temp = () => {
    return <View style={{ flex: 1, borderWidth: 1, backgroundColor: 'gray' }}></View>
}

const Route = () => {
    return (
        <NavigationContainer>
            <SignedIn>
                <AppStack.Navigator screenOptions={{ headerShown: false }}>
                    <AppStack.Screen name={RouteNames.HOME} component={Temp} />
                </AppStack.Navigator>
            </SignedIn>
            <SignedOut>
                <AppStack.Navigator screenOptions={{ headerShown: false }}>
                    <AppStack.Screen name={RouteNames.AUTHENTICATION} component={Authentication} />
                </AppStack.Navigator>
            </SignedOut>
        </NavigationContainer>
    );
};

export default Route;

const styles = StyleSheet.create({});
