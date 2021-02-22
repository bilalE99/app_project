import React, { Component } from 'react';
import { View, Text, Button, Alert, TextInput, ToastAndroid, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class LocationInfo extends Component{
  constructor(props){
    super(props);


    this.state = {
        locationData: [],
        isLoading:true,
    };

}
componentDidMount(){
  this.getInfo();
}

getInfo = async () => {
  const value = await AsyncStorage.getItem("@session_token");
  const id = await AsyncStorage.getItem("@user_id");
  console.log(id);

  return fetch("http://10.0.2.2:3333/api/1.0.0/find", {
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
          throw 'Unauthorised';
      }
      else{
        throw 'Something went wrong';
      }
    })
    .then((responseJson) => {
      console.log(responseJson);
      this.setState({
          isLoading: false,
          locationData: responseJson
      })
      
    })
    .catch((error) => {
      console.log(error);
      ToastAndroid.show(error, ToastAndroid.SHORT,ToastAndroid.CENTER);
    })


}
render(){
  // data  = this.state.locationData;
  
   return (
    <View>
      <View>
        <FlatList
          data={this.state.locationData}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => this.props.navigation.navigate("LocationHandler", {location_id: item.location_id})}>
               <View style={{padding:20}}>
                  <Text>ID: {item.location_id}</Text>
                  <Text>Location Name: {item.location_name}</Text>
                  <Text>Ratings: {item.avg_overall_rating}</Text>
                  
              </View>
            </TouchableOpacity>
             
          )}
          keyExtractor={(item,index) => item.location_id.toString()}
        />
       
      </View>
      
    </View>
);
  }
}
export default LocationInfo;

  //const data1 = this.state.userData;
  /* <Text>User details: </Text> 
           <Text>{data}</Text> 
            <Button
              title="Show!"
              onPress={() => this.getUserInfo()}
              />
 if(this.state.isLoading)
      {
        return
        (
           <View>
             <ActivityIndicator
               size="large"
               color="blue"
               />
               </View>
        );
      } else
       {
         <View>
              <Text>Hello:</Text> <Button
              title="Show!"
              onPress={() => this.getInfo()}
              />
              <View>
              <FlatList
                data={this.state.locationData}
                renderItem={({item})=> (
                  <View>
                    <Text>{item.item_name}</Text>
                    <Button
                      title="Del"
                      onPress={() => console.log("del")}
                    />
                  </View>
                )
              }
              keyExtractor={(item,index) => item.id.toString()}
              />
              </View>
             
            </View>
  */



