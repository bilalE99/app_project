import React , {Component} from 'react';
import {Button , ToastAndroid, View} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Logout extends Component{
  constructor(props){
    super(props);

    this.state = {
      email:"",
      password:""
  }


  }
  logout = async () => {
    //Validation Here
  let value =  await AsyncStorage.getItem('@session_token');
  await AsyncStorage.removeItem('@session_token');
  return fetch("http://10.0.2.2:3333/api/1.0.0/user/logout" , {
      method: 'post',
      headers: {
        'X-Authorization': value
      },
    })
    .then((response) => {
      if(response.status === 200){
        ToastAndroid.show("Successful logout!",ToastAndroid.SHORT,
        ToastAndroid.CENTER);
        this.props.navigation.navigate("login");
      }
       else if (response.status ===401){
        ToastAndroid.show("Need to be logged in first!",ToastAndroid.SHORT);
        this.props.navigation.navigate("login");
      }
      else{
        throw 'Something went wrong';
      }

    })
/*
    .then(async (responseJson) => {
      console.log("Logged out!" , responseJson);
      ToastAndroid.show("Successful logout!",ToastAndroid.SHORT);
        this.props.navigation.navigate("login");
      
    })*/
    .catch((error) => {
      console.log(error);
      ToastAndroid.show(error, ToastAndroid.SHORT);
    })
  }
  render(){
    const navigation = this.props.navigation;

    return(
        <View>
      
        </View>
    );
  }
}

export default Logout;
