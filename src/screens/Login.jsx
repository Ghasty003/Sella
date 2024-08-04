import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../config/colors";
import useAuth from "../hooks/useAuth";

function Login({ navigation }) {
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      await login(formData);
    } catch (error) {
      alert(error.response.data.message);
    }
    // navigation.navigate("Hometab")
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <Image style={styles.logo} source={require("../../assets/market.png")} />

      <View style={styles.inputContainer}>
        <View style={styles.input}>
          <Icon name="email" size={20} color="gray" />
          <TextInput
            placeholder="Enter email address"
            cursorColor={colors.primary}
            style={{ width: "80%" }}
            autoCapitalize="none"
            onChangeText={(value) => {
              setFormData((prevData) => ({ ...prevData, email: value }));
            }}
          />
        </View>

        <View style={styles.input}>
          <Icon name="lock" size={20} color="gray" />
          <TextInput
            placeholder="Enter password"
            cursorColor={colors.primary}
            secureTextEntry
            style={{ width: "80%" }}
            onChangeText={(value) => {
              setFormData((prevData) => ({ ...prevData, password: value }));
            }}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={{ color: "white", alignSelf: "center", fontSize: 18 }}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text
            style={{ color: colors.primary, alignSelf: "center", fontSize: 18 }}
          >
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 30,
    width: "100%",
    gap: 20,
  },
  loginButton: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: colors.primary,
    color: "white",
    borderRadius: 50,
    paddingVertical: 15,
  },
  logo: {
    width: 100,
    height: 100,
    aspectRatio: 1,
    marginTop: 100,
  },
  inputContainer: {
    width: "100%",
    marginTop: 40,
    gap: 20,
  },
  input: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#00000020",
    borderRadius: 50,
    paddingVertical: 18,
    paddingHorizontal: 20,
    flexDirection: "row",
    gap: 10,
  },
});

export default Login;
