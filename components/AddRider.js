import { View, Text,StyleSheet, Button, KeyboardAvoidingView,Keyboard,Image, ScrollView, TextInput,TouchableOpacity, Alert } from 'react-native'
import React,{useState} from 'react'
import * as Style from '../assets/styles';
import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport';
import database from '@react-native-firebase/database';
import * as ImagePicker from 'react-native-image-crop-picker'
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';
import DropDownPicker from 'react-native-dropdown-picker';

const AddRider = ({navigation, ...props}) => {

  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [uriImage,setUri] = useState(null); 
  const[city,setCity] = useState();
  const[contact,setContact] = useState();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [vehicle, setVehicle] = useState([
    {label: 'Motor-Bike', value: 'Motor-Bike'},
    {label: 'Mini-Car', value: 'Mini-Car'},
    {label: 'Van', value: 'Van'},
    {label: 'Truck', value: 'Truck'}
  ]);
  

  function createRider(){

    let newNote = props.rider
    database().ref("Rider").child(`${newNote}`).set({
      Rider:newNote,
      uri:uriImage,
      Contact:contact,
      City:city,
      Vehicle:value
    });
    props.setRider(newNote)

  }
  const options = {
    maxWidth: 2000,
    maxHeight: 2000,
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };

  const pickImageAndUpload = ()=>{
    ImagePicker.openPicker({
      options:options,
      width: 300,
      height: 400,
      cropping: true
    }).then(response => {
        const source = { uri: response.path };
        //console.log(response);
        props.setImage(source);
    }).catch(err=>{alert(err)});
}
const uploadImage = async () => {
  const { uri } = props.image;
  const filename = uri.substring(uri.lastIndexOf('/') + 1);
  const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
  setUploading(true);
  setTransferred(0);
  const task = storage()
    .ref(filename)
    .putFile(uploadUri);
  // set progress state
  task.on('state_changed', snapshot => {
    setTransferred(
      Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
    );
  });
  try {
    await task;
  } catch (e) {
    console.error(e);
  }
  setUploading(false);
  Alert.alert(
    'Photo uploaded!',
    'Your photo has been uploaded to Firebase Cloud Storage!'
  );
  task.snapshot.ref.getDownloadURL().then((downloadURL) => {
    setUri(downloadURL);
    });
  props.setImage(null);
};

  return (
    <ScrollView>
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      behavior='padding'>
         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{padding:20,justifyContent:'space-around'}} >
            <TextInput style={[styles.input]} placeholder='Name Here...'
            multiline={true}
            value={props.rider} onChangeText={(text)=>props.setRider(text)} />
            <TextInput style={[styles.input]} placeholder='Contact Here...'
            multiline={true}
            value={contact} onChangeText={(text)=>setContact(text)} />
            <TextInput style={[styles.input]} placeholder='City Here...'
            multiline={true}
            value={city} onChangeText={(text)=>setCity(text)} />
           
            <Button
                mode="contained"
                onPress={()=>pickImageAndUpload()}
                title="Press Me"
                ></Button>
                <View style={styles.imageContainer}>
        {props.image !== null ? (
          <Image source={{ uri: props.image.uri }} style={styles.imageBox} />
        ) : null}
        {uploading ? (
          <View style={styles.progressBarContainer}>
            <Progress.Bar progress={transferred} width={300} />
          </View>
        ) : (
          <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
            <Text style={styles.buttonText}>Upload image</Text>
          </TouchableOpacity>
        )}
      </View>
      <DropDownPicker
                open={open}
                value={value}
                items={vehicle}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setVehicle}
                listMode="SCROLLVIEW"
              />
            <TouchableOpacity style={styles.button} onPress={()=>{
              if(props.rider === ''){
                Alert.alert('Please type something')
              } else{
                props.handleNote();
                navigation.navigate('Rider');

              }

              createRider()
            }}>
              
              <Text style={styles.buttonText} >Add</Text>
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
    shadowColor:Style.color,
    shadowOpacity:0.4,
    shadowOffset:{width:0,height:4},
    shadowRadius:8,
    elevation:5,
    backgroundColor:'white',
    borderColor:Style.color,
    borderWidth:2,
    borderRadius:5,
    height:100
  },
  button:{
    backgroundColor:Style.color,
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

export default AddRider