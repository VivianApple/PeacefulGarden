import * as React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Alert,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import useCurrentDate, { useOpeningImage } from "../components/CommonFunctions";

export default function HomeScreen({ navigation }) {
  const currentDate = useCurrentDate();
  const openingImageURL = useOpeningImage();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={{ top: 20, fontWeight: "bold", fontSize: 26 }}>
          {" "}
          {currentDate}{" "}
        </Text>
      </View>

      <Image
        source={{ uri: openingImageURL }}
        style={styles.openingimage}
      ></Image>

      <View style={{ flexDirection: "row", top: 70, height: 300 }}>
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: "#B6E4CB",
              justifyContent: "center",
              alignItems: "center",
              margin: 10,
              padding: 10,
              borderRadius: 20,
              flex: 1,
            }}
            onPress={() => navigation.navigate("Post")}
          >
            <Text style={{ fontWeight: "bold", fontSize: 22 }}>
              Gratefulness
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 22 }}>Post</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: "#B5CBDF",
              justifyContent: "center",
              alignItems: "center",
              margin: 10,
              padding: 10,
              borderRadius: 20,
              flex: 2,
            }}
            onPress={() => navigation.navigate("Journal")}
          >
            <Text style={{ fontWeight: "bold", fontSize: 22 }}>
              Personal Journal
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 22 }}>and</Text>
            <Text style={{ fontWeight: "bold", fontSize: 22 }}>
              Mood Tracker
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            style={{
              backgroundColor: "#B2E5DC",
              justifyContent: "center",
              alignItems: "center",
              margin: 10,
              padding: 10,
              borderRadius: 20,
              flex: 2,
            }}
            onPress={() => navigation.navigate("Question")}
          >
            <Text style={{ fontWeight: "bold", fontSize: 22 }}>
              Self-awareness
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 22 }}>Question</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: "#E8D8D8",
              justifyContent: "center",
              alignItems: "center",
              margin: 10,
              padding: 10,
              borderRadius: 20,
              flex: 1,
            }}
            onPress={() => navigation.navigate("Music")}
          >
            <Text style={{ fontWeight: "bold", fontSize: 22 }}>
              Relaxing Music{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    //justifyContent: 'center',
  },
  openingimage: {
    width: "100%",
    height: 300,
    top: 50,
  },
});
