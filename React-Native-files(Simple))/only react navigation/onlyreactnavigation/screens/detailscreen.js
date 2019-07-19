import React from 'react';
import { View, Image, Button, StyleSheet } from "react-native";
import { createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json



class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          {/* <Image source={Imagename} style={styles.previewImage} /> */}
        </View>
        <View style={styles.button}>
          <Button title="Pick Image" />
        </View>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('MoreDetailsScreen')}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    paddingTop: 50
  },
  placeholder: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "80%",
    height: 150
  },
  button: {
    margin: 8
  },
  previewImage: {
    width: "100%",
    height: "100%"
  }
});

export default DetailsScreen;