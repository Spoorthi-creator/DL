import React, { Component } from "react";
import {
    View,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    Image,
    TextInput,
    Alert,
    TouchableOpacity,
    Text,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';

import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";
import { Entypo } from '@expo/vector-icons';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            confirmPassword: "",
            fontsLoaded: false,
            name: "",
            phonewithCC: "",
            secureTextEntry: true,
            errorMessage: "", // Added for error messages
        };
    }
    changeSecureText = ()=> {
        this.setState({secureTextEntry:!this.state.secureTextEntry})  
      }
    registerUser = (email, password, confirmPassword, name, phoneNumber) => {
        if (password === confirmPassword) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    const user = firebase.auth().currentUser.uid
                    db.collection("users").add({
                        password: password,
                        email: email,
                        name: name,
                        phone: phoneNumber,
                        uid: firebase.auth().currentUser.uid,
                    });
                    alert("Welcome");
                    this.props.navigation.navigate("DashboardScreen");
                })
                .catch((error) => {
                    var errorMessage = error.message;
                    this.setState({ errorMessage }); // Set error message
                });
        } else {
            this.setState({ errorMessage: "Passwords do not match" }); // Set error message
        }
    };

    render() {
        const { email, password, confirmPassword, name, phonewithCC } = this.state;

        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea} />
                <Image style={{ width: 200, height: 200, marginLeft: 10, marginTop: 40 }} source={require('../assets/digi.png')}></Image>

                <TextInput
                    style={styles.textinput}
                    onChangeText={text => this.setState({ name: text })}
                    placeholder={"Name"}
                    placeholderTextColor={"#FFFFFF"}
                />
                <TextInput
                    style={styles.textinput}
                    onChangeText={text => this.setState({ email: text })}
                    placeholder={"Enter Email"}
                    placeholderTextColor={"#FFFFFF"}
                    keyboardType="email-address"
                />
                <View style={{flexDirection:'row'}}>
                <TextInput
                    style={styles.disabledtextinput }
                    onChangeText={text => this.setState({ password: text })}
                    placeholder={"Enter Password"}
                    placeholderTextColor={"#FFFFFF"}
                    secureTextEntry={this.state.secureTextEntry}
                />
                
                <TouchableOpacity style={{marginTop:20,marginLeft:-40}} onPress={this.changeSecureText}>
                    {this.state.secureTextEntry ? <Entypo name="eye-with-line" size={27} color="white" /> : <Entypo name="eye" size={27} color="white" />}
                </TouchableOpacity> 
                </View>
                <TextInput
                    style={styles.textinput}
                    onChangeText={text => this.setState({ confirmPassword: text })}
                    placeholder={"Re-enter Password"}
                    placeholderTextColor={"#FFFFFF"}
                    secureTextEntry
                />
                <TextInput
                    style={styles.textinput}
                    onChangeText={text => this.setState({ phonewithCC: text })}
                    placeholder={"Phone (with CC)"}
                    placeholderTextColor={"#FFFFFF"}
                    keyboardType='phone-pad'
                />
                <TouchableOpacity
                    style={[styles.button, { marginTop: 5 }]}
                    onPress={() => this.registerUser(email, password, confirmPassword, name, phonewithCC)}
                >
                    <Image style={{ width: 200, height: 60, marginTop: 30, marginBottom: 5 }} source={require('../assets/registersign.png')}></Image>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Login")}
                >
                    <Text style={styles.buttonTextNewUser}>Already a user? Login</Text>
                </TouchableOpacity>

                {/** Error message container */}
                {this.state.errorMessage !== "" && (
                    <View style={styles.errorMessageContainer}>
                        <Text style={styles.errorMessageText}>{this.state.errorMessage}</Text>
                    </View>
                )}
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center"
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0

    },
    appIcon: {
        width: RFValue(200),
        height: RFValue(200),
        resizeMode: "contain",
        marginBottom: RFValue(20)
    },
    appTitleText: {
        color: "black",
        textAlign: "center",
        fontSize: RFValue(40),
        marginBottom: RFValue(20)
    },
    textinput: {
        width: RFValue(250),
        height: RFValue(40),
        padding: RFValue(5),
        marginTop: RFValue(7),
        borderColor: "#",
        borderWidth: RFValue(2),
        borderRadius: RFValue(10),
        fontSize: RFValue(15),
        color: "#FFFFFF",
        backgroundColor: "#800080"
    },
    disabledtextinput: {
        width: RFValue(250),
        height: RFValue(40),
        padding: RFValue(5),
        marginTop: RFValue(7),
        borderColor: "#",
        borderWidth: RFValue(2),
        borderRadius: RFValue(10),
        fontSize: RFValue(15),
        color: "#FFFFFF",
        backgroundColor: "#800080",
        marginLeft:-11,
    },
    button: {
        width: RFValue(250),
        height: RFValue(50),
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        borderRadius: RFValue(30),
        backgroundColor: "white",
        marginBottom: RFValue(20)
    },
    buttonText: {
        fontSize: RFValue(24),
        color: "#800080"
    },
    buttonTextNewUser: {
        fontSize: RFValue(12),
        color: "#800080"
    }
});