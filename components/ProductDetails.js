import { StyleSheet, Text, View ,Image,TouchableOpacity, Alert, Keyboard} from 'react-native';
import React,{useState,useEffect} from 'react'
import * as Style from '../assets/styles';
import database from '@react-native-firebase/database';

const ProductDetails = ({...props}) => {

  const[AllProduct,setAllProduct] = useState([]);

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

       // console.log(AllProduct);

    })

  }

  let details = props.route.params;


  useEffect(()=>{
    readFunction()
    
  },[])
  return (
    <View>
          <View style={styles.details} >
          <Image source={{ uri: details.uri }} style={{width:200,height:150,justifyContent:'center',alignItems:'center'}} />
            <View style={{flexDirection:'row',justifyContent:'space-between'}}> 
              <View style={styles.note}>
                  <Text style={[styles.text,{width:100}]} >{details.Name}</Text> 
                  </View>
          </View>
          <Text>Description: {details.Description}</Text>
          <Text>Stock: {details.Stock}</Text>
          <Text>Size: {details.Size}</Text>
          <Text>Price: {details.Price}</Text>
          </View>
    </View>
  )
}

export default ProductDetails


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
    color:Style.RedColor
  },

  divider:{
    width:"100%",
    height:2,
    backgroundColor:Style.RedColor,
    marginTop:5,
    marginBottom:5,
  },
  details:{
    marginBottom:20,
    padding:15,
    color:'black',
    opacity:0.8,
    marginTop:20,
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
    aligndetailss:'center',

  },
  button:{
    backgroundColor:Style.RedColor,
    width:50,
    borderRadius:100,
    justifyContent:'center',
    aligndetailss:'center',
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
    width:'75%',
    paddingTop:10
  },
  text:{
    fontWeight:'700',
    fontSize:17,
    alignSelf:'center'
  },
  delete:{
    color:Style.RedColor,
    fontWeight:'700',
    fontSize:15
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
    aligndetailss:'center',
    justifyContent:'space-between',
    marginVertical:8
  },
  searchButton:{
    backgroundColor:Style.RedColor,
    aligndetailss:'center',
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
    aligndetailss:'center',
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