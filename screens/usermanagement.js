import React, { Component } from 'react';
import { Text, View, Button, ToastAndroid, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header } from 'react-native/Libraries/NewAppScreen';

class UserManagement extends Component{
  constructor(props){
    super(props);

    this.state = {
      email:"",
      password:""
  }
}


  checkLoggedIn = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    if(value !== null){
      this.setState({token:value});
      ToastAndroid.show("Already logged in!",ToastAndroid.SHORT,ToastAndroid.CENTER);
    }
    else{
      this.props.navigation.navigate("Login");
    }
  }

  logout = async () => {
    //Validation Here
    let token =  await AsyncStorage.getItem('@session_token');
    await AsyncStorage.removeItem('@session_token');
    return fetch("http://10.0.2.2:3333/api/1.0.0/user/logout" , {
        method: 'post',
        headers: {
          'X-Authorization': token
        },
      })
      .then((response) => {
        if(response.status === 200){
          ToastAndroid.show("Successful logout!",ToastAndroid.SHORT,
          ToastAndroid.CENTER);
          this.props.navigation.navigate("Login");
        }
         else if (response.status ===401){
          ToastAndroid.show("Need to be logged in first!",ToastAndroid.SHORT,ToastAndroid.CENTER);
          this.props.navigation.navigate("Login");
        }
        else{
          throw 'Something went wrong';
        }
      })
      .then(async (responseJson) => {
        console.log("Logged out!" , responseJson);
        AsyncStorage.removeItem('@session_token');
        AsyncStorage.removeItem('@user_id');
        this.props.navigation.navigate("Login");
        
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT,ToastAndroid.CENTER);
      })
  }

  render(){
    const navigation = this.props.navigation;

    return(
        <View>
        
          <Button
          title="Sign Up"
          onPress={() => navigation.navigate("Sign Up")}
          />
          <Button
          title="Login"
          onPress={() => this.checkLoggedIn()}
          />
          <Button
          title="Logout"
          onPress={() =>  this.logout()}
          />
          <Button
          title="Update"
          onPress={() => navigation.navigate("UpdateUser")}/>
           <Button
          title="Show user details"
          onPress={() => navigation.navigate("UserInfo")}
          />
            <Button
          title="Show loc details"
          onPress={() => navigation.navigate("LocationInfo")}
          />
            <Button
          title="Search locations"
          onPress={() => navigation.navigate("SearchLocation")}
          />
         
        </View>
    );
  }
}

export default UserManagement;
