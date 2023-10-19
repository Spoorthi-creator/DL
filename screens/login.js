import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Image , SafeAreaView, TouchableOpacity,Alert} from 'react-native';
import db from './config';
import firebase from 'firebase';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      emailId: '',
      password: '',
    };
  }

  
  
  login = async (email,password) => {
    console.log("hi")
    firebase
      .auth()
      .signInWithEmailAndPassword(email,password)
      .then(() => {
        this.props.navigation.navigate('DashboardScreen');
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  render() {
    return (
      <View>
    <SafeAreaView>
<Image
          style={stylus.image}
          source={{uri:'data:image/jpeg;base64,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'}}
      />
         <TextInput
        style={stylus.inputs}
  onChangeText={(text) => {
            this.setState({ emailId: text });
          }}
  placeholder="  Email"
          placeholderTextColor="white"

    />
    
      <TextInput
        style={stylus.input}
       onChangeText={(text) => {
            this.setState({ password: text });
          }}
        placeholder="  Password"
secureTextEntry={true}  
        placeholderTextColor="white"
      />

<TouchableOpacity onPress={() => {
            this.login(this.state.emailId, this.state.password);
          }}>
       <Image

       style={{height:140,alignSelf:"center",marginTop:30}}
        source={require('../assets/login.png')}
      />     
      </TouchableOpacity>
<TouchableOpacity onPress={() => {
 this.props.navigation.navigate("SignUp")          }}>

           <Image

       style={{height:23,width:300,alignSelf:"center",marginTop:30}}
        source={require('../assets/signupbecome.png')}
      />    
      
      </TouchableOpacity>

          </SafeAreaView>

      </View>
    );
  }
}

const stylus = StyleSheet.create({
input:{
backgroundColor : "purple",
color:'white',
marginTop:20,
height:40,
margin:10,
borderRadius:5

},
inputs:{
backgroundColor : "purple",
color:'white',
marginBottom:5,
marginTop:0,
margin:10,
height:40,
borderRadius:5

},
image:{
  alignSelf:'center',
  width:200,
  height:200,
}


})