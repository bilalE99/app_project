import React, { Component } from 'react';
import { View, Text, Button, Alert, TextInput, ToastAndroid, ActivityIndicator, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class LocationHandler extends Component{
  constructor(props){
    super(props);

}
componentDidMount(){
  const loc_id = this.props.route.params.location_id;
}
render(){
    const loc_id = this.props.route.params.location_id;
    
   return (
    <View style={{padding:20}}>
      <View>
       <Text>Location ID: {loc_id}</Text>
       <Button style={{padding:20}}
        title="Create new Review"
        onPress={() => this.props.navigation.navigate("AddReview", {location_id: loc_id})}
        />
        
        <Button style={{padding:20}}
        title="View Reviews"
        onPress={() => this.props.navigation.navigate("ViewReview", {location_id: loc_id})}
        />
      </View>
      
    </View>
);
  }
}
export default LocationHandler;
