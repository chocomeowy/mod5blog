import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { commonStyles } from "../styles/commonStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API = "https://chocomeowy.pythonanywhere.com";
const CREATE = "/create";

export default function CreateScreen({ navigation }) {
  return (
    <View style={commonStyles.container}>
      <Text>Create Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
