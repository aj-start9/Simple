import React from 'react';
import { View, Text, Button } from 'react-native';
import { createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json
// import AudioRecorderPlayer from 'react-native-audio-recorder-player';



class MoreDetailScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>Details Screen</Text>
        <Text>Details Scree123456789n</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
        
      </View>
    );
  }  
}


export default MoreDetailScreen;