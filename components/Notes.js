import { StyleSheet, Text, View ,Image,TouchableOpacity, Alert, Keyboard} from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Style from '../assets/styles';
import { ApplicationProvider, Layout,Icon, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';

const Notes = ({navigation, ...props}) => {

  let BinNotes = [];
  function readFunction(){
    database().ref('Mart').on('value',snapshot=>{
      var main = [];
      snapshot.forEach(child => {
        main.push({
          ...child.val()
        })
      });
      main.map((item)=>{

        BinNotes.push(item)
        })

        props.setNotes(BinNotes)

    })

  }

  useEffect(()=>{
    readFunction()
  },[])

  


  const[searchNote,setSearchNote] = useState();

  function deleteNote(index){
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
        let newArray = [...props.notes];
    let movedNote = newArray.splice(index,1);
    props.setNotes(newArray);
    let deletedOnce = "";
    movedNote.map((item)=>{
      deletedOnce = item.Mart
    })
    console.log(deletedOnce);
    database().ref('/Mart/'+deletedOnce).remove();       
      }
    }]
    )
  }
  
  function search(){
    if(searchNote === ''){
      Alert.alert('Type something in search box');

    } else if(searchNote!=''){
      props.notes.forEach((item,index) => {
        if(item.Mart.includes(searchNote)){
          let searchItem = [...props.notes]
          let firstElOfArray = searchItem[0];
          let index = [...props.notes].indexOf(item)
          searchItem[0] = item
          searchItem[index] = firstElOfArray
          props.setNotes(searchItem)
        }
        
      });
      
    }
    
    setSearchNote('');
    Keyboard.dismiss();
  }

  function clearAllNotes(){
    Alert.alert(
      'Delete All',
      'Are you sure you want to delete All Marts?',
      [{
        text:'No',
        onPress:()=>console.log('No pressed'),
        style:'cancel'
      },
    {
      text:'Yes',
      onPress:()=>{
        
        let emptyArray = [...props.notes]
        emptyArray=[]
        props.setNotes(emptyArray)
        database().ref('Mart').remove();
        
      }
    }]
    )
  }


  return (
    <View style={styles.notesContainer}>
      <View style={styles.headingContainer}>
      <Text style={styles.heading} >Marts...</Text>
      <View style={{flexDirection:'row'}} >
          <TouchableOpacity style={ styles.button} onPress={()=>navigation.navigate('AddNote')} >
          <IconRegistry icons={EvaIconsPack}/>
          <ApplicationProvider {...eva} theme={eva.light}>
            <Icon name="plus-outline" fill="white" style={{width:25,height:50}} />
          </ApplicationProvider>
          </TouchableOpacity>
      </View>
      </View>
      <View style={{flexDirection:'row',alignItems:'center'}} >
        <Text style={{fontWeight:'700',fontSize:18,color:Style.color}} >
          Total: {props.notes.length}
        </Text>
      </View>
      <View style={styles.divider} ></View>
      <View style={styles.searchContainer}>
        <TextInput placeholder='Search...' placeholderTextColor={Style.color} style={[styles.input,{borderWidth:3}]}
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

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} >
        {props.notes.length === 0
        ?
        <View styles={styles.emptyNoteContainer} >
          <Text style={styles.emptyNoteText} >There is no note yet! Click on + button to add new note</Text>
        </View>
        :
        props.notes.map((item,index)=>
        <TouchableOpacity key={index} onPress={()=>navigation.navigate('Products',item.Mart)}  >
          <View style={styles.item} key={index} >
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <View style={styles.note}>
              <Image source={{ uri: item.uri }} style={{width:50,height:50}} />
                
                  <Text style={styles.text} >{index + 1}. {item.Mart}</Text> 
                  </View>

            <TouchableOpacity onPress={()=>deleteNote(index)} >
              
              <Text style={styles.delete} >X</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dateContainer} >
            <Text>{props.date}</Text>
          </View>
          </View>
          </TouchableOpacity>
        )
        
        }
      </ScrollView>
    </View>
  )
}

export default Notes;


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
    width:'100%'
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