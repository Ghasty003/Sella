import { FlatList, Image, RefreshControl } from "react-native";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../config/colors";
import { useState } from "react";

function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const categories = ["Books", "Computers", "Cameras"];

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

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <ScrollView horizontal style={{ marginTop: 20, paddingBottom: 15 }}>
        <View style={{ gap: 20, flexDirection: "row" }}>
          {categories.map((text, idx) => (
            <TouchableOpacity style={styles.categoryStyle} key={idx}>
              <Text style={styles.categoryText}>{text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <FlatList
        style={{ width: "100%" }}
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.container}>
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
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

export default Home;
