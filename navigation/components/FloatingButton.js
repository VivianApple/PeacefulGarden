import * as React from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Animated,
} from "react-native";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";

// componenet handle floating button on MoodJournalScreen
export default function FloatingButton(props) {
  const [animation, setAnimation] = React.useState(new Animated.Value(0));
  React.useEffect(() => {
    props.navigation.addListener("focus", () => {
      setAnimation(new Animated.Value(0));
    });
  });

  // toggle animation state
  const toggleMenu = () => {
    const toValue = animation.open ? 0 : 1;

    Animated.spring(animation, {
      toValue,
      friction: 5,
      useNativeDriver: false,
    }).start();
    animation.open = !animation.open;
  };

  // set animation parameters
  const moodStyle = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -140],
        }),
      },
    ],
  };

  // set animation parameters
  const journalStyle = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -80],
        }),
      },
    ],
  };

  // set animation parameters
  const rotation = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "45deg"],
        }),
      },
    ],
  };

  // set animation parameters
  const opacity = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1],
  });

  // render view
  return (
    <View style={[styles.container, props.style]}>
      <TouchableWithoutFeedback
        onPress={() => {
          props.navigation.navigate("Diary", { screen: "CreateMood" });
        }}
      >
        <Animated.View
          style={[styles.button, styles.secondary, moodStyle, opacity]}
        >
          <FontAwesome5 name="laugh-beam" size={24} color="#F3B000" />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback
        onPress={() => {
          props.navigation.navigate("Diary", { screen: "CreateJournal" });
        }}
      >
        <Animated.View
          style={[styles.button, styles.secondary, journalStyle, opacity]}
        >
          <AntDesign name="book" size={24} color="#F3B000" />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback
        onPress={() => {
          toggleMenu();
        }}
      >
        <Animated.View style={[styles.button, styles.menu, rotation]}>
          <AntDesign name="plus" size={30} color="#FFF" />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    bottom: 80,
  },

  button: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    alignItems: "center",
    justifyContent: "center",
    shadowRadius: 10,
    shadowColor: "#F3B000",
    shadowOpacity: 0.3,
    shadowOffset: { height: 10 },
  },

  menu: {
    backgroundColor: "#F3B000",
  },

  secondary: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    backgroundColor: "#FFF",
  },
});
