import * as React from 'react';
import {
  Image,
  FlatList,
  Dimensions,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default class Cho1 extends React.Component {
  render(){
    
  return (
    <ScrollView>
      <Text style={Stylus.libo}>Library</Text>
      <Text style={Stylus.book}>Non-fiction</Text>
      <ScrollView horizontal={true}>
        <TouchableOpacity onPress={()=>{
          this.props.navigation.navigate('Quant')
        }}>
          <Image
            style={{ width: 102, height: 140 }}
            source={{ uri: 'https://mrbeastcompany.github.io/d2/quantaum.png' }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          this.props.navigation.navigate('Sapiens')
        }}>
          <Image
            style={{ width: 102, height: 140 }}
            source={{ uri: 'https://mrbeastcompany.github.io/d2/sapiens.png' }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          this.props.navigation.navigate('US')
        }}>
          <Image
            style={{ width: 102, height: 140 }}
            source={{ uri: 'https://mrbeastcompany.github.io/d2/us.png' }}
          />
        </TouchableOpacity>
      </ScrollView>
      <Text style={Stylus.book}>Fiction</Text>
      <ScrollView horizontal={true}>
        <TouchableOpacity onPress={()=>{
          this.props.navigation.navigate('Rick')
        }}>
          <Image
            style={{ width: 102, height: 140 }}
            source={{ uri: 'https://mrbeastcompany.github.io/d2/rick.png' }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          this.props.navigation.navigate('Gernimo')
        }}>
          <Image
            style={{ width: 102, height: 140 }}
            source={{ uri: 'https://mrbeastcompany.github.io/d2/gernimo.png' }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          this.props.navigation.navigate('David')
        }}>
          <Image
            style={{ width: 102, height: 140 }}
            source={{ uri: 'https://mrbeastcompany.github.io/d2/david.png' }}
          />
        </TouchableOpacity>
      </ScrollView>
      <ScrollView horizontal={true}>
        <TouchableOpacity onPress={()=>{
          this.props.navigation.navigate('80')
        }}>
          <Image
            style={{ width: 102, height: 140 }}
            source={{ uri: 'https://mrbeastcompany.github.io/d2/80datw.png' }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          this.props.navigation.navigate('Dahl')
        }}>
          <Image
            style={{ width: 102, height: 140 }}
            source={{ uri: 'https://mrbeastcompany.github.io/d2/roaldh.png' }}
          />
        </TouchableOpacity>
      </ScrollView>
      <Text style={Stylus.book}>Biography</Text>
      <ScrollView horizontal={true}>
        <TouchableOpacity onPress={()=>{
          this.props.navigation.navigate('Walt')
        }}>
          <Image
            style={{ width: 102, height: 140 }}
            source={{ uri: 'https://mrbeastcompany.github.io/d2/iam.png' }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          this.props.navigation.navigate('Kalam')
        }}>
          <Image
            style={{ width: 102, height: 140 }}
            source={{ uri: 'https://mrbeastcompany.github.io/d2/drkalam.png' }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          this.props.navigation.navigate('Boy')
        }}>
          <Image
            style={{ width: 102, height: 140 }}
            source={{ uri: 'https://mrbeastcompany.github.io/d2/boy.png' }}
          />
        </TouchableOpacity>
      </ScrollView>
      <Text style={Stylus.book}>Coding</Text>
      <ScrollView horizontal={true}>
        <TouchableOpacity onPress={()=>{
          this.props.navigation.navigate('JS')
        }}>
          <Image
            style={{ width: 102, height: 140 }}
            source={{ uri: 'https://mrbeastcompany.github.io/d2/js.png' }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          this.props.navigation.navigate('Hack')
        }}>
          <Image
            style={{ width: 102, height: 140 }}
            source={{ uri: 'https://mrbeastcompany.github.io/d2/hack.png' }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          this.props.navigation.navigate('Linus')
        }}>
          <Image
            style={{ width: 102, height: 140 }}
            source={{ uri: 'https://mrbeastcompany.github.io/d2/linux.png' }}
          />
        </TouchableOpacity>
      </ScrollView>
      
    </ScrollView>
  );
  }
}

const Stylus = StyleSheet.create({
  libo: {
    color: 'purple',
    fontWeight: 'bold',
    fontSize: 35,
  },
  book: {
    color: 'purple',
    fontWeight: 'bold',
    fontSize: 39,
  },
});
