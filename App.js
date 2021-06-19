import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import SignInScreen from "./screens/SignInScreen";
import AccountScreen from "./screens/AccountScreen";
import SignUpScreen from "./screens/SignUpScreen";
import CreateScreen from "./screens/CreateScreen";
import ShowScreen from "./screens/ShowScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);

  async function loadToken() {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      setSignedIn(true);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadToken();
  }, []);

  return loading ? (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  ) : (
    <NavigationContainer>
      <Stack.Navigator
        mode="modal"
        headerMode="none"
        initialRouteName={signedIn ? "Account" : "SignIn"}
      >
        <Stack.Screen component={AccountScreen} name="Account" />
        <Stack.Screen component={SignInScreen} name="SignIn" />
        <Stack.Screen component={SignUpScreen} name="SignUp" />
        <Stack.Screen component={CreateScreen} name="Create" />
        <Stack.Screen component={ShowScreen} name="Show" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
