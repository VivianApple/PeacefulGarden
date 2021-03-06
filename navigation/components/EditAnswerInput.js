import * as React from "react";
import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, TextInput } from "react-native";
import fbdata from "../../firebase.js";
import { decreaseAnswerCount } from "../components/CommonFunctions.js";
import commonStyles from "../../commonStyles.js";

// delete answer from firebase realtime database
// data path: qanswer/question/uniquekey/
// data path: qanswerbyuser/user/question/uniquekey/
// reduce answer count in user data collectino by 1
function deleteAnswer(question, answerID, username, userID) {
  const answerRef = fbdata
    .database()
    .ref("/qanswer/" + question.question + "/" + answerID + "/");
  const answerbyUserRef = fbdata
    .database()
    .ref(
      "/qanswerbyuser/" +
        username +
        "/" +
        question.question +
        "/" +
        answerID +
        "/"
    );

  answerRef.get().then((snapshot) => {
    if (snapshot.exists()) {
      answerRef.remove();
    }
  });

  answerbyUserRef.get().then((snapshot) => {
    if (snapshot.exists()) {
      answerbyUserRef.remove();
    }
  });

  decreaseAnswerCount(userID);
}

// update answer content in firebase realtime database
function updateAnswer(question, answerID, username, newAnswer) {
  fbdata
    .database()
    .ref("/qanswer/" + question.question + "/" + answerID + "/")
    .update({ answer: newAnswer });
  fbdata
    .database()
    .ref(
      "/qanswerbyuser/" +
        username +
        "/" +
        question.question +
        "/" +
        answerID +
        "/"
    )
    .update({ answer: newAnswer });
}

// EditAnswerInput componenet
// show each answer
// allow edit and delete of answer
export default function EditAnswerInput(props) {
  // edited answer, initialised as the original answer
  const [editAnswer, setEditAnswer] = useState(props.item.answer);
  // modal visibility status
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  // text input focus status
  const [focused, setFocused] = useState(false);

  // return text input border colour based on variable focused
  const getBorderColor = () => {
    if (focused) {
      return "#00BCD4";
    }
    return "white";
  };

  // render view
  return (
    <View
      style={{
        width: "100%",
        marginTop: 20,
        padding: 5,
        paddingLeft: 15,
        alignItems: "left",
        backgroundColor: "#fff",
        borderRadius: 20,
        shadowColor: "grey",
        shadowOffset: {
          width: 2,
          height: 2,
        },
        shadowOpacity: 0.36,
        shadowRadius: 5,
        elevation: 11,
      }}
    >
      <Text
        style={{
          marginTop: 10,
        }}
      >
        Posted on: {props.item.creationDate}
      </Text>
      <Text style={{ marginTop: 10 }}>{props.item.answer}</Text>
      <View
        style={{
          flexDirection: "row",
          alignItem: "center",
          justifyContent: "center",
          marginVertical: 20,
        }}
      >
        <TouchableOpacity
          style={[
            commonStyles.modalButton,
            {
              backgroundColor: "#F3B000",
            },
          ]}
        >
          <Text
            style={commonStyles.modalButtonText}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            Edit
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            commonStyles.modalButton,
            {
              backgroundColor: "#F02A4B",
            },
          ]}
          onPress={() => {
            setDeleteModalVisible(true);
          }}
        >
          <Text style={commonStyles.modalButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => {
          setDeleteModalVisible(!deleteModalVisible);
        }}
      >
        <View style={commonStyles.modalFirstView}>
          <View style={commonStyles.modalSecondView}>
            <Text style={commonStyles.deleteWarningTitle}>Confirm delete?</Text>
            <Text style={commonStyles.deleteWarningText}>
              * Once delete, it is unrecoverable!
            </Text>
            <View style={{ flexDirection: "row", marginVertical: 10 }}>
              <TouchableOpacity
                style={[
                  commonStyles.modalButton,
                  { backgroundColor: "#00BCD4" },
                ]}
                onPress={() => {
                  setDeleteModalVisible(!deleteModalVisible);
                }}
              >
                <Text style={commonStyles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  commonStyles.modalButton,
                  { backgroundColor: "#F02A4B" },
                ]}
                onPress={() => {
                  deleteAnswer(
                    props.item.question,
                    props.item.id,
                    props.item.username,
                    props.userID
                  );
                }}
              >
                <Text style={commonStyles.modalButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={commonStyles.modalFirstView}>
          <View
            style={[
              commonStyles.modalSecondView,
              { backgroundColor: "rgba(0,188,212,0.2)" },
            ]}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Edit answer
            </Text>

            <View style={commonStyles.modalInputBoxWrapper}>
              <TextInput
                multiline={true}
                editable={true}
                autofocus={true}
                onChangeText={(text) => {
                  setEditAnswer(text);
                }}
                value={editAnswer}
                style={[
                  commonStyles.inputBox,
                  { borderColor: getBorderColor() },
                ]}
                onFocus={() => {
                  setFocused(true);
                }}
              />
            </View>
            <View style={{ flexDirection: "row", marginTop: 40 }}>
              <TouchableOpacity
                style={[
                  commonStyles.modalButton,
                  { backgroundColor: "#00BCD4" },
                ]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={commonStyles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  commonStyles.modalButton,
                  { backgroundColor: "#F3B000" },
                ]}
                onPress={() => {
                  updateAnswer(
                    props.item.question,
                    props.item.id,
                    props.item.username,
                    editAnswer
                  );
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={commonStyles.modalButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
