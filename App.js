import 'react-native-gesture-handler';
import React, { Component, View,Button } from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

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


const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

function AppDrawer(){
  return(
          <Drawer.Navigator drawerType="slide">
            <Drawer.Screen name="Home" component={Home}/>
            <Drawer.Screen name="Reviews" component={UserManagement}/>
            <Drawer.Screen name="Settings" component={Page3}/>
            <Drawer.Screen name="Logout" component={Login} style={{marginTop: '100%', padding: 50}}/>
          </Drawer.Navigator>
    );
  }

function App(){
  return(
      <NavigationContainer>
        
          <Stack.Navigator>
            <Stack.Screen name="Coffida Review App" component={AppDrawer}/>
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
          </Stack.Navigator>
       
      </NavigationContainer>
    );
  }




export default App;
