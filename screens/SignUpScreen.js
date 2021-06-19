import React from "react";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { commonStyles } from "../styles/commonStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API = "https://chocomeowy.pythonanywhere.com";
const NEWUSER = "/newuser";

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);

  async function SignUp() {
    console.log("---- Login time ----");

    try {
      setLoading(true);
      const response = await axios.post(API + NEWUSER, {
        username,
        password,
      });
      console.log("Success logging in!");
      await AsyncStorage.setItem("token", response.data.access_token);
      setLoading(false);
      navigation.navigate("Account");
    } catch (error) {
      setLoading(false);
      console.log("Error logging in!");
      console.log(error.response);

      setErrorText(error.response.data.description);
    }
  }

  return (
    <View style={commonStyles.container}>
      <Text>Sign Up Screen</Text>
      <Text style={styles.fieldTitle}>Username</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        value={username}
        onChangeText={(input) => setUsername(input)}
      />
      <Text style={styles.fieldTitle}>Password</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        autoCompleteType="password"
        autoCorrect={false}
        secureTextEntry={true}
        value={password}
        onChangeText={(input) => setPassword(input)}
      />
      <TouchableOpacity onPress={SignUp} style={styles.signUpButton}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={{ color: "orange" }}>Dismiss</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  signUpButton: {
    backgroundColor: "blue",
    width: 120,
    alignItems: "center",
    padding: 18,
    marginTop: 12,
    marginBottom: 36,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
  },
  input: {
    borderColor: "#999",
    borderWidth: 1,
    marginBottom: 24,
    padding: 4,
    height: 36,
    fontSize: 18,
    backgroundColor: "white",
  },
});
