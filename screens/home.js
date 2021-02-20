import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Title } from 'native-base';


class HomeScreen extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const navigation = this.props.navigation;

    return(
        <View style={styles.container}>
          
          <Button
          title="Account Mangement"
          onPress={() => navigation.navigate("Account Management")}
          />
          <Button
          title="Settings"
          onPress={() => navigation.navigate("Login")}
          />
          <Button
          title="Reviews"
          onPress={() => navigation.navigate("Page3")}
          />
          <Button
          title="test"
          onPress={() => navigation.navigate("DisplayScreen")}
          />
         </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: 'beige'
  },
  text:{
    color: 'white',
    fontSize: 25
  }
});


export default HomeScreen;
