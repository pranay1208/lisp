import { StyleSheet, Button, View, TextInput, Alert } from "react-native";
import * as FileSystem from "expo-file-system";
import * as React from "react";
import { Audio } from "expo-av";
import axios from "axios";
import { sleep } from "./utils";
import { IP_ADDRESS } from "./ip";

let recording;
let sound;

export default function App() {
  // const [sound, setSound] = React.useState();
  // const [recording, setRecording] = React.useState();
  // const [uris, setUris] = React.useState();
  const [loc, setLoc] = React.useState("L1");

  const showDoneAlert = (num) => {
    Alert.alert("Recording done", `Captured ${num} recordings`, [
      {
        text: "OK",
        style: "cancel",
      },
    ]);
  };

  const runRecordLoop = async (type) => {
    await startRecording();
    const playSoundPromise = playSound();
    await sleep(1000);
    await playSoundPromise;
    await stopRecording(type);
  };

  const postData = async (uris, type) => {
    const target = IP_ADDRESS;
    const formData = new FormData();
    const fileContent = await FileSystem.readAsStringAsync(uris, {
      encoding: FileSystem.EncodingType.Base64,
    });
    formData.append("file", fileContent);
    formData.append("type", type);
    formData.append("location", loc.trim());
    try {
      await axios.post(target, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  async function startRecording() {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording: recordingFromFn } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      recording = recordingFromFn;
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording(type) {
    await sound.stopAsync();
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    await postData(uri, type);
    recording = undefined;
    sound = undefined;
  }

  async function playSound() {
    const { sound: soundFromFn } = await Audio.Sound.createAsync(
      require("./app/assets/emit_100_mp3.mp3")
    );
    sound = soundFromFn;
    // setPlay(true);
    await sound.playAsync();
  }

  return (
    <View style={styles.container}>
      <View style={styles.elements}>
        <Button
          title='Record Testing Data (x50)'
          disabled={recording !== undefined}
          onPress={async () => {
            let i = 1;
            try {
              for (i; i <= 50; i++) {
                await runRecordLoop("testing");
              }
            } catch (err) {
              console.log("ERROR", err);
            } finally {
              showDoneAlert(i);
            }
          }}
        />
      </View>
      <View style={styles.elements}>
        <Button
          title='Record Check Data (x1)'
          disabled={recording !== undefined}
          onPress={async () => {
            await runRecordLoop("check");
          }}
        />
      </View>
      <View style={styles.input}>
        <TextInput value={loc} onChangeText={setLoc} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 10,
  },
  elements: {
    padding: 10,
  },
  input: {
    padding: 10,
    margin: 12,
    borderWidth: 1,
    height: 40,
  },
});
