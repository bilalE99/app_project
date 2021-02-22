import React , {Component} from 'react';
import {Button , ToastAndroid, View} from 'react-native';
import {ScrollView, TextInput, TouchableHighlight, Text} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';


class Login extends Component{
  constructor(props){
    super(props);

    this.state = {
      email:"",
      password:""
  }


  }
  login = async () => {
    //Validation Here
    return fetch("http://10.0.2.2:3333/api/1.0.0/user/login" , {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then((response) => {
      if(response.status === 200){
        return response.json()
        
      }
       else if (response.status ===400){
        throw 'Incorrect email or password';
      }
      else{
        throw 'Something went wrong';
      }

    })

    .then(async (responseJson) => {
      console.log("Signed in!" , responseJson);
      await AsyncStorage.setItem('@session_token' , responseJson.token);
      await AsyncStorage.setItem('@user_id' , JSON.stringify(responseJson.id));
      await AsyncStorage.setItem('@user_info' , JSON.stringify(responseJson));
      //convert back to integer when pulling id out
      this.props.navigation.navigate("Page3");
      ToastAndroid.show("Logged in successfully!", ToastAndroid.SHORT,ToastAndroid.CENTER);

    })
    .catch((error) => {
      console.log(error);
      ToastAndroid.show("error", ToastAndroid.SHORT);
    })
  }
  render(){
    return(
      <View>
      <TextInput
      placeholder="Enter your email"
      onChangeText={(email) => this.setState ({email})}
      value={this.state.email}
      style={{padding:5, borderWidth:1, margin:10}}
      />
      <TextInput
      placeholder="Enter your password"
      onChangeText={(password) => this.setState ({password})}
      value={this.state.password}
      style={{padding:5, borderWidth:1, margin:10}}
      />
      <Button
      title="Login"
      onPress={() =>  this.login()}
      />
      </View>
    );
  }
}
 


export default Login;

/*

  <View style={styles.container}>
        <View style={styles.inputContainer}>

          <TextInput style={styles.inputs}
            placeholder="Enter your email"
            underlineColorAndroid='transparent'
            onChangeText={(email) => this.setState ({email})}
            value={this.state.email}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
            placeholder="Enter your password"
            underlineColorAndroid='transparent'
            onChangeText={(password) => this.setState ({password})}
            value={this.state.password}
          />
        </View>
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.login()}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer}>
            <Text>Register</Text>
        </TouchableHighlight>
      </View>
*/