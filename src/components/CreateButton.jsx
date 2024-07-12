import React from "react";
import { StyleSheet, TouchableHighlight } from "react-native";
import { View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import colors from "../config/colors";

function CreateButton({ handleOpen }) {
  return (
    <TouchableHighlight
      underlayColor="white"
      style={styles.parent}
      onPress={handleOpen}
    >
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Icon
            name="add"
            size={25}
            color={colors.primary}
            style={{ alignSelf: "center" }}
          />
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  parent: {
    backgroundColor: "white",
    width: 70,
    height: 70,
    borderRadius: 100,
    position: "absolute",
    bottom: 22,
    left: "50%",
    transform: [{ translateX: -30 }],
    padding: 3,
    zIndex: 1,
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 100,
    alignSelf: "center",
    padding: 13,
  },
  wrapper: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    borderRadius: 100,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CreateButton;
