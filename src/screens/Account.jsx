import React from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import colors from "../config/colors";

function Account() {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <View style={styles.profile}>
        <Image
          source={require("../../assets/user.png")}
          style={{ width: 55, height: 55 }}
        />
        <View style={{ gap: 2 }}>
          <Text style={{ fontSize: 16, fontWeight: 500 }}>Ghasty</Text>
          <Text style={{ fontSize: 16, color: "gray" }}>
            gbolahanajenikoko@gmail.com
          </Text>
        </View>
      </View>

      <View style={styles.listing}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <View
            style={{
              backgroundColor: colors.primary,
              borderRadius: 100,
              padding: 5,
            }}
          >
            <Icon name="list" size={25} color="white" />
          </View>
          <Text style={{ fontSize: 18, fontWeight: "500" }}>My Listings</Text>
        </View>
        <Icon name="chevron-right" size={25} style={{ alignSelf: "center" }} />
      </View>

      <View style={[styles.listing, { marginTop: 3 }]}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <View
            style={{
              backgroundColor: colors.primary,
              borderRadius: 100,
              padding: 5,
            }}
          >
            <Icon name="message" size={25} color="white" />
          </View>
          <Text style={{ fontSize: 18, fontWeight: "500" }}>My Messages</Text>
        </View>
        <Icon name="chevron-right" size={25} style={{ alignSelf: "center" }} />
      </View>

      <View style={[styles.listing, { marginTop: 50 }]}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <View
            style={{
              backgroundColor: colors.primary,
              borderRadius: 100,
              padding: 6,
            }}
          >
            <MaterialIcon name="logout" size={25} color="white" />
          </View>
          <Text style={{ fontSize: 18, fontWeight: "500" }}>Logout</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 10,
    backgroundColor: "white",
    width: "100%",
    padding: 20,
  },
  listing: {
    backgroundColor: "white",
    width: "100%",
    padding: 15,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Account;
