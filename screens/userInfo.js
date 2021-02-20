import React, { Component } from 'react';
import { View, Text, Button, Alert, TextInput, ToastAndroid, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class GetUser extends Component{
  constructor(props){
    super(props);


    this.state = {
        userData: [],
        isLoading:true,
    };

}
componentDidMount(){
  this.getUserInfo();
}

checkLoggedIn = async () => {
  const value = await AsyncStorage.getItem('@session_token');
  if(value !== null){
    this.getUserInfo();
  }
  else{
    ToastAndroid.show("Need to be logged in first!",ToastAndroid.SHORT,ToastAndroid.CENTER);
     this.props.navigation.navigate("Login");
  }
}
  getUserInfo = async () => {
    const value = await AsyncStorage.getItem("@session_token");
    const id = await AsyncStorage.getItem("@user_id");
    console.log(id);

    return fetch("http://10.0.2.2:3333/api/1.0.0/user/" +id, {
        method: 'get',
        headers: {
          'X-Authorization': value
        },
      })
      .then((response) => {
        if(response.status === 200){
          return response.json();
        }
         else if (response.status ===401){
            throw 'Unauthorised, Log in first!';
        }
        else{
          throw 'Something went wrong';
        }
      })
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
            isLoading: false,
            userData: responseJson
        })
        
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT,ToastAndroid.CENTER);
      })


  }


/*
 <Text>{ this.state.userData}</Text>  const data = {this:userData};var x = data1.user_id[0]; <Text>{data1} </Text>
              <Text> {a}</Text>
              var obj = JSON.parse(val2);
        var a = obj.getItem("user_id");
        alert(a);
        const data1 = this.state.userData;
    
      return (
        
           <View>
            <Text>User details: </Text> 
           <Text>{data1}</Text> 
            <Button
              title="Show!"
              onPress={() => this.getUserInfo()}
              />
             
           </View> var data1 = Object.entries(data);
 var result = Object.keys(data).map((key) => [(key), data[key]]);

console.log(result);
    );<View>
        <FlatList
          data={r}
          renderItem={({item}) => (
              <View>
                <TouchableOpacity>
                  <Text>{item}</Text>
                </TouchableOpacity>
                  
                  
              </View>
          )}
          keyExtractor={(item,index) => item.user_id}
        />
      </View>
*/
  render(){
    //convert user data into list to then pass into flatlist
  data= this.state.userData;
  let r=new Map(Object.entries(data));
  console.log(r);
   return (
    <View>
      
      <TouchableOpacity onPress={() => console.log("Delete")}>
      <Text>{r.get("user_id")}</Text>
      
      </TouchableOpacity>
      <TouchableOpacity>
      <Text>{r.get("email")}</Text>
      </TouchableOpacity>
      <TouchableOpacity>
      <Text>{r.get("first_name")}</Text>
      </TouchableOpacity>
      <TouchableOpacity>
      <Text>{r.get("last_name")}</Text>
      </TouchableOpacity>
    </View>
);
    }
}


export default GetUser;
