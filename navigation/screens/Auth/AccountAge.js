import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Button,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import RNPickerSelect from "react-native-picker-select";
import { CheckBox } from "react-native-elements";
import { Avatar } from "react-native-elements";
import fbdata from "../../../firebase";
import Interest from "./../../../assets/Interest";
import AgeCategories from "./../../../assets/AgeCategories";

const placeholder = {
  label: "Select your age...",
  value: null,
  
  color: "#9EA0A4",
};

function AccountAge({ navigation, route }) {
  const { newdata } = route.params;
  const [checkboxes, setCheckboxes] = useState(Interest);
  const [age, setAge] = useState(null);
  const [data, setData] = useState({
    uid: "",
    username: "",
    img: "",
    answer1: "",
    answer2: "",
    age: "",
    interest: {},
  });

  // This function using for adding to database realtime
  const handleSignUp = (uuid) => {
    (data.uid = uuid), (data.username = newdata.username);
    data.img = newdata.img;
    data.answer1 = newdata.answer1;
    data.answer2 = newdata.answer2;
    data.age = age;
    data.interest = checkboxes;
    setData({ ...data });
  };

  const onChangeBox = (itemSelected, index) => {
    const newData = checkboxes.map((item) => {
      if (item.id === itemSelected.id) {
        return {
          ...item,
          check: !item.check,
        };
      }
      return {
        ...item,
        check: item.check,
      };
    });
    setCheckboxes(newData);
  };
  const renderCheckBox = checkboxes.map((item, index) => {
    return (
      <CheckBox
        checkedColor="green"
        checked={item.check}
        title={item.value}
        uncheckedIcon="circle-o"
        checkedIcon="dot-circle-o"
        onPress={() => onChangeBox(item, index)}
        key={index}
      />
    );
  });

  function addDataBase() {
    fbdata
      .database()
      .ref("users/" + data.uid)
      .set(
        {
          username: data.username,
          img: data.img,
          answer1: data.answer1,
          answer2: data.answer2,
          age: data.age,
          interest: data.interest,
        },
        function (error) {
          if (error) {
            alert("Error!!!");
          }
        }
      );
  }


  function signUp() {
    fbdata
      .auth()
      .createUserWithEmailAndPassword(newdata.email, newdata.password)
      .then(function (user) {
        console.log("User account created & signed in!");
        handleSignUp(user["user"]["uid"]);
        addDataBase();
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          alert("That email address is already in use!");
        }
        if (error.code === "auth/invalid-email") {
          alert("That email address is invalid!");
        }
        console.error(error);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
     <View style={styles.container}>
      <View style={styles.userInfo}>
        <Avatar
          size="large"
          rounded
          source={{
            uri: `${newdata.img}`,
          }}
        />
        <Text
          style={{ fontSize: 30, fontWeight: "bold", marginHorizontal: 10 }}
        >
          {newdata.username}
        </Text>
      </View>
      <View style={styles.questionForm}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Age</Text>
        <RNPickerSelect
          style={pickerSelectStyles}
          onValueChange={(value) => setAge(value)}
          placeholder={placeholder}
          items={AgeCategories}
        />
      </View>
      <View style={styles.questionForm}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Interest</Text>
        <View style={styles.checkBoxGroup}>{renderCheckBox}</View>
      </View>
      <TouchableOpacity
        style={styles.button_submit}
        onPress={() => {
          signUp();
      
        }}
      >
        <Button title="Next" color="#fff" />
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default AccountAge;

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
    backgroundColor: "#fff",
  },
  userInfo: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  questionForm: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    marginVertical: 20,
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
  },
  checkBoxGroup: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    marginVertical: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});