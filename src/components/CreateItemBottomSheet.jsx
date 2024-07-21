import React, { useImperativeHandle, useState } from "react";
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
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";

const { height: SCREEN_HEIGHT } = Dimensions.get("screen");

function ItemDetailsBottomSheet({}, ref) {
  const translateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });

  const [selectedImages, setSelectedImages] = useState([]);
  const [category, setCategory] = useState("");

  const handleCloseBottomSheet = () => {
    "worklet";
    translateY.value = withSpring(SCREEN_HEIGHT, { damping: 50 });
  };

  const open = () => {
    "worklet";
    translateY.value = withSpring(-SCREEN_HEIGHT + 50, { damping: 50 });
  };

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

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      allowsEditing: true,
      //   allowsMultipleSelection: true,
    });

    // console.log(result.assets);
    if (result.canceled) return;
    setSelectedImages((prevImages) => [...prevImages, result.assets[0]]);
  };

  //   console.log("selcted images: ", selectedImages);

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.container, reanimatedStyle]}>
        <Text
          style={{
            fontWeight: "600",
            fontSize: 27,
            marginVertical: 10,
          }}
        >
          Add New Item
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 20,
            marginTop: 10,
          }}
        >
          <View style={styles.imageContainer}>
            {selectedImages.map(({ uri }, idx) => (
              <Image key={idx} source={{ uri }} style={styles.image} />
            ))}
          </View>

          <TouchableOpacity
            style={{
              width: 100,
              height: 100,
              backgroundColor: "#00000020",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 7,
            }}
            onPress={handlePickImage}
          >
            <Icon
              name="camera"
              size={30}
              color="#00000090"
              style={{ alignSelf: "center" }}
            />
          </TouchableOpacity>
        </View>

        <View style={{ gap: 20, marginTop: 30 }}>
          <View style={styles.input}>
            <MaterialIcon name="edit" size={20} color="gray" />
            <TextInput
              placeholder="Title"
              cursorColor={colors.primary}
              style={{ width: "80%" }}
            />
          </View>

          <View
            style={[
              styles.input,
              { width: 150, alignSelf: "flex-start", marginLeft: 20 },
            ]}
          >
            <Icon name="dollar" size={20} color="gray" />
            <TextInput
              placeholder="Price"
              cursorColor={colors.primary}
              style={{ width: "80%" }}
              keyboardType="numeric"
            />
          </View>

          <View
            style={[
              styles.input,
              { width: 250, alignSelf: "flex-start", marginLeft: 20 },
            ]}
          >
            <MaterialIcon name="category" size={20} color="gray" />
            <RNPickerSelect
              placeholder={{
                value: null,
                label: "Category",
              }}
              items={[
                { label: "Camera", value: "camera" },
                { label: "Book", value: "book" },
                { label: "Car", value: "car" },
                { label: "Clothing", value: "clothing" },
                { label: "Movie & Music", value: "movie & music" },
                { label: "Games", value: "games" },
                { label: "Funiture", value: "funiture" },
                { label: "Other", value: "other" },
              ]}
              onValueChange={(value) => {
                setCategory(value);
                console.log(value);
              }}
            />
          </View>

          <View style={styles.input}>
            <MaterialIcon name="description" size={20} color="gray" />
            <TextInput
              placeholder="Description"
              cursorColor={colors.primary}
              style={{ width: "80%" }}
            />
          </View>

          <TouchableOpacity style={styles.button} activeOpacity={0.7}>
            <Text style={{ color: "white", alignSelf: "center", fontSize: 18 }}>
              Post
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleCloseBottomSheet}
          >
            <Text
              style={{
                color: colors.primary,
                fontSize: 18,
                fontWeight: "600",
                alignSelf: "center",
              }}
            >
              Cancel
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
    paddingLeft: 10,
  },
  imageContainer: {
    flexDirection: "row",
    gap: 20,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    objectFit: "fill",
    borderRadius: 7,
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
