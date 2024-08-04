import { Button, Image, SafeAreaView, StyleSheet } from "react-native";
import * as ProgressBar from "react-native-progress";
import colors from "../config/colors";
import { useEffect, useState } from "react";
import { getToken } from "../config/token";
import * as SecureStore from "expo-secure-store";

function SplashScreen({ navigation }) {
  const [progress, setProgress] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const token = await getToken();
        console.log("token here ====", token);
        if (token) setIsAuthenticated(true);
      } catch (error) {
        // console.log(error);
        // alert(error.message);
      }
    })();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 1) clearInterval(timer);
        return p + 0.3;
      });
    }, 500);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 1 && !isAuthenticated) return navigation.navigate("Login");
    if (progress >= 1 && isAuthenticated) navigation.navigate("Hometab");
  }, [progress]);

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <Image
        style={styles.logo}
        source={require("../../assets/logo-black.png")}
      />

      <ProgressBar.Bar
        progress={progress}
        color={colors.primary}
        style={styles.progress}
      />
      {/* <Button
        title="Click"
        onPress={async () => await SecureStore.deleteItemAsync("@auth_token")}
      /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 300,
    height: 300,
    aspectRatio: 1,
    borderRadius: 50,
    marginTop: 100,
  },
  progress: {
    marginTop: 200,
  },
});

export default SplashScreen;
