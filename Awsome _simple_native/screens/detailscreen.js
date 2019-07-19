import React from 'react';
import { View, Image, Button, StyleSheet, ActivityIndicator, TextInput, Text, AsyncStorage } from "react-native";
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
      medicineList: null
    }
    this.itemsRef = firebase1.database().ref('users/');
    this.itemsRef.on('value', data => {
      const orderkey = this.state.orderkey
      console.log(orderkey)
      console.log(data.val())
      console.log(data.val()['-Lk3oTuV61rzwtjvzdUy']['medicineList'])
      if (this.state.orderkey !== '') {
        console.log(data.val()[orderkey]['isAvailable'])
        if (data.val()[orderkey]['isAvailable'] !== undefined) {
          this.setState({ isAvailable: data.val()[orderkey]['isAvailable'] })
        }
        else {
          this.setState({ isAvailable: null })
        }

        let medicineList = data.val()[orderkey]['medicineList']
        console.log(medicineList)
        if (medicineList !== undefined) {
          this.setState({ medicineList: medicineList, isAvailable: null })
        }
      }
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


  confirmHandler = () => {
    const data = {
      isConfirm: 'confirm'
    }
    return axios.patch('https://simple-30744.firebaseio.com/users/' + this.state.orderkey + '.json', data)
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err))
  }

  cancelHandler = () => {
    const data = {
      isConfirm: 'cancel'
    }
    return axios.patch('https://simple-30744.firebaseio.com/users/' + this.state.orderkey + '.json', data)
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
            const orderkey = parsedRes.data.name;
            //asynchrose storage
            AsyncStorage.setItem("orderkey", orderkey);
            AsyncStorage.setItem("orderkey1", 'hzgsvdgsfv');
            //asynchrose storage

            this.setState({ showdata: true, orderkey: parsedRes.data.name })
            return axios.get('https://simple-30744.firebaseio.com/users/' + parsedRes.data.name + '.json')
              .then(res =>
                console.log(res)
              )
              .catch(err => console.log(err))
          })
          .catch(err => console.log(err))

      })
  }
  render() {
    let show = <ActivityIndicator />
    let confirm = <View>
      <Button onPress={this.confirmHandler} title="Confirm" />
      <View style={styles.btnmargin}>
        <Button onPress={this.cancelHandler} title="Cancel" />

      </View>
      <Text>After confirmation you will receive a Bill</Text>
    </View >

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
        {show}
        <View style={styles.btnmargin}>
          {(this.state.medicineList !== null ?
            <Button
              title="Go to Bill" medicinelist={this.state.orderkey}
              onPress={() => this.props.navigation.navigate('MoreDetailsScreen', {
                orderkey: this.state.orderkey
              })}
            /> : null)}
        </View>

        <Text>
          {this.state.isAvailable}
        </Text>
        {(this.state.isAvailable === null) ? null : confirm}

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
  },
  btnmargin: {
    marginTop: 20
  }
});

export default DetailsScreen;