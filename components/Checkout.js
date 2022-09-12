import React, { PureComponent,useContext } from 'react'
import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from 'react'
import database from '@react-native-firebase/database';
import SweetAlert from 'react-native-sweet-alert';
import * as Style from '../assets/styles';
import { View, Text,StyleSheet, Dropdown,KeyboardAvoidingView,Keyboard,Image, ScrollView, TextInput,TouchableOpacity, Alert } from 'react-native'
import Button from '../components/Button'
import {AuthContext} from '../components/AuthProvider';
import { demoCardFormParameters } from '../scenes/demodata/demodata'
import RNRestart from 'react-native-restart';

import Stripe from 'tipsi-stripe'
import { useEffect } from 'react';

Stripe.setOptions({
  publishableKey:'pk_test_51KfqI4DMSlJTK91CKeRE2ofJljYIPVNFdsBxem3VFIWxeoXhBqcPLTC59kZmBCGhqEPk37VHztXHlvgWfvgyRlc300UoSRlegs'

})

const Checkout = ({navigation,...props}) => {
  const {user} = useContext(AuthContext);

  let orderId = Math.floor(Math.random() * 1000001);

  const[car,setCar] = useState([]);
  const [name, setName] = useState();
  const [uid, setUid] = useState(user.uid);
  const [addr, setAddr] = useState();
  const [city,setCity] = useState(); 
  const[state,setState] = useState();
  const[zip,setZip] = useState();
  const[num,setNum] = useState();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Afghanistan', value: 'Afghanistan'},
    {label: 'Albania', value: 'Albania'},
    {label: 'Algeria', value: 'Algeria'},
    {label: 'Australia', value: 'Australia'},
    {label: 'United States', value: 'United States'},
    {label: 'Pakistan', value: 'Pakistan'},
    {label: 'India', value: 'India'},
    {label: 'Bangladesh', value: 'Bangladesh'},
    {label: 'United Kingdom', value: 'United Kingdom'},
    {label: 'Belgium', value: 'Belgium'},
    {label: 'Canada', value: 'Canada'},
    {label: 'Germany', value: 'Germany'},
    {label: 'Russia', value: 'Russia'},
  ]);

  function Car_selection(){

    let cart = props.route.params;
      let price = cart.filter((product) => (product))
      .reduce((totalPrice, product) => (totalPrice + product.Price * product.Qty), 0)

    database().ref('Rider').on('value',snapshot=>{
      var main = [];
      var tmp = [];
      snapshot.forEach(child => {
        main.push({
          ...child.val()
        })
      });
      main.forEach((item)=>{
        if(price > 4000 && item.Vehicle === 'Motor-Bike'){
            if(item.length != 0){
              tmp = item
            }
        } 
        if(price > 6000 && item.Vehicle === 'Truck'){
            
            if(item.length != 0){
              tmp = item
            }
        }
           
      })
      setCar(tmp)
    })
    

  }

  function createProduct(){

    let cart = props.route.params;
    let price = cart.filter((product) => (product))
      .reduce((totalPrice, product) => (totalPrice + product.Price * product.Qty), 0)


    database().ref('Orders').child(`${orderId}`).set({
      orderId:orderId,
      Name:name,
      Country:value,
      Address:addr,
      City:city,
      State:state,
      ZipCode:zip,
      Contact:num,
      Amount:price,
      Items:cart,
      Rider:car,
      uid:uid
    });

    database().ref('Cart').remove()
    database().ref('Count').remove()

  }

  const[loading,setLoading] = useState(false);
  const[paymentMethod,setPaymentMethod] = useState(null);

  async function handleCardPayPress () {
    try {
      setLoading(true)
      setPaymentMethod(null)

      const paymentMethod1 = await Stripe.paymentRequestWithCardForm(demoCardFormParameters)

      setLoading(false)
      setPaymentMethod(paymentMethod1)
      createProduct()
      SweetAlert.showAlertWithOptions({
        title: 'Thanks For Your Order!',
        subTitle: `Order has been created successfully. Your order number is #${orderId}`,
        confirmButtonTitle: 'OK',
        confirmButtonColor: '#000',
        otherButtonTitle: 'Cancel',
        style: 'success',
        cancellable: true
      })

      navigation.navigate('Home')
      setTimeout(() => {
        RNRestart.Restart()
        
      }, 2000);

    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(()=>{
      Car_selection()
      return () => {
        setCar([]); // This worked for me
      };

  },[])

  
  return (
    <ScrollView>
    <View style={styles.container}>
        <Text style={styles.header}>Add your shipping address</Text>
        <View style={styles.divider} ></View>
        <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      behavior='padding'>
         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{padding:50,marginLeft:53,justifyContent:'space-around'}} >
          <Text style={{fontSize:16,fontWeight:'700',paddingBottom:5}} >Country/Region</Text>
          <DropDownPicker
          style={{width:320,backgroundColor:'#ebe9e6'}}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                listMode="MODAL"
              />
              <Text style={{fontSize:16,fontWeight:'700',paddingBottom:8,paddingTop:10}} >Full name (First and Last name)</Text>
            <TextInput style={[styles.input]} placeholder='Type Here...'
            multiline={false}
            value={name} onChangeText={(text)=>setName(text)} />
            <Text style={{fontSize:16,fontWeight:'700',paddingBottom:8,paddingTop:10}} >Street address</Text>
            <TextInput style={[styles.input]} placeholder='Street Address, P.O box, company name'
            multiline={false}
            value={addr} onChangeText={(text)=>setAddr(text)} />
            <Text style={{fontSize:16,fontWeight:'700',paddingBottom:8,paddingTop:10}} >City</Text>
            <TextInput style={[styles.input]} placeholder='Type Here...'
            multiline={false}
            value={city} onChangeText={(text)=>setCity(text)} />
            <Text style={{fontSize:16,fontWeight:'700',paddingBottom:8,paddingTop:10}} >State / Province / Region</Text>
            <TextInput style={[styles.input]} placeholder='Type Here...'
            multiline={false}
            value={state} onChangeText={(text)=>setState(text)} />
            <Text style={{fontSize:16,fontWeight:'700',paddingBottom:8,paddingTop:10}} >Zip Code</Text>
            <TextInput style={[styles.input]} placeholder='Type Here...'
            multiline={false}
            value={zip} onChangeText={(text)=>setZip(text)} />
            <Text style={{fontSize:16,fontWeight:'700',paddingBottom:8,paddingTop:10}} >Phone number</Text>
            <TextInput style={[styles.input]} placeholder='Type Here...'
            multiline={false}
            value={num} onChangeText={(text)=>setNum(text)} />
            <Button
            style={{width:'50%',marginLeft:70,marginTop:30,fontWeight:'bold',borderRadius:5,backgroundColor:'#faeb1e',color:'black',borderColor:'#faeb1e'}}
          text="Enter you card and pay"
          loading={loading}
          onPress={()=>handleCardPayPress()}
        />
          
          </View>
         </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      </View>
      </ScrollView>
  )
}

export default Checkout;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instruction: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  paymentMethod: {
    height: 20,
  },
  addNoteContainer:{
    paddingHorizontal:20,
    marginTop:20,
    alignItems:'center',
    justifyContent:'center'
  },
  input:{
    padding:20,
    paddingTop:10,
    marginTop:0,
    width:'85%',
    fontSize:19,
    color:'black',
    fontWeight:'600',
    opacity:0.8,
    shadowColor:Style.RedColor,
    shadowOpacity:0.4,
    shadowOffset:{width:0,height:4},
    shadowRadius:8,
    elevation:5,
    backgroundColor:'white',
    borderColor:'gray',
    borderWidth:2,
    borderRadius:5,
    height:60
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
    fontWeight:'700'
  },
  selectButton: {
    borderRadius: 5,
    width: 100,
    height: 50,
    backgroundColor: '#8ac6d1',
    alignItems: 'center',
    justifyContent: 'center'
  },
  divider:{
    width:"100%",
    height:2,
    backgroundColor:Style.color,
    marginTop:5,
    marginBottom:-15
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
