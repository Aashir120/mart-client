import { StyleSheet, Text, View ,Image,TouchableOpacity,Button, Alert, Keyboard} from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Style from '../assets/styles';
import { ApplicationProvider, Layout,Icon, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';

const DetailsScreen = ({navigation}) => {


  const[AllProduct,setAllProduct] = useState([]);
  const[counter,setCounter] = useState(0);
  const[val,setVal] = useState(0);

  function readFunction(){
    database().ref('Mart').on('value',snapshot=>{
      var main = [];
      snapshot.forEach(child => {
        main.push({
          ...child.val()
        })
      });
      main.map((item)=>{

        for(var key in item.Products) {
          setAllProduct(oldArray => [...oldArray, item.Products[key]]);
        }
        
        })

    })

  }

  function createCart(item){
    database().ref('Cart').child(`${item.Name}`).set({
      Name:item.Name,
      Description:item.Description,
      Stock:item.Stock,
      Size:item.Size,
      uri:item.uri,
      Price:item.Price,
      Mart:item.Mart,
      Qty:1
    });

      setCounter(val)
      console.log("val====",val);
      console.log('counter====',counter);
      let count = counter + 1
      console.log("count====",count);
        setCounter(count);

        database().ref('Count').set({
          Count:count
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

  
  useEffect(()=>{
    readFunction()
    ReadCount()
    return () => {
      setAllProduct([]); // This worked for me
    };
  },[])

  const[searchNote,setSearchNote] = useState();
  function search(){
    if(searchNote === ''){
      Alert.alert('Type something in search box');

    } else if(searchNote!=''){
      AllProduct.forEach((item,index) => {
        if(item.Name.includes(searchNote)){
          let searchItem = [...AllProduct]
          let firstElOfArray = searchItem[0];
          let index = [...AllProduct].indexOf(item)
          searchItem[0] = item
          searchItem[index] = firstElOfArray
          setAllProduct(searchItem)
        }
        
      });
      
    }
    
    setSearchNote('');
    Keyboard.dismiss();
  }

  return (
    <View style={styles.notesContainer}>
      <View style={styles.headingContainer}>
      <Text style={styles.heading} >Products...</Text>
      <TouchableOpacity onPress={()=>navigation.navigate('Cart')} style={[styles.searchButton,{width:50}]}  >
        <IconRegistry icons={EvaIconsPack}/>
        <ApplicationProvider {...eva} theme={eva.light}>
            <Icon name="shopping-cart-outline" fill="white" style={{width:22,height:40}} />
            <Text style={{marginTop:-40,marginLeft:25,fontSize:16, color:'white',fontWeight:'bold'}} >{JSON.stringify(val)}</Text>
          </ApplicationProvider>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection:'row',alignItems:'center'}} >
        <Text style={{fontWeight:'700',fontSize:18,color:Style.color}} >
          Total: {AllProduct.length}
        </Text>
      </View>
      <View style={styles.divider} ></View>
      <View style={styles.searchContainer}>
        <TextInput placeholder='Search...' placeholderTextColor={Style.color} style={[styles.input,{borderWidth:3}]}
        value={searchNote} onChangeText={(text)=>setSearchNote(text)}
        />
        <TouchableOpacity onPress={()=>search()} style={[styles.searchButton,{width:50}]} >
        <IconRegistry icons={EvaIconsPack}/>
        <ApplicationProvider {...eva} theme={eva.light}>
            <Icon name="search" fill="white" style={{width:22,height:40}} />

          </ApplicationProvider>
        </TouchableOpacity>
        
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} >  
        {AllProduct.length === 0
        ?
        <View styles={styles.emptyNoteContainer} >
          <Text style={styles.emptyNoteText} >There is no note yet! Click on + button to add new note</Text>
        </View>
        :
        
        AllProduct.map((item,index)=>
        <TouchableOpacity key={index} onPress={()=>navigation.navigate('ProductDetails',item)}  >
          <View style={styles.item} key={index} >
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <View style={styles.note}>
              <Image source={{ uri: item.uri }} style={{width:80,height:80}} />
                  <Text style={styles.text} >{index + 1}. {item.Name}</Text>     
                  </View>
                  <Text style={{fontWeight:'600',width:'100%'}} > Rs.{item.Price}</Text>
                  
          </View>
          <Text style={[styles.text,{marginLeft:165,marginTop:-25,fontSize:16,fontWeight:'normal'}]} >{item.Mart}</Text>
          <TouchableOpacity onPress={()=>{

            createCart(item)
          }} style={[styles.searchButton,{width:80,marginLeft:200}]} >
           <Text style={{color:'white'}} >Add to Cart</Text>
        </TouchableOpacity>
          
          </View>
          </TouchableOpacity>
        )
        
        }
      </ScrollView>
    </View>
  )
}

export default DetailsScreen;


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
    color:Style.color,
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
    fontSize:15
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