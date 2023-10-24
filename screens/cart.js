import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions, FlatList, Alert, ScrollView, Linking ,SafeAreaView,Platform,StatusBar} from 'react-native';
import firebase from 'firebase';
import db from './config';
import { Feather } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { MaterialIcons } from '@expo/vector-icons';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookName: '',
      price: '',
      email: firebase.auth().currentUser.email,
      orders: [],
      bookNameForEmail: [],
      customerName:'',
      todayDate:''
    };

  }
  componentDidMount() {

    this.getOrderDetails();
    this.getUserDetails();
    var d = new Date();
      
    this.setState({todayDate:d.toDateString()})

  }
  
  getOrderDetails = () => {
    db.collection("cart")
      .where("email", "==", this.state.email)
      .onSnapshot((snapshot) => {
        var allO = [];
        var bookNameO = []
        snapshot.docs.map((doc) => {
          // this.setState({ bookName: doc.data().bookName,
          // price:doc.data().price})
          var order = doc.data();
          order.id = doc.id;
          allO.push(order);
          bookNameO.push(order.bookName);
        })
        this.setState({
          orders: allO,
          bookNameForEmail: bookNameO
        });
        console.log("Cart orders", this.state.orders)
      });
  }

   getUserDetails = () => {
    db.collection("users")
      .where("uid", "==", firebase.auth().currentUser.uid)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
         this.setState({customerName:doc.data().name})
         console.log("Name-",doc.data().name)
        })
    });}

  handleDelete = (postId) => {
    Alert.alert(
      'Not the book you looking for..',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => this.deleteTask(postId),
        },
      ],
      { cancelable: false },
    );
  };

  deleteTask = async (id) => {
    await db.collection("cart").doc(id).delete().then(() => {
      alert("Product successfully deleted!");

    }).catch((error) => {
      alert("Something went wrong!Try later");
    });
    this.getOrderDetails()
  }

  openDrawer1 = () => {
    this.props.navigation.openDrawer();
  };
  emptylist = () => {
    return (
      <View style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center', }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }} > No books in the cart at the moment</Text>
      </View>
    )
  }

  placeOrder = async () => {
    if(this.state.orders!=''){
    const orderData = JSON.stringify(this.state.bookNameForEmail);
    await db.collection("orders").add({
      email:firebase.auth().currentUser.email,
      dateoforder:this.state.todayDate,
      books:orderData,
      customerName:this.state.customerName,
      orderStatus:'',
   });
    Linking.openURL('mailto:arnavvst2020@gmail.com' + '?subject=New Order' + '&body= You have a new order for books - \n' + orderData + '  . \n Please deliver them within 5 days. ');
    this.setState({ orders: [] })
    const collectionRef = db.collection("cart");
    // Define your query with a 'where' clause
    const query = collectionRef.where('email', '==', firebase.auth().currentUser.email);
    // Delete documents that match the query
    query.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      });
    });
    this.getOrderDetails();
  }
  else{
    alert('No books to order!Please add books from the catalogue')
  }


  }

  renderItem = ({ item }) => {

    return (
      <View style={{ flex: 1, width: screenWidth - 20, height: 80, backgroundColor: 'white', borderRadius: 15, margin: 20, }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>

          <Text style={{ margin: 15, fontSize: 16, fontWeight: 'bold' }}>{item.bookName}</Text>
          <Text style={{ margin: 15, fontWeight: 'bold' }}>{item.price}</Text>

        </View>
        <TouchableOpacity style={{
          alignSelf: 'flex-end', marginBottom: RFValue(5),
          marginRight: RFValue(10)
        }}
          onPress={() => { this.handleDelete(item.id) }}>
          <MaterialIcons name="delete" size={17} color="grey" />
        </TouchableOpacity>
      </View>

    )
  }
  render() {

    return (
      <ScrollView style={{ flex: 1, backgroundColor: 'periwinkle',width:screenWidth,height:screenHeight }}>
         <SafeAreaView style={{marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
}} />
        <View style={{ flexDirection: 'row' }}>
        
          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate("Cat")
          }} style={{ margin: 5 }}><FontAwesomeIcon
              icon={faArrowLeftLong}
              size={RFValue(26)}


            /></TouchableOpacity>
          {/* <TouchableOpacity onPress={this.openDrawer1} style={{marginTop:20}}>
         
         <Feather name="menu" size={30} color="black" style={{margin:5}}/>
         </TouchableOpacity> */}
          <Image style={{ width: 80, height: 80, marginTop: 5, marginLeft:screenWidth/3.8}} source={require('../assets/digi.png')}></Image>
        </View>

        <Text style={{ color: 'purple', fontSize: 30, fontWeight: 'bold', margin: 20 }}>
          Your Cart
        </Text>
        <View style={{ backgroundColor: '#5e17eb', width: screenWidth - 20, borderRadius: 15, alignSelf: 'center' }}>
          <Text style={{ color: 'white', padding: 10, textAlign: 'center' }}> Estimated Delivery- Upto 5 days from today</Text>
        </View>

        <FlatList
          ListEmptyComponent={() => this.emptylist()}
          scrollEnabled
          data={this.state.orders}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          marginBottom={30} />

        <TouchableOpacity style={{ backgroundColor: '#5e17eb', width: 200, alignSelf: 'center', height: 50, borderRadius: 50, alignContent: 'center', justifyContent: 'center' }}
          onPress={this.placeOrder}>
          <Text style={{ textAlign: 'center', color: 'white', fontSize: 20 }}>Place Order</Text>
        </TouchableOpacity>


      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  appTitle: {
    flex: 0.07,
    flexDirection: 'row',
  },
  appIcon: {
    height: 100,
    width: 100,
  },
});
