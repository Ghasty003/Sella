import { Button, Image, SafeAreaView, StyleSheet } from "react-native";
import * as ProgressBar from "react-native-progress";
import colors from "../config/colors";
import { useEffect, useState } from "react";

function SplashScreen({ navigation }) {
  const [progress, setProgress] = useState(0);

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
    if (progress >= 1) navigation.navigate("Login");
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
      {/* <Button title="Click" onPress={() => navigation.navigate("Login")} /> */}
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
