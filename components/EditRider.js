import { View, Text,ScrollView,StyleSheet,KeyboardAvoidingView,Keyboard,TouchableWithoutFeedback ,TextInput,TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import * as Style from '../assets/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';
import DropDownPicker from 'react-native-dropdown-picker';

const EditRider = ({route,navigation, ...props}) => {

    let n = route.params.n
  const[rider,setRider] = useState();
  const[city,setCity] = useState();
  const[contact,setContact] = useState();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [vehicle, setVehicle] = useState([
    {label: 'Motor-Bike', value: 'Motor-Bike'},
    {label: 'Mini-Car', value: 'Mini-Car'},
    {label: 'Van', value: 'Van'},
    {label: 'Truck', value: 'Truck'}
  ]);

  function EditRiders(){

    database().ref(`/Rider/${n.Rider}`).remove();

    database().ref(`Rider/${n.Rider}`).set({
      Rider:rider,
      uri:n.uri,
      Contact:contact,
      City:city,
      Vehicle:value
    });
    
        navigation.navigate('Rider')

  }

  return (
    <ScrollView>
        <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      behavior='padding'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{padding:20,justifyContent:'space-around'}}>
            <TextInput style={[styles.input]} placeholder='Name Here...'
            multiline={true}
            value={rider} onChangeText={(text)=>setRider(text)} />
            <TextInput style={[styles.input]} placeholder='Contact Here...'
            multiline={false}
            value={contact} onChangeText={(text)=>setContact(text)} />
            <TextInput style={[styles.input]} placeholder='City Here...'
            multiline={false}
            value={city} onChangeText={(text)=>setCity(text)} />
            
            <DropDownPicker
                open={open}
                value={value}
                items={vehicle}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setVehicle}
                listMode="SCROLLVIEW"
              />
            
                <TouchableOpacity style={[styles.button,{width:'25%',marginTop:100}]} onPress={()=>EditRiders()} >
                    <Text style={styles.buttonText} >Edit</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>

      </KeyboardAvoidingView>
    </ScrollView>
  )
}

export const styles = StyleSheet.create({
    addNoteContainer:{
      paddingHorizontal:20,
      marginTop:20,
      alignItems:'center',
      justifyContent:'center'
    },
    input:{
      padding:20,
      paddingTop:0,
      width:'100%',
      fontSize:19,
      color:'black',
      fontWeight:'600',
      marginBottom:10,
      opacity:0.8,
      shadowColor:Style.RedColor,
      shadowOpacity:0.4,
      shadowOffset:{width:0,height:4},
      shadowRadius:8,
      elevation:5,
      backgroundColor:'white',
      borderColor:Style.RedColor,
      borderWidth:2,
      borderRadius:5,
      height:80
    },
    button:{
      backgroundColor:Style.RedColor,
      width:'48%',
      borderRadius:100,
      justifyContent:'center',
      alignItems:'center',
      height:40,
      alignSelf:'flex-end',
      marginTop:20
    },
    buttonText:{
      color:'white',
      fontSize:15,
      fontWeight:'700',
      width:'100%',
      paddingLeft:22
    },
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#bbded6'
    },
    selectButton: {
      borderRadius: 5,
      width: 150,
      height: 50,
      backgroundColor: '#8ac6d1',
      alignItems: 'center',
      justifyContent: 'center'
    },
    uploadButton: {
      borderRadius: 5,
      width: 150,
      height: 50,
      backgroundColor: '#ffb6b9',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20
    },
    imageContainer: {
      marginTop: 30,
      marginBottom: 50,
      alignItems: 'center'
    },
    progressBarContainer: {
      marginTop: 20
    },
    imageBox: {
      width: 300,
      height: 300
    }
  })

export default EditRider;