import { View, Text,ScrollView,StyleSheet,KeyboardAvoidingView,Keyboard,TouchableWithoutFeedback ,TextInput,TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import * as Style from '../assets/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';
import DropDownPicker from 'react-native-dropdown-picker';

const EditProduct = ({route,navigation, ...props}) => {

    let n = route.params.n

   // console.log('n====',n.uri);

    const[Qty,setQty] = useState(0);
  const[price,setPrice] = useState(0);
  const[desc,setDesc] = useState();
  const[product,setProduct] = useState();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: '1L', value: '1L'},
    {label: '1.5L', value: '1.5L'},
    {label: '2L', value: '2L'},
    {label: '3L', value: '3L'}
  ]);

  function EditProducts(){

    database().ref(`/Mart/${n.Mart}/Products/${n.Name}`).remove();

    database().ref(`Mart/${n.Mart}`).child('Products').child(`${product}`).set({
      Name:product,
      Description:desc,
      Stock:Qty,
      Size:value,
      uri:n.uri,
      Price:price,
      Mart:n.Mart
    });
    
        navigation.navigate('Products')

  }

  function IncQty() {
    setQty(Qty+1);
    console.log(Qty);
  }
  
  function DecQty(){
    if(Qty>0){
    setQty(Qty-1);
    } else{
      setQty(0)
    }
  }


    


  return (
    <ScrollView>
        <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      behavior='padding'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{padding:20,justifyContent:'space-around'}}>
            <TextInput style={[styles.input]} placeholder='Title Here...'
            multiline={true}
            value={product} onChangeText={(text)=>setProduct(text)} />
            <TextInput style={[styles.input]} placeholder='Description Here...'
            multiline={true}
            value={desc} onChangeText={(text)=>setDesc(text)} />
            <TextInput style={[styles.input]} placeholder='Price Here...'
            multiline={false}
            value={price.toString()} onChangeText={(text)=>setPrice(text)} />
            {Qty == 0 ?
             <TouchableOpacity style={[styles.button,{opacity:0.5}]} disabled>
              <Text style={styles.buttonText}>-</Text>
             </TouchableOpacity>:
             <TouchableOpacity style={styles.button} onPress={()=>DecQty()} >
              <Text style={styles.buttonText}>-</Text>
             </TouchableOpacity>
            }
            <Text>{Qty}</Text>
            <TouchableOpacity style={styles.button} onPress={()=>IncQty()} >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                listMode="SCROLLVIEW"
              />
                <TouchableOpacity style={[styles.button,{width:'20%'}]} onPress={()=>EditProducts()} >
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
      height:100
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

export default EditProduct;