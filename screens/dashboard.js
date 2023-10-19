import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';
import { Feather } from '@expo/vector-icons';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
import db from './config'
import firebase from "firebase"
export default class Dash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: '',
      quote: '',
      name:'',
      email:firebase.auth().currentUser.email
    };
  }
  getUserDetails27 = () => {
    db.collection("users")
      .where("email", "==", this.state.email)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          this.setState({name : doc.data().name})
        })
    });}
  componentDidMount() {
    this.fetchQuotes();
    this.getUserDetails27()
 
}

  

  fetchQuotes() {
    var category = 'happiness';
    fetch('https://api.api-ninjas.com/v1/quotes?category=' + category, {
      method: 'GET',
      headers: {
        'X-Api-Key': '+eMhjEwCuniwQ3t6APkwHQ==xgXgfgCU5n0yJDWO',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const { author, quote } = data[0];
          this.setState({ author, quote });
        } else {
          console.error('No quotes found.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  openDrawer1 = () => {
    this.props.navigation.openDrawer();
   };

  render() {
    return (
      <View>
         <TouchableOpacity onPress={this.openDrawer1} style={{marginTop:20}}>
         
          <Feather name="menu" size={30} color="black" style={{margin:5}}/>
          </TouchableOpacity>
        <Text style={stylus.namastetext}>Namaste,</Text>
        <Text style={stylus.namastetexto}>{this.state.name}</Text>

        <Text>Author: {this.state.author}</Text>
        <Text>Quote: {this.state.quote}</Text>

        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Cat');
          }}>
          <Image
            style={{
              width: 340,
              height: 80,
              marginTop: 30,
              marginBottom: 5,
              marginLeft: 30,
            }}
            source={require('../assets/catologuepng.png')}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={{
              width: 340,
              height: 80,
              marginTop: 30,
              marginBottom: 5,
              marginLeft: 30,
            }}
            source={require('../assets/supportnow.png')}
          ></Image>
        </TouchableOpacity>

        
      </View>
    );
  }
}

const stylus = StyleSheet.create({
  namastetext: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'purple',
  },
  namastetexto: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'blue',
  },
});
