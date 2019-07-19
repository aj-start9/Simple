
import React from 'react';
import { View, Text, Button } from 'react-native';
import { createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json
import DetailsScreen from './screens/detailscreen';
import MoreDetailsScreen from './screens/moredetail';
import HomeScreen from './screens/mainscreen';


export default createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Details: {
    screen: DetailsScreen,
  },
  MoreDetailsScreen: {
    screen: MoreDetailsScreen,
  },
}, {
    initialRouteName: 'Home',
  });