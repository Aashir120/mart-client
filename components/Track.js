import { View, Text,Image,StyleSheet ,TouchableOpacity} from 'react-native'
import React,{useState,useEffect} from 'react'
import * as Style from '../assets/styles';
import call from 'react-native-phone-call';
import { Icon } from 'react-native-elements';

const Track = ({navigation, ...props}) => {
  let item = props.route.params;

  const[number,setNumber] = useState(item.Rider.Contact);

  const triggerCall=()=>{
    const args={
      number: number,
      prompt:true
    };
    call(args).catch((err)=>console.log(err))
  }

  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

  var nowDate = new Date(); 
  var date = (monthNames[nowDate.getMonth()])+' '+nowDate.getDate()+', '+nowDate.getFullYear(); 
  var delivery = (monthNames[nowDate.getMonth()+2])+' '+nowDate.getDate()+', '+nowDate.getFullYear();

  
  const[trackDetails,setTrackDetails] = useState([item]);

  useEffect(() =>{
    trackDetails.map((item)=>{
      console.log(item.Rider);
    })
    return () => {
      setTrackDetails([]); // This worked for me
    };
  },[])
  return (
    <View>
      <Image source={require("../assets/map1.jpg")} 
      style={{width:"100%",height:200,marginTop:0,borderColor:'gray',borderWidth:1}} />
      <View style={{flexDirection:'row',marginTop:10}} >
      <Text style={{fontWeight:'600',marginLeft:15}} >Delivery: </Text>
        <Text style={{fontWeight:'600',color:'green'}}>  {date} -- {delivery}</Text>
      </View>
      <View style={[styles.divider,{marginTop:10,marginBottom:10}]} ></View>
      <View style={styles.item} >
      <Text style={{fontWeight:'bold',fontSize:18,marginBottom:20}} >Rider Details</Text>
      {trackDetails.length === 0
        ?
        <View styles={styles.emptyNoteContainer} >
          <Text style={styles.emptyNoteText} >There is no any Open Orders !!!</Text>
        </View>
        :
        trackDetails.map((item,index)=>{
          return <View key={index} >
            <View style={{flexDirection:'row',marginBottom:10}} >
            <Image source={{ uri: item.Rider.uri }} style={{width:80,height:80}} />
            <Text style={{width:130,marginLeft:10}} >Name: {item.Rider.Rider}</Text>
            <TouchableOpacity style={ [styles.button,{padding:10}]} onPress={triggerCall} >
                              <Icon
                    reverse
                    name='ios-call'
                    type='ionicon'
                    color='green'
                  />  
          </TouchableOpacity>
            
            </View>
            <View style={{height:40}} >
            <Text style={{width:200,marginLeft:90,marginTop:-70}} >Vehicle: {item.Rider.Vehicle}</Text>
            <Text style={{width:200,marginLeft:90}} >City: {item.Rider.City}</Text>
            </View>
            
             </View>
        })}
      </View>
    </View>
  )
}

export default Track

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
    width:325,
    marginLeft:15
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