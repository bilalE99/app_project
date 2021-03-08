import React , {Component} from 'react';
import {Text, Button , ToastAndroid, TouchableWithoutFeedbackBase} from 'react-native';
import {ScrollView, TextInput,View} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RNCamera} from 'react-native-camera';
import styles from '../styleSheets/customStyles';
import Filter from 'bad-words';

class UpdReview extends Component{
  constructor(props){
    super(props);

    this.state = {
      overall_rating:this.props.route.params.overall_rating,
      price_rating:this.props.route.params.overall_rating,
      quality_rating:this.props.route.params.quality_rating,
      clenliness_rating:this.props.route.params.clenliness_rating,
      review_body:this.props.route.params.review_body,

      o_rating:this.props.route.params.overall_rating,
      p_rating:this.props.route.params.price_rating,
      q_rating:this.props.route.params.quality_rating,
      c_rating:this.props.route.params.clenliness_rating,
      r_body:this.props.route.params.review_body,

  }


  }
  componentDidMount(){
    this.displayOrigValues();
  }
  displayOrigValues(){
    /*
    const o = this.props.route.params.overall_rating;
    o_rating = o;
    p_rating = this.props.route.params.price_rating;
    c_rating = this.props.route.params.clenliness_rating
    q_rating = this.props.route.params.quality_rating;
    r_body = this.props.route.params.review_body;
    */
    console.log("Values Loaded from previous screen") ;
  }
  UpdateReview = async () => {
    let to_send = {};
    //tokens to pass into url
    const loc_id = this.props.route.params.location_id;
    const rev_id = this.props.route.params.review_id;
    const value = await AsyncStorage.getItem('@session_token');


    const filter = new Filter();
    filter.addWords('tea', 'cakes', 'pastries','cake','pastry');

    to_send.overall_rating = parseInt(this.state.overall_rating);
    to_send.price_rating = parseInt(this.state.price_rating);   
    to_send.quality_rating = parseInt(this.state.quality_rating);    
    to_send.clenliness_rating = parseInt(this.state.clenliness_rating);
    to_send.review_body = filter.clean(this.state.review_body);

   
    console.log(filter.clean(this.state.review_body));


    return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+loc_id+"/review/"+rev_id, {
      method: 'patch',
      headers: {
        'X-Authorization': value,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(to_send),
    })
    .then((response) => {
      if(response.status === 200){
       // console.log(response);
        
      }
       else if (response.status ===400){
           //console.log(response);
        throw 'Failed Validation';
      }
      else{
        throw 'Something went wrong';
      }

    })
    .then(async () => {
      console.log("Review updated!");
      this.props.navigation.push("UserInfo");
      ToastAndroid.show("Review updated", ToastAndroid.SHORT);

    })
    .catch((error) => {
      console.log(error);
      ToastAndroid.show("error", ToastAndroid.SHORT);
    })
      }

      render(){
        return(
            <ScrollView>
              <Text style={{padding: 5}}>
                Update Review Details: 

              </Text>
              <TextInput
              keyboardType="numeric"
              onChangeText={(overall_rating) => this.setState ({overall_rating})}
              defaultValue={this.state.overall_rating.toString()}
              style={{padding:5}}
              />
              <TextInput
              keyboardType="numeric"
              placeholder="Price Rating"
              onChangeText={(price_rating) => this.setState ({price_rating})}
              defaultValue={this.state.price_rating.toString()}
              style={{padding:5}}
              /> 
              <TextInput
              keyboardType="numeric"
              placeholder="Clenliness Rating"
              onChangeText={(clenliness_rating) => this.setState ({clenliness_rating})}
              defaultValue={this.state.clenliness_rating.toString()}
              style={{padding:5}}
              />
              <TextInput
              keyboardType="numeric"
              placeholder="Quality Rating"
              onChangeText={(quality_rating) => this.setState ({quality_rating})}
              defaultValue={this.state.quality_rating.toString()}
              style={{padding:5}}
              />
              <TextInput
              placeholder="Review "
              onChangeText={(review_body) => this.setState ({review_body})}
              defaultValue={this.state.review_body}
              style={{padding:5}}
              />
              <Button
              title="Update Review"
              onPress={() =>  this.UpdateReview()}
              />

              <RNCamera 
                ref={ref => {
                  this.camera = ref;
                }}
                style={styles.preview}
                captureAudio={false}
                />
          
            </ScrollView>
            
        );

      }
    }


export default UpdReview;
