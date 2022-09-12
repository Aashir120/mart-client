import { StyleSheet, Text, View ,Image,TouchableOpacity, Alert,ScrollView, Keyboard} from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Style from '../assets/styles';
import { ApplicationProvider, Layout,Icon, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import database from '@react-native-firebase/database';

const Cart = ({navigation}) => {
  const[AllCart,setAllCart] = useState([]);
  var main = [];
  const[val,setVal] = useState(0);

  function readFunction(){
    database().ref('Cart').on('value',snapshot=>{
      
      snapshot.forEach(child => {
        main.push({
          ...child.val()
        })
      });
      
      setAllCart(main);

    })
  }
  function ReadCount(){
    database().ref('Count').on('value',snapshot=>{
      let cr = 0;
      snapshot.forEach((item)=>{
        cr = item
        
      })
      
      setVal(cr)
  })
}
  function deleteNote(index){

    console.log(index);
    Alert.alert(
      'Delete All',
      'Are you sure you want to delete Mart?',
      [{
        text:'No',
        onPress:()=>console.log('No pressed'),
        style:'cancel'
      },
    {
      text:'Yes',
      onPress:()=>{
    database().ref('/Cart/'+index).remove();
    let ir = JSON.stringify(val) -1
    console.log(ir);
    setVal(ir)
    database().ref('Count').update({
      Count:ir
    });
    readFunction()  
    ReadCount()  
      }
    }]
    )
  }
  function IncQty(item) {

    let qty = item.Qty+1
    
    database().ref(`Cart/${item.Name}`).update({
      Qty:qty
    });
    database().ref(`Mart/${item.Mart}/Products/${item.Name}`).update({
      Stock:item.Stock - qty
    });
    
    console.log(item.Qty);
    readFunction()
  }
  
  function DecQty(item){
    
    if(item.Qty>0){
      let qty = item.Qty-1
      database().ref(`Cart/${item.Name}`).update({
        Qty:qty
      });
      database().ref(`Mart/${item.Mart}/Products/${item.Name}`).update({
        Stock:item.Stock + qty
      });
    } else{
      database().ref(`Cart/${item.Name}`).update({
        Qty:0
      });
      
    }
    readFunction()
  }
  
  useEffect(()=>{
    readFunction()
    ReadCount()
    return () => {
      setAllCart([]); // This worked for me
    };
  },[])

  
  return (
    <View>
      <View style={styles.headingContainer}>
      <Text style={styles.heading} >PRODUCT</Text>
      <TouchableOpacity style={[styles.searchButton,{width:50}]}  >
        <IconRegistry icons={EvaIconsPack}/>
        <ApplicationProvider {...eva} theme={eva.light}>
            <Icon name="shopping-cart-outline" fill="white" style={{width:22,height:40}} />
            <Text style={{marginTop:-40,marginLeft:25,fontSize:16, color:'white',fontWeight:'bold'}} >{JSON.stringify(val)}</Text>
          </ApplicationProvider>
        </TouchableOpacity>
      </View>  
        <View style={styles.divider} ></View>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} >  
        {AllCart.length === 0
        ?
        <View styles={styles.emptyNoteContainer} >
          <Text style={styles.emptyNoteText} >There is no note yet! Click on + button to add new note</Text>
        </View>
        :
        
        AllCart.map((item,index)=>
        <TouchableOpacity key={index} onPress={()=>navigation.navigate('ProductDetails',item)}  >
          <View style={styles.item} key={index} >
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <View style={styles.note}>
              <Image source={{ uri: item.uri }} style={{width:80,height:80}} />
                  <Text style={styles.text} >{index + 1}. {item.Name}</Text>
                       
                  </View>
                  <Text style={{fontWeight:'600',width:'100%'}} > Rs.{item.Price}</Text>    
          </View>
          <Text style={[styles.text,{marginLeft:165,marginTop:-20,fontSize:16,fontWeight:'normal'}]} >{item.Mart}</Text>
          <View style={{flexDirection:'row',width:'60%'}} >
          {item.Qty == 0 ?
             <TouchableOpacity style={[styles.button_cr,{opacity:0.5}]} disabled>
              <Text style={styles.buttonText_cr}>-</Text>
             </TouchableOpacity>:
             <TouchableOpacity style={styles.button_cr} onPress={()=>DecQty(item)} >
              <Text style={styles.buttonText_cr}>-</Text>
             </TouchableOpacity>
            }
            <Text style={{padding:5,marginTop:30}} >{item.Qty}</Text>
            <TouchableOpacity style={styles.button_cr} onPress={()=>IncQty(item)} >
              <Text style={styles.buttonText_cr}>+</Text>
            </TouchableOpacity>
            </View>
          <TouchableOpacity style={{marginTop:-28,marginLeft:210,height:30,padding:5,backgroundColor:'red',color:'white',width:'23%',borderRadius:10}} onPress={()=>deleteNote(item.Name)} >
              
              <Text style={[styles.delete,{fontSize:14,color:'white',fontWeight:'bold'}]} >Remove</Text>
            </TouchableOpacity>
          </View>
          </TouchableOpacity>
        )
        
        }
        <View style={styles.divider} ></View>
        <View style={[styles.headingContainer,{padding:10,marginLeft:18,width:'90%',backgroundColor:'blue',color:'white',height:45}]}>
      <Text style={[styles.heading,{fontSize:20,color:'white'}]} >SUBTOTAL</Text>
      <Text style={{color:'white',fontSize:18,fontWeight:'600'}} >Rs. 
      {AllCart.filter((product) => (product))
                                        .reduce((totalPrice, product) => (totalPrice + product.Price * product.Qty), 0)}</Text>    
      </View>  
      <TouchableOpacity onPress={(()=>navigation.navigate('Checkout',AllCart))} style={{marginBottom:5,marginLeft:18,width:'90%',backgroundColor:'black',color:'white',height:50,marginTop:10,padding:10,justifyContent:'center',alignItems:'center'}} >
        <Text style={{justifyContent:'center',color:'white'}} >PROCEED TO CHECKOUT</Text>
      </TouchableOpacity>
      </ScrollView>
      
    </View>
  )
}

export default Cart

export const styles = StyleSheet.create({
  notesContainer:{
    paddingTop:10,
    paddingHorizontal:20,
    marginBottom:70,
    opacity:0.9
  },
  heading:{
    fontSize:26,
    fontWeight:'700',
    color:Style.color,
    width:120
  },

  divider:{
    width:"100%",
    height:2,
    backgroundColor:Style.color,
    marginTop:10,
    marginBottom:10,
  },
  item:{
    marginBottom:20,
    padding:15,
    color:'black',
    marginLeft:18,width:'90%',
    
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
    borderLeftWidth:15,
  },
  index:{
    fontSize:20,
    fontWeight:'800'
  },
  headingContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginLeft:18,width:'90%',
    marginTop:10

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
    fontSize:17,
    alignSelf:'center',
    paddingLeft:10,
    width:'100%'
  },
  delete:{
    color:Style.color,
    fontWeight:'700',
    fontSize:20,
  },
  input:{
    height:40,
    paddingHorizontal:20,
    width:'75%',
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