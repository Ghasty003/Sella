import { Image, SafeAreaView, StyleSheet } from "react-native";
import * as ProgressBar from "react-native-progress";
import colors from "../config/colors";

function SplashScreen() {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <Image
        style={styles.logo}
        source={require("../../assets/logo-black.png")}
      />

      <ProgressBar.Bar
        progress={0.3}
        color={colors.primary}
        style={styles.progress}
      />
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
