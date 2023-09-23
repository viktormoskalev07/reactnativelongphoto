
import React, { PureComponent, useRef, useState } from "react";
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, Button } from "react-native";
import { RNCamera } from 'react-native-camera';

export const OldCamera = ()=> {
  const takePicture = async () => {
    console.log(234);
    if (ref.current) {
      const options = { quality: 0.5, base64: true };
      const data = await ref.current.takePictureAsync(options);
      console.log(data.uri);
    }
  };
  const [show , setShow]=useState(false);

  const ref = useRef();
    return (
      <View style={styles.container}>
        {show&&<RNCamera
          ref={ref}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: "Permission to use camera",
            message: "We need your permission to use your camera",
            buttonPositive: "Ok",
            buttonNegative: "Cancel"
          }}
          androidRecordAudioPermissionOptions={{
            title: "Permission to use audio recording",
            message: "We need your permission to use your audio",
            buttonPositive: "Ok",
            buttonNegative: "Cancel"
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />}
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={takePicture} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
          <Button title={"rerwer"} onPress={takePicture}/>
          <Button title={"show"} onPress={()=>{setShow(p=>!p)}}/>

        </View>
      </View>
    );



}

const styles = StyleSheet.create({
  container: {

  },
  preview: {
      position:"absolute",
    height:20,
    width:20

  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

