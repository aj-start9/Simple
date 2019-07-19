import React from 'react';
import { View, Text, Button, TextInput, ScrollView, ActivityIndicator,AsyncStorage } from 'react-native';
import { createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json
// import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import axios from 'axios';



class MoreDetailScreen extends React.Component {


  state = {
    medicineList: [],
    showlist: false
  }



  componentDidMount() {

    const data = this.props.navigation.state.params.orderkey
    axios.get('https://simple-30744.firebaseio.com/users/' + data + '.json')
      .then(res => {

        this.setState({ showlist: true })
        // for (let key in res.data.medicineList) {
        //   this.state.medicineList.push({
        //     ...res.data.medicineList[key],
        //     id: key
        //   })
        // }
        this.setState({ medicineList: res.data.medicineList })
        console.log(this.state.medicineList);
      })
      .catch(err => console.log(err))
  }


  quantitychangehandler = (e, medicineid) => {
    let array = [...this.state.medicineList]
    array.map(array => {
      if (array.id === medicineid.id) {
        console.log(array)
        array.maq = e
      }
    })
    this.setState({
      medicineList: array
    })
    console.log(this.state.medicineList)
  }


  updatemedicine = () => {
    const data = this.props.navigation.state.params.orderkey
    console.log(data)
    const updatedmedicine = this.state.medicineList
    console.log(updatedmedicine)
    axios.patch('https://simple-30744.firebaseio.com/users/' + data + '.json', { updatedmedicine })
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err))
  }



  render() {
    let medicineList = this.state.medicineList.map(medicineList => (
      <View key={medicineList.id} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row' }}>
          <Text>{medicineList.mname}</Text>
          <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} onChangeText={(e) => this.quantitychangehandler(e, medicineList)}
            value={medicineList.maq} />
          <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} value={medicineList.mrq} />
          <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} value={medicineList.price} />
        </View>

      </View>
    ))
    return (
      <ScrollView>
        {(this.state.showlist) ? medicineList : <ActivityIndicator />}
        <Button
          title="Go to store" onPress={this.updatemedicine} />
      </ScrollView>

    );
  }
}


export default MoreDetailScreen;