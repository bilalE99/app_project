import React, { Component } from 'react';
import { ToastAndroid, Alert, View } from 'react-native';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RNCamera } from 'react-native-camera';
import styles from '../styleSheets/customStyles';


class TakePhotos extends Component {


    takePhoto = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true }
          
                const data = await this.camera.takePictureAsync(options);

                console.log('data uri:' + data.uri);
                this.addPhoto(data);
               // await AsyncStorage.setItem('@photo_uri' , data.uri);
          
        
        }
    }

    addPhoto = async (data) => {
        const rev_id = this.props.route.params.review_id;
        const loc_id = this.props.route.params.location_id;
        const value = await AsyncStorage.getItem('@session_token');

        return fetch("http://10.0.2.2:3333/api/1.0.0/location/" + loc_id + '/review/' + rev_id + '/photo', {
            method: 'post',
            headers: {
                'Content-Type': 'image/jpeg',
                'X-Authorization': value,
            },
            body:data
        })
            .then((response) => {
                if (response.status === 200) {
                    //return response.json();
                    
                }
                else if (response.status === 401) {
                    throw 'Unauthorised';
                }
                else {
                    throw 'Something went wrong';
                }
            })
            .then((responseJson) => {
                console.log("Photo added");
                this.props.navigation.navigate("UserInfo");
                ToastAndroid.show("Photo Added!", ToastAndroid.SHORT, ToastAndroid.CENTER);
            })
            .catch((error) => {
                console.log(error);
                ToastAndroid.show(error, ToastAndroid.SHORT, ToastAndroid.CENTER);
            })
    }

    render() {
        return (

            <View style={{ flex: 1, width: '100%' }}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={{ flex: 1, width: '100%' }}
                    captureAudio={false}
                />
                <Button
                    title="Take Photo"
                    onPress={() => this.takePhoto()}
                />
            </View>
        );

    }
}


export default TakePhotos;
