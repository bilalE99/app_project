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
  //let data  = this.state.locationData;
  
   return (
    <View style={{padding:20, flex: 1 }}>
      <Text style={{padding:10}}>Welcome to the Coffida App!</Text>
        <Text style={{padding:10}}>Below you can view the best Cafe's around!</Text>
        <Text style={{padding:10}}>Hope you enjoy :))</Text>
      
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.locationData}
          renderItem={({item}) => (
            <TouchableOpacity >
               <View style={{padding:20}}>
                  <Text>Town: {item.location_town}</Text>
                  <Text>Name of Cafe: {item.location_name}</Text>  
                  <Text>Overall Rating: {item.avg_overall_rating}</Text>
                  <Text>Overall Rating: {item.avg_overall_rating}</Text>
                  <Text>Price Rating: {item.avg_price_rating}</Text>
                  <Text>Quality Rating: {item.avg_quality_rating}</Text>
                  <Text>Clenliness Rating: {item.avg_clenliness_rating}</Text>
              </View>
              <Button
              title="Favourite this Location"
              onPress={() =>  console.log("ss")}
              />
                <Button
              title="View reviews for this Location"
              onPress={() => this.props.navigation.navigate("ViewReview", {location_id: item.location_id})}
              />
               <Button style={{padding:20}}
        title="Create new Review"
        onPress={() => this.props.navigation.navigate("AddReview", {location_id: item.location_id})}
            />
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



