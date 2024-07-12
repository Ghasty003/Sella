import React, { useEffect, useImperativeHandle, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import colors from "../config/colors";
import Icon from "react-native-vector-icons/FontAwesome5";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Modal } from "react-native";
import { useSelector } from "react-redux";

const { height: SCREEN_HEIGHT } = Dimensions.get("screen");

function ItemDetailsBottomSheet({}, ref) {
  const translateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });

  const handleCloseBottomSheet = () => {
    "worklet";
    translateY.value = withSpring(SCREEN_HEIGHT, { damping: 50 });
  };

  const open = () => {
    "worklet";
    translateY.value = withSpring(-SCREEN_HEIGHT + 50, { damping: 50 });
  };

  const { openDetails } = useSelector((store) => store.state);

  useEffect(() => {
    if (openDetails) {
      open();
    }
  }, [openDetails]);

  useImperativeHandle(
    ref,
    () => {
      return {
        open,
      };
    },
    []
  );

  const pan = Gesture.Pan()
    .onBegin(() => {
      context.value.y = translateY.value;
    })
    .onUpdate((e) => {
      translateY.value = e.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, -SCREEN_HEIGHT + 50);
    })
    .onFinalize(() => {
      if (translateY.value > -SCREEN_HEIGHT + 100) {
        handleCloseBottomSheet();
      }
    });

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  }, []);

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.container, reanimatedStyle]}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/couch.jpeg")}
            style={styles.image}
          />
          <TouchableHighlight
            style={{
              position: "absolute",
              top: 15,
              left: 10,
              backgroundColor: "#00000060",
              width: 35,
              height: 35,
              borderRadius: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={handleCloseBottomSheet}
          >
            <Icon name="times" size={20} color="white" />
          </TouchableHighlight>
        </View>
        <View style={{ padding: 10, gap: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "500" }}>Gray Couch</Text>
          <Text
            style={{ fontSize: 20, fontWeight: "500", color: colors.primary }}
          >
            $100
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              marginTop: 20,
            }}
          >
            <Image
              source={require("../../assets/user.png")}
              style={{ width: 55, height: 55 }}
            />
            <View style={{ gap: 2 }}>
              <Text style={{ fontSize: 16, fontWeight: 500 }}>Ghasty</Text>
              <Text style={{ fontSize: 16, color: "gray" }}>5 Listings</Text>
            </View>
          </View>

          <TextInput
            placeholder="Enter username"
            cursorColor={colors.primary}
            style={styles.input}
            defaultValue="Is the item still available?"
          />
          <TouchableOpacity style={styles.button} activeOpacity={0.7}>
            <Text style={{ color: "white", alignSelf: "center", fontSize: 18 }}>
              Contact Seller
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    height: SCREEN_HEIGHT,
    position: "absolute",
    top: SCREEN_HEIGHT,
    zIndex: 3,
  },
  imageContainer: {
    width: "100%",
    height: 250,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    objectFit: "fill",
  },
  input: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#00000020",
    borderRadius: 50,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginTop: 50,
  },
  button: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: colors.primary,
    color: "white",
    borderRadius: 50,
    paddingVertical: 15,
    marginTop: 10,
  },
});

export default React.forwardRef(ItemDetailsBottomSheet);
