import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, Button, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CheckBox } from "react-native-elements";
import SegmentedControlTab from "react-native-segmented-control-tab";
import fbdata from "../../../firebase";
import Interest from "../../../assets/Interest";
import { Avatar} from "react-native-elements";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";

function AccountInfo() {
  const [user, setUser] = useState([]);
  const [uid, setUid] = useState("");
  const [image, setImage] = useState("");
  const [username, setUserName] = useState("");
  const [interest, setInterest] = useState(Interest);
  const [customSelectedIndex, setCustomSelectedIndex] = useState(0);
  const [verify, setVerify] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    setShowLoading(true);
    __isTheUserAuthenticated();
    // console.log(fbdata.auth().currentUser);
    setVerify(fbdata.auth().currentUser.emailVerified);
  }, []); 

  function __isTheUserAuthenticated() {
    const userId = fbdata.auth().currentUser.uid;
    setImage(fbdata.auth().currentUser.photoURL);
    setUserName(fbdata.auth().currentUser.displayName);
    setUid(userId);
    if (userId !== null) {
      fbdata
        .database()
        .ref("users/" + userId)
        .on("value", (querySnapShot) => {
          let userinfo = querySnapShot.val() ? querySnapShot.val() : {};
          setUser(userinfo);
          setInterest(userinfo["interest"]);
        });
    }
    setShowLoading(false);
  }
  function handleSignOut() {
    fbdata
      .auth()
      .signOut()
      .then(() => {
        console.log("User signed out!");
      });
  }

  function handleUpdate() {
    fbdata
      .database()
      .ref("users/" + uid)
      .update(
        {
          interest: interest,
        },
        function (error) {
          if (error) {
            // The write failed...
            alert("Error");
          } else {
            // Data saved successfully!
            alert("Update successful !!!");
          }
        }
      );
  }

  function handleSendVerifyEmail() {
    fbdata.auth().currentUser.sendEmailVerification();
  }

  const updateCustomSegment = (index) => {
    setCustomSelectedIndex(index);
  };

  const onChangeBox = (itemSelected) => {
    const newData = interest.map((item) => {
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
    setInterest(newData);
  };
  const renderCheckBox = interest.map((item, index) => {
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



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topInfo}>
      {showLoading && (
          <View style={styles.activity}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        <View style={styles.userInfo}>
          <Avatar
            containerStyle={{borderWidth: 3, borderColor:"white"}}
            size="large"
            rounded
            source={{
              uri: `${image}`,
            }}
          />
          <View style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems:"flex-start", marginHorizontal: 10}}>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", marginVertical: 5 }}
            >
              {username}
            </Text>
            {verify ? (
              <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems:"center"}}>
                <AntDesign name="checkcircle" color="green" size={12} />
                <Text style={{color: "green", fontSize: 12}}> Verified Email</Text>
              </View>
            ) : (
              <View style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems:"flex-start"}}>
              <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems:"center"}}>
                <FontAwesome name="warning" color="red" size={12} />
                <Text style={{color: "red", fontSize: 12}}> Please verify your email</Text>
              </View>
              <TouchableOpacity style={{marginVertical: 5}} onPress={() => handleSendVerifyEmail()}>
                <Text>Send Again</Text>
              </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        <TouchableOpacity
          style={stylesSheet.button_submit}
          onPress={() => {
            handleSignOut();
          }}
        >
          <Button title="Logout" color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={stylesSheet.MainContainer}>
        <View style={stylesSheet.MainContainer}>
          <SegmentedControlTab
            borderRadius={10}
            badges={[40, 36]}
            values={["Post", "Quest", "Setting", "Interest"]}
            selectedIndex={customSelectedIndex}
            onTabPress={updateCustomSegment}
            tabsContainerStyle={{
              height: 50,
            }}
            tabStyle={{
              backgroundColor: "#F0F0F0",
              borderWidth: 0,
              borderColor: "transparent",
              borderRadius: 10,
              marginHorizontal: 4,
            }}
            activeTabStyle={{ backgroundColor: "#1067CC" }}
            tabTextStyle={{
              color: "#000000",
              fontWeight: "bold",
              fontSize: 16,
            }}
            activeTabTextStyle={{ color: "#fff", fontSize: 16 }}
          />
          <View style={stylesSheet.contentStyle}>
            {customSelectedIndex === 0 && (
              <Text style={stylesSheet.tabTextStyle}>
                {" "}
                Selected Tab = Put your posts here{" "}
              </Text>
            )}
            {customSelectedIndex === 1 && (
              <Text style={stylesSheet.tabTextStyle}>
                {" "}
                Selected Tab = Put your questions here{" "}
              </Text>
            )}
            {customSelectedIndex === 2 && (
              <Text style={stylesSheet.tabTextStyle}>
                {" "}
                Selected Tab = Put your setting here{" "}
              </Text>
            )}
            {customSelectedIndex === 3 && (
              <View>
                <View style={stylesSheet.wrapperText}>
                  <Text style={stylesSheet.headerText}>Interest</Text>
                  <Text style={stylesSheet.subText}>Multi-selection</Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {renderCheckBox}
                </View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    handleUpdate();
                  }}
                >
                  <Button title="Update" color="#fff" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default AccountInfo;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingVertical: 0,
    paddingHorizontal: 0,
    backgroundColor: "#fff",
  },
  topInfo: {
    backgroundColor: "#f2f2f2",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  userInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  button: {
    height: 50,
    width: 130,
    borderRadius: 14,
    backgroundColor: "#1067CC",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    color: "white",
    marginHorizontal: 20,
  },
  profileimage: {
    width: "100%",
    height: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#60C8ED",
  },
  tabview: {
    backgroundColor: "#000000",
  },
});

const stylesSheet = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    width: "100%",
  },
  contentStyle: {
    marginTop: 10,
    backgroundColor: "#f2f2f2",
    width: "100%",
    height: "90%",
  },

  titleText: {
    fontSize: 22,
    color: "#000",
    textAlign: "center",
    padding: 8,
  },

  tabTextStyle: {
    padding: 20,
    color: "#000",
    fontSize: 18,
  },
  wrapperText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    height: 50,
  },
  headerText: {
    fontSize: 20,
    color: "#000",
    textAlign: "left",
    fontWeight: "bold",
    padding: 8,
  },
  subText: {
    fontSize: 15,
    color: "#000",
    textAlign: "left",
    fontWeight: "normal",
    padding: 8,
  },
  button_submit: {
    height: 40,
    width: 100,
    borderRadius: 14,
    backgroundColor: "#1067CC",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    alignSelf: "center",
  },

  divider: {
    alignSelf: "stretch",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginTop: 20,
  },
});
