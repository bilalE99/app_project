import React, { Component } from 'react';
import { Image,ToastAndroid, Alert, View } from 'react-native';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RNCamera } from 'react-native-camera';
import styles from '../styleSheets/customStyles';


class DisplayPhoto extends Component {
    componentDidMount(){
        this.getPhoto();
    }
    getPhoto () {
        const photo_url = this.props.route.params.photo_url;
       
        const x = new Map(Object.entries(photo_url));
        var y = x.get("url");
        return y;
    }

    render() {
        
        return (

            <View style={{ flex: 1, width: '100%' }}>
                     <Image source={{uri: this.getPhoto()}} />
            </View>
        );

    }
}


export default DisplayPhoto;
