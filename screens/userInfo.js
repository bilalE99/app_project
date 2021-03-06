import React, { Component } from 'react';
import { Image,View, Text, Button, Alert, TextInput, ToastAndroid, ActivityIndicator, ScrollView,FlatList, TouchableOpacity,StyleSheet, YellowBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogBox } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.']);


class GetUser extends Component{
  constructor(props){
    super(props);


    this.state = {
        userData: [],
        isLoading:true,
        photoInfo:[],
        imageUrls: [],
        photos: '',
        
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
    //console.log(id);

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
            userData: responseJson,
        })
       
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT,ToastAndroid.CENTER);
      })

      

  }

  DeleteReview = async (loc_id,rev_id) => {
    const value = await AsyncStorage.getItem('@session_token');

    return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+loc_id+"/review/"+rev_id, {
      method: 'delete',
      headers: {
        'X-Authorization': value,
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if(response.status === 200){
        console.log(response);
        
      }
       else if (response.status ===400){
           console.log(response);
        throw 'Failed Validation';
      }
      else{
        throw 'Something went wrong';
      }

    })
    .then(async () => {
      console.log("Review deleted!");
      this.getUserInfo();
      ToastAndroid.show("Review deleted!", ToastAndroid.SHORT);

    })
    .catch((error) => {
      console.log(error);
      ToastAndroid.show("error", ToastAndroid.SHORT);
    })
      }

      getPhoto = async (loc_id,rev_id) => {
    
        return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+loc_id+"/review/"+rev_id+'/photo', {
          method: 'get',
          headers: {
          },
        })
        .then((response) => {
          if(response.status === 200){
            console.log(response);
            let json = response;
            
            this.setState({
              photoInfo: response,
              photos: json.url
            })
          
          }
           else if (response.status ===404){
               console.log(response);
          }
          else{
            throw 'Something went wrong';
          }
    
        })
        .then(async () => {
          console.log("Photo Retrieved");
          //this.props.navigation.navigate("DisplayPhoto",{photo_url: this.state.photoInfo})
        })
        .catch((error) => {
          console.log(error);
          ToastAndroid.show("error", ToastAndroid.SHORT);
        })
          }


  render(){

/*    const data = this.state.photoInfo;
    const x = new Map(Object.entries(data));
    var y = x.get('url');
    */
    return (

      
      <View>

        <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={{padding:5}}> 
      <Text >My Account</Text>
      <Text style={{padding:5}}>Name: {this.state.userData.first_name} {this.state.userData.last_name}</Text>
      <Text style={{padding:5}}>Email: {this.state.userData.email}</Text>
      <Text style={{padding:5}}>My Reviews: </Text>
      <FlatList style={{padding:5}}
          data={this.state.userData.reviews}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => this.props.navigation.navigate("UpdateReview", 
            {location_id: item.location.location_id, review_id: item.review.review_id,
              overall_rating: item.review.overall_rating, price_rating: item.review.price_rating,
              clenliness_rating: item.review.clenliness_rating, quality_rating: item.review.quality_rating,
              review_body: item.review.review_body})}>
              <View style={{padding:5,flex: 1,paddingVertical: 20}}>
                  <Text>{item.location.location_name}</Text>
                  <Text>{item.location.location_town}</Text>
                  <Text>Overall: {item.review.overall_rating}</Text>
                  <Text>Price: {item.review.price_rating}</Text>
                  <Text>Clenliness: {item.review.clenliness_rating}</Text>
                  <Text>Quality: {item.review.quality_rating}</Text>
                  <Text>{item.review.review_body}</Text>
                  <Text>Likes: {item.review.likes}</Text>   
                  <Button
              title="Delete Review"
              onPress={() =>  this.DeleteReview(item.location.location_id,item.review.review_id)}
              />
              <Button
              title="Add a photo"
              onPress={() => this.props.navigation.navigate("TakePhoto",
              {location_id: item.location.location_id, review_id: item.review.review_id})}
              />
                    <Button
              title="Display Photo"
              onPress={() =>  this.getPhoto(item.location.location_id,item.review.review_id)}
              />        
              <Button
              title="Like"
              onPress={() =>  console.log("ss")}
              options={{
                tabBarIcon: ({  }) => (
                  <Icon name="heart" size={26} />
                )}} />
              <Image 
          source={{uri: this.state.photos}} 
          style={{height: 100, width: 100}}
          resizeMode= 'cover'
        />

              </View>
              
              </TouchableOpacity>  
          )}
          keyExtractor={(item) => item.review.review_id.toString()}
        />
        <View >

           
        </View>
      
    </View>
  </ScrollView>
      </View>
      
    
);
    }
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20
  }
});

export default GetUser;
