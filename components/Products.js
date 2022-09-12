import { StyleSheet, Text, View ,Image,TouchableOpacity, Alert, Keyboard} from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Style from '../assets/styles';
import { ApplicationProvider, Layout,Icon, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';
import { RefreshControl } from 'react-native-web-refresh-control'

const Products = ({navigation, ...props}) => {


    let martName = props.route.params;
  let BinProducts = [];

  function readFunction(){
    database().ref(`Mart/${martName}/Products`).on('value',snapshot=>{
      var main = [];
      snapshot.forEach(child => {
        main.push({
          ...child.val()
        })
      });
      main.map((item)=>{

        BinProducts.push(item)
        })

        props.setProducts(BinProducts)

    })

  }

  useEffect(()=>{
    readFunction()
  },[])


  const[searchNote,setSearchNote] = useState();

  function deleteNote(index){
    Alert.alert(
      'Delete',
      'Are you sure you want to delete this Product?',
      [{
        text:'No',
        onPress:()=>console.log('No pressed'),
        style:'cancel'
      },
    {
      text:'Yes',
      onPress:()=>{
        let newArray = [...props.products];
    let movedNote = newArray.splice(index,1);
    props.setProducts(newArray);
    props.setMoveToBinProduct(movedNote);

    let binNote;
    movedNote.forEach((item)=>{
      binNote = item.Name.toString();
      
    })
    console.log('BinNote',binNote);  
    database().ref(`/Mart/${martName}/Products/${binNote}`).remove();
        
      }
    }]
    )
    
  }
  function search(){
    if(searchNote === ''){
      Alert.alert('Type something in search box');

    } else if(searchNote!=''){
      props.products.forEach((item,index) => {
        if(item.Name.includes(searchNote)){
          let searchItem = [...props.products]
          let firstElOfArray = searchItem[0];
          let index = [...props.products].indexOf(item)
          searchItem[0] = item
          searchItem[index] = firstElOfArray
          props.setProducts(searchItem)
        }
        
      });
      
    }

    setSearchNote('');
    Keyboard.dismiss();
  }

  function clearAllNotes(){
    Alert.alert(
      'Delete All',
      'Are you sure you want to delete All Products?',
      [{
        text:'No',
        onPress:()=>console.log('No pressed'),
        style:'cancel'
      },
    {
      text:'Yes',
      onPress:()=>{
        let emptyArray = [...props.products]

        emptyArray=[]
        props.setProducts(emptyArray)
        //props.setMoveToBin(deletedCompArray);
        
      }
    }]
    )
    
  }
  
    return (
    <View>
      <View style={styles.notesContainer}>
      <View style={styles.headingContainer}>
      <Text style={styles.heading} >{props.route.params}</Text>
      <View style={{flexDirection:'row'}} >
          <TouchableOpacity style={ styles.button} onPress={()=>navigation.navigate('AddProduct',martName)} >
          <IconRegistry icons={EvaIconsPack}/>
          <ApplicationProvider {...eva} theme={eva.light}>
            <Icon name="plus-outline" fill="white" style={{width:25,height:50}} />
          </ApplicationProvider>
          </TouchableOpacity>
      </View>
      </View>
      <View style={{flexDirection:'row',alignItems:'center'}} >
        <Text style={{fontWeight:'700',fontSize:18,color:Style.RedColor}} >
          Total: {props.products.length}
        </Text>
      </View>
      <View style={styles.divider} ></View>
      <View style={styles.searchContainer}>
        <TextInput placeholder='Search...' placeholderTextColor={Style.RedColor} style={[styles.input,{borderWidth:3}]}
        value={searchNote} onChangeText={(text)=>setSearchNote(text)}
        />
        <TouchableOpacity style={[styles.searchButton,{width:50}]} onPress={()=>search()}  >
        <ApplicationProvider {...eva} theme={eva.light}>
            <Icon name="search" fill="white" style={{width:22,height:40}} />
          </ApplicationProvider>
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchButton} onPress={()=>clearAllNotes()} >
            <Text style={styles.searchButtonText}>Clear</Text>
        </TouchableOpacity>
        
      </View>

      <ScrollView
      style={styles.scrollView} 
        contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false} >
        {props.products.length === 0
        ?
        <View styles={styles.emptyNoteContainer} >
          <Text style={styles.emptyNoteText} >There is no note yet! Click on + button to add new note</Text>
        </View>
        :
        props.products.map((item,index)=>
          <View style={styles.item} key={index} >
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <View style={styles.note}>
              <Image source={{ uri: item.uri }} style={{width:50,height:50}} />
                
                  <Text style={styles.text} >{index + 1}. {item.Name}</Text> 
                  </View>

            <TouchableOpacity onPress={()=>deleteNote(index)} >
              <Text style={styles.delete} >X</Text>
            </TouchableOpacity>
          </View>
          <Text >Description: {item.Description}</Text>
          <Text>Stock: {item.Stock}</Text>
          <Text>Size: {item.Size}</Text>
          <Text>Price: {item.Price}</Text>
          <View style={styles.dateContainer} >
            
            <Text>{props.date}</Text>
            
          </View>
          <TouchableOpacity onPress={()=>navigation.navigate('EditProducts',{
              i:index,
              n:item
            })} >
              <Text style={styles.delete} >Edit</Text>
            </TouchableOpacity>
          </View>
        )
        
        }
      </ScrollView>
    </View>
    </View>
  )
}

export default Products


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
      color:Style.RedColor,
      width:'70%'
    },
  
    divider:{
      width:"100%",
      height:2,
      backgroundColor:Style.RedColor,
      marginTop:5,
      marginBottom:5,
    },
    item:{
      marginBottom:20,
      padding:15,
      color:'black',
      opacity:0.8,
      marginTop:10,
      shadowColor:Style.RedColor,
      shadowOpacity:0.5,
      shadowOffset:{width:0,height:4},
      shadowRadius:8,
      elevation:5,
      backgroundColor:'white',
      borderTopColor:Style.RedColor,
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
    scrollView: {
      height: '70%',
      width: '100%',
      margin: 10,
      alignSelf: 'center',
      padding: 10,
      borderWidth: 2,
      borderRadius: 2,
      borderColor: 'black',
      overflow:'scroll'
    },
    contentContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 20
    },
    button:{
      backgroundColor:Style.RedColor,
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
    note:{
      flexDirection:'row',
      width:'75%'
    },
    text:{
      fontWeight:'700',
      fontSize:17,
      alignSelf:'center',
      width:'100%'
    },
    delete:{
      color:Style.RedColor,
      fontWeight:'700',
      fontSize:20,
      width:'100%',
    },
    input:{
      height:40,
      paddingHorizontal:20,
      width:'60%',
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
      backgroundColor:Style.RedColor,
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
      color:Style.RedColor,
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