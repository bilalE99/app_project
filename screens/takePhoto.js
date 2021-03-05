import React, { Component } from 'react';
import { Button, ToastAndroid, TouchableWithoutFeedbackBase } from 'react-native';
import { ScrollView, TextInput, View } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RNCamera } from 'react-native-camera';
import styles from '../styleSheets/customStyles';


class TakePhoto extends Component {


    takePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true }
            const data = await this.camera.takePictureAsync(options);

            console.log(data.url);
        }
    }

    render() {
        return (

            <View style={{flex: 1} }>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    captureAudio={false}
                />
                <Button
                    title="Take Photo"
                    onPress={() => this.takePicture()}
                />
            </View>
        );

    }
}


export default TakePhoto;
