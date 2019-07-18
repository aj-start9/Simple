import React from 'react';
import { View, Image, Button, StyleSheet, ActivityIndicator, TextInput, Text } from "react-native";
import { createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json
import Imagename from "./../assets/beautiful-place.jpg";
import ImagePicker from 'react-native-image-picker';
import firebase from 'react-native-firebase';
import axios from 'axios';
import firebase1 from './firebase';



class DetailsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      pickedImage: null,
      showdata: true,
      userid: firebase.auth().currentUser.uid,
      isAvailable: null,
      orderkey: '',
      orders: [],
      singleuser: []
    }
    this.itemsRef = firebase1.database().ref('users/');
    this.itemsRef.on('value', data => {
      const orderkey = this.state.orderkey
      console.log(data.val())
      console.log(data.val()['-Ljzlu3nmeJbJWJM8yPT']['isAvailable'])
      // const isAvailable = data.val()[orderkey]
      // console.log(data.val()[orderkey]);
      // console.log(orderkey)
      // this.state.singleuser.push({
      //   ...isAvailable,
      //   id: orderkey
      // })
      // console.log(this.state.singleuser)

    })
  }



  componentDidMount() {
    var ref = firebase1.database().ref("users");
    ref.orderByKey().startAt("Medicine").on("child_added", function (snapshot) {
      console.log(snapshot.key);
    });
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

  nameChangeHandler = (value) => {
    this.setState({ name: value })
  }

  sendImageHandler = () => {
    this.setState({ showdata: false })

    fetch('https://us-central1-simple-30744.cloudfunctions.net/storeImage', {
      method: "POST",
      body: JSON.stringify({
        image: this.state.pickedImage.base64

      }),
    })
      .catch(err => console.log(err))
      .then(res => res.json())
      .then(parsedRes => {
        data = {
          name: this.state.name,
          userid: firebase.auth().currentUser.uid,
          image: parsedRes.imageUrl

        }
        return axios.post('https://simple-30744.firebaseio.com/users.json', data)
          .then(parsedRes => {
            console.log(parsedRes)
            console.log(parsedRes.data.name)
            this.setState({ showdata: true, orderkey: parsedRes.data.name })
            return axios.get('https://simple-30744.firebaseio.com/users/' + parsedRes.data.name + '.json')
              .then(res =>
                this.setState({ isAvailable: res.data.isAvailable })
              )
              .catch(err => console.log(err))
          })
          .catch(err => console.log(err))

      })



  }
  render() {
    let show = <ActivityIndicator />

    if (this.state.showdata) {
      show = <Button title="Send to Store" onPress={this.sendImageHandler} />
    }
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Image source={this.state.pickedImage} style={styles.previewImage} />
        </View>
        <View style={styles.button}>
          <Button title="Pick Image" onPress={this.pickedImageHandler} />
          <TextInput placeholder="Patient Name" value={this.state.name} onChangeText={this.nameChangeHandler} />

        </View>
        {this.state.singleuser.isAvailable}
        {show}
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