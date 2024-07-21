import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import colors from "../config/colors";

function MyListings() {
  const data = [
    {
      id: 1,
      text: "Jacket",
      price: 100,
    },
    {
      id: 2,
      text: "Camera",
      price: 100,
    },
    {
      id: 3,
      text: "Phone",
      price: 100,
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <FlatList
        style={{ width: "100%" }}
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.container}
            activeOpacity={0.7}
            // onPress={handleOpen}
          >
            <Image
              style={styles.image}
              source={require("../../assets/couch.jpeg")}
            />
            <Text style={{ fontSize: 18, paddingLeft: 10, marginVertical: 10 }}>
              {item.text}
            </Text>
            <Text
              style={{ fontSize: 18, paddingLeft: 10, color: colors.primary }}
            >
              ${item.price}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  categoryStyle: {
    backgroundColor: "white",
    width: 120,
    height: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryText: {
    fontSize: 18,
    // alignSelf: "center",
  },
  container: {
    width: "90%",
    height: 320,
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 20,
    flexDirection: "column",
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
    objectFit: "fill",
  },
});

export default MyListings;
