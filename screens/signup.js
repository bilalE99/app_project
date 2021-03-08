import React, { Component } from 'react';
import { Button, ToastAndroid, View, StyleSheet } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
//import styles from '../styleSheets/customStyles';

class SignupScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: ""
    }


  }
  signup = () => {
    return fetch("http://10.0.2.2:3333/api/1.0.0/user", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json()
        }
        else if (response.status === 400) {
          throw 'Failed Validation';
        }
        else {
          throw 'Something went wrong';
        }

      })
      .then(async (responseJson) => {
        console.log("User created with ID", responseJson);
        this.props.navigation.navigate("Login");
        ToastAndroid.show("User created", ToastAndroid.SHORT);

      })
      .catch((error) => {
        console.log(error);
        alert("Invalid data entry, try again!");
        //ToastAndroid.show("error", ToastAndroid.SHORT);
      })
  }
  render() {
    return (
      <View style={styles.container} >
        <ScrollView>
          <View >
            <TextInput
              placeholder="Enter your first name..."
              onChangeText={(first_name) => this.setState({ first_name })}
              value={this.state.first_name}
              style={styles.inputContainer}
            />
            <TextInput
              placeholder="Enter your last name"
              onChangeText={(last_name) => this.setState({ last_name })}
              value={this.state.last_name}
              style={styles.inputContainer}
            />
            <TextInput
              placeholder="Enter your email.."
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
              style={styles.inputContainer}
            />
            <TextInput
              placeholder="Enter your password"
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
              style={styles.inputContainer}
              secureTextEntry={true}
            />
            <View style={styles.buttonContainer} >
              <Button
                title="Create account"
                onPress={() => this.signup()}
              />
            </View>

          </View>

        </ScrollView>
      </View>

    );

  }
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6495ed',

  },
  buttonContainer: {
    height: 45,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    margin: 10,
  },
  inputContainer: {
    marginTop: 10,
    padding: 5,
    borderWidth: 2,
    margin: 10
  }
});


export default SignupScreen;
