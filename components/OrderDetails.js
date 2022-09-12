import { StyleSheet, Text, View ,Image,TouchableOpacity, Alert, Keyboard} from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Style from '../assets/styles';
import { ApplicationProvider, Layout,Icon, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';

const OrderDetails = ({navigation, ...props}) => {

    let item = props.route.params;
    // console.log("item",item);

  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

  var nowDate = new Date(); 
  var date = (monthNames[nowDate.getMonth()])+' '+nowDate.getDate()+', '+nowDate.getFullYear(); 
  var delivery = (monthNames[nowDate.getMonth()+2])+' '+nowDate.getDate()+', '+nowDate.getFullYear(); 

  const[order,setOrder] = useState([item]);

  useEffect(() =>{
    return () => {
      setOrder([]); // This worked for me
    };
  },[])

  return (
    <View style={styles.notesContainer}>
      <View style={styles.headingContainer}>
      <View>
        {order.length === 0
        ?
        <View styles={styles.emptyNoteContainer} >
          <Text style={styles.emptyNoteText} >There is no any Open Orders !!!</Text>
        </View>
        :
        order.map((item,index)=>{
          return <View key={index} >
            <View style={{flexDirection:'row',marginBottom:10}} >
            <Text style={{fontSize:20,fontWeight:'bold',width:238}} >Order ID: {item.orderId}</Text>
            <TouchableOpacity onPress={(()=>{navigation.navigate('Track',item)})} style={{backgroundColor:'blue',borderColor:'blue',color:'white',borderRadius:5,height:30,padding:5}} >
              <Text style={{color:'white'}} >Track Order</Text>
            </TouchableOpacity>
            
            </View>
            
            <View style={{}} >
              <Text style={{fontWeight:'600'}} >Order Date: {date}</Text>
              <Text style={{fontWeight:'600',color:'green'}}>Estimated Delivery: {delivery}</Text>
            </View>
             </View>
        })}
        </View>
      <View style={{flexDirection:'row'}} >
      </View>
      </View>
      <View style={styles.divider} ></View>
      <View style={styles.searchContainer}>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} >
        {order.length === 0
        ?
        <View styles={styles.emptyNoteContainer} >
        </View>
        :
        order.map((item,index)=>
        item.Items.map((product,key)=>
        <TouchableOpacity key={key} >
        <View style={styles.item} key={key} >
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View style={styles.note}>
            <Image source={{ uri: product.uri }} style={{width:60,height:60,marginTop:15,borderColor:'gray',borderWidth:1}} />
                <Text style={styles.text} >{product.Name}</Text>
                     
                </View>
                <Text style={{fontWeight:'bold',width:'100%',fontSize:17,marginTop:16}} > Rs.{product.Price}</Text>    
        </View>
        <Text style={[styles.text,{marginLeft:-27,marginTop:-30,fontSize:16,fontWeight:'normal'}]} >{product.Mart}</Text>
        <View style={{flexDirection:'row',width:'60%'}} >
          <Text style={{marginLeft:215,marginTop:-20,width:60,marginBottom:20}} >Qty: {product.Qty}</Text>
          </View>
        </View>
        </TouchableOpacity>
          )
        )
        
        }
        <View style={styles.divider} ></View>
        <View>
        {order.length === 0
        ?
        <View styles={styles.emptyNoteContainer} >
        </View>
        :
        order.map((item,index)=>{
          return <View style={{flexDirection:'row',marginTop:15}}  key={index} >
            <View style={{marginBottom:10}} >
            <Text style={{fontSize:18,fontWeight:'bold',width:170}} >Payment</Text>
            <Text style={{marginLeft:2,fontSize:15,fontWeight:'600',width:170,marginTop:10}} >Visa **42</Text>
            </View>
            <View style={{}} >
              <Text style={{fontWeight:'bold',fontSize:18}} >Delivery Address </Text>
              <Text style={{fontWeight:'600',marginTop:10}} >{item.Name}</Text>
              <Text style={{fontWeight:'600'}} >{item.Address}</Text>
              <Text style={{fontWeight:'600'}} >{item.City} {item.Country}</Text>
              <Text style={{fontWeight:'600'}} >{item.State} {item.ZipCode}</Text>
              <Text style={{fontWeight:'600'}} >{item.Contact}</Text>
              <Text style={{fontWeight:'bold',marginTop:10,fontSize:15}} >Delivery Method</Text>
              <Text style={{fontWeight:'600'}} >Free (30 Days)</Text>
            </View>
             </View>
        })}
        </View>
        <View style={[styles.divider,{marginTop:15,marginBottom:10}]} ></View>

        <View>
        {order.length === 0
        ?
        <View styles={styles.emptyNoteContainer} >
        </View>
        :
        order.map((item,index)=>{
          return <View style={{flexDirection:'row',marginTop:15}}  key={index} >
            <View style={{marginBottom:10}} >
            <Text style={{fontSize:18,fontWeight:'bold',width:170}} >Need help?</Text>
            <Text style={{marginLeft:2,fontSize:15,fontWeight:'600',width:170,marginTop:10}} >Order Issues</Text>
            <Text style={{marginLeft:2,fontSize:15,fontWeight:'600',width:170}} >Delivery Info</Text>
            <Text style={{marginLeft:2,fontSize:15,fontWeight:'600',width:170}} >Returns</Text>
            </View>
            <View style={{}} >
              <Text style={{fontWeight:'bold',fontSize:18}} >Order Summary </Text>
              <View style={{flexDirection:'row',marginTop:10}} >
                <Text style={{width:90,fontSize:16}}>SubTotal</Text>
                <Text style={{fontSize:16}} >Rs{item.Amount}</Text>
              </View>
              <View style={{flexDirection:'row',marginTop:4}} >
                <Text style={{width:85,fontSize:16}}>Discount</Text>
                <Text style={{fontSize:16}} > Rs{(item.Amount/100)*10}</Text>
              </View>
              <View style={{flexDirection:'row',marginTop:4}} >
                <Text style={{width:90,fontSize:16}}>Delivery</Text>
                <Text style={{fontSize:16}} >Rs00</Text>
              </View>
              <View style={[styles.divider,{marginTop:15,marginBottom:10}]} ></View>
              <View style={{flexDirection:'row',marginTop:5}} >
                <Text style={{width:83,fontSize:18,fontWeight:'600'}}>Total</Text>
                <Text style={{fontSize:18,fontWeight:'bold',width:80}} >Rs{item.Amount - (item.Amount/100)*10}</Text>
              </View>
            </View>
             </View>
        })}
        </View>
      </ScrollView>
    </View>
  )
}

export default OrderDetails;


export const styles = StyleSheet.create({
  notesContainer:{
    paddingTop:10,
    paddingHorizontal:20,
    marginBottom:70,
    opacity:0.9
  },
  heading:{
    fontSize:30,
    fontWeight:'700',
    color:Style.color
  },

  divider:{
    width:"100%",
    height:2,
    backgroundColor:Style.color,
    marginTop:5,
    marginBottom:5,
  },
  item:{
    marginBottom:20,
    padding:15,
    color:'black',
    opacity:0.8,
    marginTop:10,
    shadowColor:Style.color,
    shadowOpacity:0.5,
    shadowOffset:{width:0,height:4},
    shadowRadius:8,
    elevation:5,
    backgroundColor:'white',
    borderTopColor:Style.color,
    borderWidth:2,
    borderRadius:5,
    borderLeftWidth:8,
  },
  index:{
    fontSize:20,
    fontWeight:'800'
  },
  headingContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',

  },
  button:{
    backgroundColor:Style.color,
    width:50,
    borderRadius:100,
    justifyContent:'center',
    alignItems:'center',
    marginLeft:10,
    height:50
  },
  button_cr:{
    backgroundColor:Style.color,
    width:30,
    borderRadius:100,
    justifyContent:'center',
    alignItems:'center',
    height:30,
    marginTop:30

  },
  buttonText_cr:{
    color:'white',
    fontSize:20,
    fontWeight:'bold'

  },
  buttonText:{
    color:'white',
    fontSize:32,
    fontWeight:'800'
  },
  scrollView:{
    marginBottom:70
  },
  note:{
    flexDirection:'row',
    width:'75%'
  },
  text:{
    fontWeight:'700',
    fontSize:18,
    alignSelf:'center',
    width:130,
    paddingLeft:10,
    marginTop:-20
  },
  delete:{
    color:Style.color,
    fontWeight:'700',
    fontSize:20
  },
  input:{
    height:40,
    paddingHorizontal:20,
    width:'60%',
    fontSize:19,
    color:'black',
    fontWeight:'600',
    opacity:0.8,
    shadowColor:Style.color,
    shadowOpacity:0.4,
    shadowOffset:{width:0,height:4},
    shadowRadius:8,
    elevation:5,
    backgroundColor:'white',
    borderColor:Style.color,
    borderWidth:2,
    borderRadius:5
  }
  ,
  searchContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginVertical:8
  },
  searchButton:{
    backgroundColor:Style.color,
    alignItems:'center',
    justifyContent:'center',
    width:60,
    borderRadius:5,
    height:40
  },
  searchButtonText:{
    color:'white',
    fontWeight:'700',
    fontSize:10
  },
  emptyNoteContainer:{
    alignItems:'center',
    marginTop:240
  },
  emptyNoteText:{
    color:Style.color,
    fontWeight:'600',
    fontSize:15
  },
  dateContainer:{
    marginTop:10,
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:20
  }
})