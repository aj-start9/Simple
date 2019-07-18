import React from 'react';
import { View, Image, Button, StyleSheet, ActivityIndicator } from "react-native";
import { createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json
import Imagename from "./../assets/beautiful-place.jpg";
import ImagePicker from 'react-native-image-picker';



class DetailsScreen extends React.Component {

  state = {
    pickedImage: null,
    showdata: true
  }


  pickedImageHandler = () => {
    ImagePicker.showImagePicker({ title: 'pick an image' }, res => {
      if (res.didCancel) {
        console.log("User cancleed");
      }
      else if (res.error) {
        console.log("Error", res.error);
      }
      else {
        this.setState({ pickedImage: { uri: res.uri, base64: res.data } })
        // this.props.onImagePicked({ uri: res.uri, base64: res.data })

      }
    })
  }

  sendImageHandler = () => {
    this.setState({ showdata: false })
    fetch('https://simple-30744.firebaseio.com/users.json', {
      method: "POST",
      body: JSON.stringify({
        image: this.state.pickedImage.base64
      }),
    })
      .catch(err => console.log(err))
      .then(res => res.json())
      .then(parsedRes => {
        this.setState({ showdata: true })
      })

  }


  render() {

    let show = <ActivityIndicator />

    if (this.state.showdata) {
      show = <Button title="Send Image" onPress={this.sendImageHandler} />
    }
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Image source={this.state.pickedImage} style={styles.previewImage} />
        </View>
        <View style={styles.button}>
          <Button title="Pick Image" onPress={this.pickedImageHandler} />
          {show}

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