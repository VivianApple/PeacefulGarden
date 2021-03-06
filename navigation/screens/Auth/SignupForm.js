import React, { useState, useEffect } from "react";
import {
  Button,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  View,
  Platform,
  FlatList,
  ScrollView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";
import Feather from "react-native-vector-icons/Feather";
import { Avatar } from "react-native-elements";
import Avatar_Default from "../../../assets/Avatar_Default.png";
import fbdata from "../../../firebase.js";
import commonStyles, {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
} from "../../../commonStyles.js";
import Icon from "react-native-vector-icons";
// import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";

// sign up form screen
export default function SignupForm({ navigation }) {
  // hold user input of username, email, password adn selected profile photo
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);

  // hold the profile image list read from firebase
  const [profileImageList, setProfileImageList] = useState([]);
  // hold the selected profile photo
  const [selectedID, setSelectedID] = useState(null);
  // error status
  const [check_textInputChange, setCheck_textInputChange] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isValidUser, setIsValidUser] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);
  // user data
  const [newdata, setNewdata] = useState({
    username: "",
    password: "",
    email: "",
    img: "",
  });

  // read profile images from firebase
  useEffect(() => {
    const profileImageListRef = fbdata.database().ref("/profileImage/");
    const OnLoadingListener = profileImageListRef.once("value", (snapshot) => {
      setProfileImageList([]);
      snapshot.forEach((childSnapshot) => {
        setProfileImageList((profileImageList) => [
          ...profileImageList,
          childSnapshot.val(),
        ]);
      });
    });
    return () => {
      profileImageListRef.off();
    };
  }, []);

  // handle sign up function
  // if any input is empty, show alert
  // otherwise, proceeds to the next step in sign up
  const handleSignUp = () => {
    if (
      username === null ||
      password === null ||
      email === null ||
      isValidConfirmPassword === false
    ) {
      alert("Please fill all fields to proceed.");
    } else {
      newdata.username = username;
      newdata.password = password;
      newdata.email = email;
      newdata.img = selectedProfile;
      setNewdata({ ...newdata });
      console.log(newdata);
      navigation.navigate("AccountInterest", { newdata: newdata });
    }
  };

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setUsername(val);
      setCheck_textInputChange(true);
      setIsValidUser(true);
    } else {
      setUsername(val);
      setCheck_textInputChange(false);
      setIsValidUser(false);
    }
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setPassword(val);
      setIsValidPassword(true);
    } else {
      setPassword(val);
      setIsValidPassword(false);
    }
  };

  const handleConfirmPassword = (val) => {
    if (val === password) {
      setIsValidConfirmPassword(true);
    } else {
      setIsValidConfirmPassword(false);
    }
  };

  const updateSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  // username must be at least 4 characters
  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setIsValidUser(true);
    } else {
      setIsValidUser(false);
    }
  };

  // render profile image list in a horizontal flat list
  const renderProfile = ({ item }) => {
    const avatarBorderColor = item.id === selectedID ? "blue" : "white";
    return (
      <TouchableOpacity
        style={{
          marginHorizontal: 5,
        }}
        onPress={() => {
          setSelectedID(item.id);
          setSelectedProfile(item.imageURL);
        }}
      >
        <View
          style={{
            borderRadius: 50,
            borderWidth: 5,
            borderColor: avatarBorderColor,
          }}
        >
          <Avatar
            size="large"
            rounded
            source={{
              uri: item.imageURL,
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  // render view
  return (
    <SafeAreaView style={styles.container}>
      {/* header section */}
      <View
        style={{
          width: "100%",
          height: "25%",
          backgroundColor: "#00BCD4",
          justifyContent: "center",
          paddingLeft: 20,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 26,
            fontWeight: "bold",
          }}
        >
          Welcome
        </Text>
      </View>

      {/* sign up form */}
      <View style={commonStyles.answerContainer}>
        <View style={[styles.action, { marginTop: 30 }]}>
          <Input
            inputContainerStyle={{
              marginHorizontal: 20,
            }}
            style={styles.input}
            leftIcon={{
              type: "font-awesome",
              name: "user",
              size: 24,
              color: "#00BCD4",
            }}
            placeholder="Username"
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          />
          <View
            style={{
              width: "10%",
              justifyContent: "center",
              marginBottom: "7%",
            }}
          >
            {check_textInputChange ? (
              <Animatable.View
                animation="bounceIn"
                style={{ marginRight: 5, marginTop: 3 }}
              >
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
        </View>
        {isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Username must be at least 4 characters long.
            </Text>
          </Animatable.View>
        )}

        <View style={styles.action}>
          <Input
            inputContainerStyle={{
              marginHorizontal: 20,
            }}
            style={styles.input}
            leftIcon={{
              type: "ionicons",
              name: "mail",
              size: 24,
              color: "#00BCD4",
            }}
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={(text) => {
              setEmail(text);
            }}
            value={email}
          />
          <View
            style={{
              width: "10%",
            }}
          />
        </View>

        <View style={styles.action}>
          <Input
            inputContainerStyle={{
              marginHorizontal: 20,
            }}
            style={styles.input}
            leftIcon={{
              type: "font-awesome",
              name: "lock",
              size: 24,
              color: "#00BCD4",
            }}
            placeholder="Password"
            secureTextEntry={secureTextEntry ? true : false}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)}
          />
          <View
            style={{
              width: "10%",
              justifyContent: "center",
              marginBottom: "7%",
            }}
          >
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 8 characters long.
            </Text>
          </Animatable.View>
        )}

        <View style={styles.action}>
          <Input
            inputContainerStyle={{
              marginHorizontal: 20,
            }}
            style={styles.input}
            leftIcon={{
              type: "font-awesome",
              name: "lock",
              size: 24,
              color: "#00BCD4",
            }}
            placeholder="Confirm Password"
            secureTextEntry={secureTextEntry ? true : false}
            autoCapitalize="none"
            onChangeText={(val) => handleConfirmPassword(val)}
          />
          <View
            style={{
              width: "10%",
              justifyContent: "center",
              marginBottom: "7%",
            }}
          >
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {isValidConfirmPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password does not match.</Text>
          </Animatable.View>
        )}

        <Text style={styles.text}>Profile Photo</Text>
        <View style={{ height: 100 }}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 20, height: 100, marginHorizontal: 15 }}
            data={profileImageList}
            renderItem={renderProfile}
            keyExtractor={(item) => item.id.toString()}
          ></FlatList>
        </View>

        {/* proceed to next section */}
        <TouchableOpacity
          style={styles.button_submit}
          onPress={() => {
            handleSignUp();
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// style sheet
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 20,
    fontWeight: "normal",
    color: "#000000",
    alignSelf: "flex-start",
    marginTop: 30,
    marginLeft: 25,
    marginBottom: 10,
  },
  action: {
    flexDirection: "row",
    // marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    marginHorizontal: 15,
    // borderWidth: 2,
    // borderColor: "red",
  },

  input: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
    fontSize: 18,
  },

  button_submit: {
    height: 50,
    width: 130,
    borderRadius: 14,
    backgroundColor: "#17CAF1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    marginTop: 40,
  },

  errorMsg: {
    color: "#FF0000",
    fontSize: 12,
  },
});
