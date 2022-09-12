import { StyleSheet, Text, View ,Image,TouchableOpacity, Alert, Keyboard,ScrollView} from 'react-native';
import React, { useEffect, useState ,useContext} from 'react';
import * as Style from '../assets/styles';
import { ApplicationProvider, Layout,Icon, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';
import {AuthContext} from '../components/AuthProvider';

const Order = ({navigation, ...props}) => {
  const {user} = useContext(AuthContext);

  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

  var nowDate = new Date(); 
  var date = (monthNames[nowDate.getMonth()])+' '+nowDate.getDate()+', '+nowDate.getFullYear(); 
  var delivery = (monthNames[nowDate.getMonth()+2])+' '+nowDate.getDate()+', '+nowDate.getFullYear(); 

  const[order,setOrder] = useState([]);
  var main = [];
  function readFunction(){
    database().ref('Orders').on('value',snapshot=>{
      
      snapshot.forEach(child => {
        main.push({
          ...child.val()
        })
      });
      main.map((item)=>{
        if(item.uid === user.uid){
          console.log(item.Amount);
          setOrder(prevMovies => ([...prevMovies,item]))
        }
      })

    })
    
  }

  useEffect(() =>{
    readFunction()
    return () => {
      setOrder([]); // This worked for me
    };
  },[])

  return (
    <View style={styles.notesContainer}>
      <View style={styles.headingContainer}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} > 
        {order.map((item,index)=>{
          return <TouchableOpacity key={index}>
          <View  style={styles.item}>
            <View style={{flexDirection:'row',marginBottom:10}} >
            <Text style={{fontSize:20,fontWeight:'bold',width:190}} >Order ID: {item.orderId}</Text>
            <TouchableOpacity onPress={(()=>{navigation.navigate('Track',item)})} 
            style={{paddingLeft:10,width:90,backgroundColor:'blue',borderColor:'blue',color:'white',borderRadius:5,height:30,padding:5}} >
              <Text style={{color:'white'}} >Track Order</Text>
            </TouchableOpacity>
            
            </View>
            <TouchableOpacity onPress={(()=>{navigation.navigate('OrderDetails',item)})} 
            style={{marginLeft:190,width:90,backgroundColor:'yellow',borderColor:'yellow',color:'black',borderRadius:5,height:30,padding:5}} >
              <Text style={{color:'black'}} >Order Details</Text>
            </TouchableOpacity>
            <View style={{marginTop:10}} >
              <Text style={{fontWeight:'600'}} >Order Date: {date}</Text>
              <Text style={{fontWeight:'600',color:'green'}}>Estimated Delivery: {delivery}</Text>
            </View>
             </View>
             </TouchableOpacity>
        })}
        </ScrollView>
      <View style={{flexDirection:'row'}} >
      </View>
      </View>
      
    </View>
  )
}

export default Order;


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
    width:320
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
    marginBottom:0
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