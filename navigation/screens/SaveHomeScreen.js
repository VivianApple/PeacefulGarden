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
import styles from "../../styles.js";

export default function HomeScreen({ navigation }) {
  const currentDate = useCurrentDate();
  const openingImageURL = useOpeningImage();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={{ marginTop: 50, fontWeight: "bold", fontSize: 26 }}>
          {" "}
          {currentDate}{" "}
        </Text>
      </View>

      <View style={styles.openingImageWrapper}>
        <Image
          source={{ uri: openingImageURL }}
          style={styles.openingImage}
        ></Image>
      </View>

      <View
        style={{
          flexDirection: "row",
          marginTop: 70,
          width: "85%",
          height: "30%",
          justifyContent: "center",
          backgroundColor: "white",
          borderRadius: 10,
          shadowColor: "grey",
          shadowOffset: {
            width: 5,
            height: 5,
          },
          shadowOpacity: 0.8,
          shadowRadius: 10,
          elevation: 9,
        }}
      >
        <View style={{ marginVertical: 10 }}>
          <TouchableOpacity
            style={[
              styles.openingButton,
              {
                flex: 1,
                backgroundColor: "#B8F6F2",
              },
            ]}
            onPress={() => navigation.navigate("Post")}
          >
            <Text style={styles.openingButtonText}>Gratefulness</Text>
            <Text style={styles.openingButtonText}>Post</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.openingButton,
              {
                flex: 2,
                backgroundColor: "#D8DCF6",
              },
            ]}
            onPress={() => navigation.navigate("Journal")}
          >
            <Text style={styles.openingButtonText}>Personal Journal</Text>
            <Text style={styles.openingButtonText}>and</Text>
            <Text style={styles.openingButtonText}>Mood Tracker</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginVertical: 10 }}>
          <TouchableOpacity
            style={[
              styles.openingButton,
              {
                flex: 2,
                backgroundColor: "#F6F2D8",
              },
            ]}
            onPress={() => navigation.navigate("Question")}
          >
            <Text style={styles.openingButtonText}>Self-awareness</Text>
            <Text style={styles.openingButtonText}>Question</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.openingButton,
              {
                flex: 1,
                backgroundColor: "#F6D8DC",
              },
            ]}
            onPress={() => navigation.navigate("Music")}
          >
            <Text style={styles.openingButtonText}>Relaxing Music </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     //justifyContent: 'center',
//   },
//   openingimage: {
//     width: "100%",
//     height: 300,
//     top: 50,
//   },
// });