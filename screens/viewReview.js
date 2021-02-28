import React, { Component } from 'react';
import { View, Text, Button, Alert, TextInput, ToastAndroid, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ViewReview extends Component{
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
  const loc_id = this.props.route.params.location_id;
  

  return fetch("http://10.0.2.2:3333/api/1.0.0/location/" + loc_id, {
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
          data={this.state.locationData.location_reviews}
          renderItem={({item}) => (
            <TouchableOpacity>
               <View style={{padding:20}}>
                  <Text>{item.review_body}</Text>
                  <Text>Overall Rating:  {item.overall_rating}</Text>
                  <Text>Price Rating:  {item.price_rating}</Text>
                  <Text>Quality:  {item.quality_rating}</Text>
                  <Text>clenliness:  {item.clenliness_rating}</Text>
                  <Text>Likes:  {item.likes}</Text>
                  
              </View>
            </TouchableOpacity>
             
          )}
          keyExtractor={(item,index) => item.review_id.toString()}
        />
       
      </View>
      
    </View>
);
  }
}
export default ViewReview;
