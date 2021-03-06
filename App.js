import 'react-native-gesture-handler';
import React, { Component, View, Button } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './screens/home';
import UserManagement from './screens/usermanagement';
import Page3 from './screens/page3';
import Signup from './screens/signup';
import Login from './screens/login';
import UpdateUser from './screens/updateuser';
import UserInfo from './screens/userInfo';
import LocationInfo from './screens/locationInfo';
import DisplayScreen from './screens/displayScreen';
import LocationHandler from './screens/locationHandler';
import AddReview from './screens/addReview';
import SearchLocation from './screens/search';
import UpdateReview from './screens/updateReview';
import ViewReview from './screens/viewReview';
import TakePhoto1 from './screens/TakePhoto';
import DisplayPhoto from './screens/displayPhoto';


const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

function AppDrawer() {
  return (
    /*
          <Drawer.Navigator drawerType="slide">
            <Drawer.Screen name="Home" component={Home}/>
            <Drawer.Screen name="Reviews" component={UserManagement}/>
            <Drawer.Screen name="Settings" component={Page3}/>
            <Drawer.Screen name="Logout" component={Login} style={{marginTop: '100%', padding: 50}}/>
          </Drawer.Navigator>
          */

    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home}
        options={{
          tabBarIcon: ({  }) => (
            <Icon name="home" size={26} />
          )}}
      />
      <Tab.Screen name="Search" component={SearchLocation}
       options={{
        tabBarIcon: ({  }) => (
          <Icon name="search" size={26} />
        )}} />
    </Tab.Navigator>
    
  );
}

function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator>
        <Stack.Screen name="Coffida Review App" component={AppDrawer} />
        <Stack.Screen name="Account Management" component={UserManagement} />
        <Stack.Screen name="Page3" component={Page3} />
        <Stack.Screen name="Sign Up" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="UpdateUser" component={UpdateUser} />
        <Stack.Screen name="UserInfo" component={UserInfo} />
        <Stack.Screen name="LocationInfo" component={LocationInfo} />
        <Stack.Screen name="DisplayScreen" component={DisplayScreen} />
        <Stack.Screen name="LocationHandler" component={LocationHandler} />
        <Stack.Screen name="AddReview" component={AddReview} />
        <Stack.Screen name="SearchLocation" component={SearchLocation} />
        <Stack.Screen name="UpdateReview" component={UpdateReview} />
        <Stack.Screen name="ViewReview" component={ViewReview} />
        <Stack.Screen name="TakePhoto" component={TakePhoto1} />
        <Stack.Screen name="DisplayPhoto" component={DisplayPhoto} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}




export default App;
