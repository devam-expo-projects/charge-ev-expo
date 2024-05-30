import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RouteNames } from "../../Common/constants";
import LoginScreen from "./LoginScreen";

const AuthenticationStack = createNativeStackNavigator();

export const Authentication = () => {
    return (
        <AuthenticationStack.Navigator
            initialRouteName={RouteNames.SIGN_SCREEN}
            screenOptions={{
                headerShown: false,
            }}>
            <AuthenticationStack.Screen
                name={RouteNames.SIGN_SCREEN}
                component={LoginScreen}
            />

        </AuthenticationStack.Navigator>
    );
};

export default Authentication;