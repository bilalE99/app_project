import React , {Component} from 'react';
import {Button , ToastAndroid} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ReviewScreen extends Component{
  constructor(props){
    super(props);

    this.state = {
      overall_rating:"",
      price_rating:"",
      quality_rating:"",
      clenliness_rating:"",
      review_body:"",
  }


  }
  addReview = async () => {
    const loc_id = this.props.route.params.location_id;
    const value = await AsyncStorage.getItem('@session_token');
    return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+loc_id+"/review", {
      method: 'post',
      headers: {
        'X-Authorization': value,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    })
    .then((response) => {
      if(response.status === 201){
        return response.json()
      }
       else if (response.status ===400){
           console.log(response);
        throw 'Failed Validation';
      }
      else{
        throw 'Something went wrong';
      }

    })
    .then(async (responseJson) => {
      console.log("Review created");
      this.props.navigation.navigate("LocationInfo");
      ToastAndroid.show("Review created", ToastAndroid.SHORT);

    })
    .catch((error) => {
      console.log(error);
      ToastAndroid.show("error", ToastAndroid.SHORT);
    })
      }
      render(){
        return(
            <ScrollView>
              <TextInput
              keyboardType="numeric"
              placeholder="Overall Rating"
              onChangeText={(overall_rating) => this.setState ({overall_rating})}
              value={this.state.overall_rating.toString()}
              style={{padding:5}}
              />
              <TextInput
              keyboardType="numeric"
              placeholder="Price Rating"
              onChangeText={(price_rating) => this.setState ({price_rating})}
              value={this.state.price_rating.toString()}
              style={{padding:5}}
              />
              <TextInput
              keyboardType="numeric"
              placeholder="Quality Rating"
              onChangeText={(quality_rating) => this.setState ({quality_rating})}
              value={this.state.quality_rating.toString()}
              style={{padding:5}}
              />
              <TextInput
              keyboardType="numeric"
              placeholder="Clenliness Rating"
              onChangeText={(clenliness_rating) => this.setState ({clenliness_rating})}
              value={this.state.clenliness_rating.toString()}
              style={{padding:5}}
              />
              <TextInput
              placeholder="Review "
              onChangeText={(review_body) => this.setState ({review_body})}
              value={this.state.review_body}
              style={{padding:5}}
              />
              <Button
              title="Add Review"
              onPress={() =>  this.addReview()}
              />
            </ScrollView>
        );

      }
    }


export default ReviewScreen;
