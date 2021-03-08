import React, { Component } from 'react';
import { Image, ToastAndroid, Alert, View ,FlatList,Text, StyleSheet} from 'react-native';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RNCamera } from 'react-native-camera';
//import styles from '../styleSheets/customStyles';


class DisplayPhoto extends Component {
    constructor(props) {
        super(props);


        this.state = {
            isLoading: true,
            photoInfo: undefined || null || '',
            photoData: [],
            photo_url:'',

        };

    }
    getPhoto = () => {
        const rev_id = this.props.route.params.review_id;
        const loc_id = this.props.route.params.location_id;

        return fetch("http://10.0.2.2:3333/api/1.0.0/location/" + loc_id + "/review/" + rev_id + "/photo", {
            method: 'get',
            headers: {
            },
        })
            .then((response) => {
                if (response.status === 200) {

                }
                else if (response.status === 404) {
                    console.log(response);
                }
                else {
                    throw 'Something went wrong';
                }

            })
            .then((responseJson) => {
               // this.setState({
                  //  photoData: responseJson,
                  //})
                  //console.log(responseJson);
                //this.props.navigation.navigate("DisplayPhoto",{photo_url: this.state.photoInfo})
            })
            .catch((error) => {
                console.log(error);
                ToastAndroid.show("error", ToastAndroid.SHORT);
            })
    }

    render() {
        
        const rev_id = this.props.route.params.review_id;
        const loc_id = this.props.route.params.location_id;
        return (

            <View style={styles.container}>
                
                <Image style={{ height: 600 ,width: 400, resizeMode: "center" }}
                source={ {uri : "http://10.0.2.2:3333/api/1.0.0/location/" + loc_id + "/review/" + rev_id + "/photo"+'?' + new Date()}}
                
                />

            </View>
        );

    }
}

const styles = StyleSheet.create({
    contentContainer: {
      paddingVertical: 20
    },
    container: {
      flex: 1,
      backgroundColor: '#40e0d0',
      padding: 10,
    }
  });

export default DisplayPhoto;
