import React, {useEffect, useState, useRef} from 'react';
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Button from './src/components/Button';


export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async() => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, [])

  const takePicture = async () => {
    if(cameraRef){
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log('data is: ', data);
        setImage(data.uri);
      } catch (error) {
        console.log("Error in takePicture: ", error);
      }
    }
  }

  const saveImage = async () => {
    if(image){
      try {
        await MediaLibrary.createAssetAsync(image);
        alert('Picture save! 🎉');
        setImage(null);
      } catch (error) {
        console.log('Error in saveImage: ', error);
      }
    }
  }

  if(hasCameraPermission===false){
    return <Text>No access to camera</Text>
  }
  return (
    <SafeAreaView style={styles.container}>
      {!image ? <Camera
        style={styles.camera}
        type={type}
        flashMode={flash}
        ref={cameraRef}
      >
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 30,
        }}>
          <Button icon={'retweet'} onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)} />
          <Button 
            icon={'flash'}
            color={flash === Camera.Constants.FlashMode.off ? '#f1f1f1' : 'yellow'} 
            onPress={() => setFlash(flash === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off)} 
          />
        </View>
      </Camera> : 
      <Image source={{uri: image}} style={styles.camera} />}
      <View>
        {image ?
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 50,
          }}
        >
          <Button title={'re-take'} icon={'retweet'} onPress={() => setImage(null)} />
          <Button title={'save'} icon={'check'} onPress={saveImage} />
        </View> 
        : <Button title={'Take a picture'} icon={'camera'} onPress={takePicture} />}
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    paddingBottom: 30,
  },
  camera: {
    flex: 1,
    borderRadius: 20,
    marginBottom: 30,
  }
});
