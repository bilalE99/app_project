import React, { Component } from 'react';
import { View, Text, Button, Alert, TextInput, ToastAndroid, ActivityIndicator, ScrollView, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Rating, AirbnbRating } from 'react-native-ratings';

class SearchData extends Component {
  constructor(props) {
    super(props);


    this.state = {
      isLoading: true,
      locations: null,
      q: '',
      overall_rating: 0,
      price_rating: 0
    };

  }
  componentDidMount() {
    this.checkLoggedIn();
  }

  checkLoggedIn = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    if (value == null) {
      ToastAndroid.show("Need to be logged in first!", ToastAndroid.SHORT, ToastAndroid.CENTER);
      //this.props.navigation.navigate("Login");
    }
    else {
      this.getData("http://10.0.2.2:3333/api/1.0.0/find");
    }
  }
  getData = async (url) => {
    const value = await AsyncStorage.getItem("@session_token");
    const id = await AsyncStorage.getItem("@user_id");
    //console.log(id);

    return fetch(url, {
      method: 'get',
      headers: {
        'X-Authorization': value
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        else if (response.status === 401) {
          throw 'Unauthorised';
        }
        else {
          throw 'Something went wrong';
        }
      })
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          isLoading: false,
          locations: responseJson,
        })

      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT, ToastAndroid.CENTER);
      })
  }

  search = () => {
    let url = "http://10.0.2.2:3333/api/1.0.0/find?"

    console.log(this.state.q);
    console.log(this.state.overall_rating);
    console.log(this.state.price_rating);

    if (this.state.q != '') {
      url += "q=" + this.state.q + "&";
    }
    if (this.state.overall_rating > 0) {
      url += "overall_rating" + this.state.overall_rating + "&";
    }

    this.getData(url);


  }

  ratingCompleted(rating, name) {
    let statedObject = () => {
      let returnObj = {};
      returnObj[name] = rating;
      return returnObj;
    };
    this.setState(statedObject);
  }



  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Search</Text>
        <TextInput
          value={this.state.q}
          onChangeText={(q => this.setState({ q: q }))}
        />

        <Text>Overall Rating</Text>
        <AirbnbRating
          size={10}
          defaultRating={0}
          onFinishRating={(rating) => this.ratingCompleted(rating, "overall_rating")}
        />

        <Button
          title="Search"
          onPress={() => { this.search() }}
        />

        <FlatList
          contentContainerStyle={{ paddingBottom: 20 }}
          data={this.state.locations}
          renderItem={({ item }) => (
            <View style={{ padding: 10 }}>
              <Text>{item.location_town}</Text>
              <Text>{item.location_name}</Text>
              <Text>Rating: {item.avg_overall_rating}</Text>
              <Text>Price: {item.avg_price_rating}</Text>
            </View>
          )}
          keyExtractor={(item, index) => item.location_id.toString()}
        />
      </View>


    );
  };

};


export default SearchData;