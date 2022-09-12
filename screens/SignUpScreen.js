import React,{useState,useContext} from 'react';
import { 
    View, 
    Text, 
    Button, 
    TouchableOpacity, 
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar
} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import {AuthContext} from '../components/AuthProvider';

const SignUpScreen = ({navigation}) => {

    const [userName, setUserName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const {register} = useContext(AuthContext);

    return (
      <ScrollView style={{marginBottom:30}} >
      <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.text_header}>Register Now!</Text>
        </View>
        
        <View style={styles.bottom} >
        <View style={styles.form} >
        <Text style={{fontSize:16}} >User Name</Text>
        <FormInput
        labelValue={userName}
        onChangeText={(userName) => setUserName(userName)}
        placeholderText="User Name"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
        <Text style={{fontSize:16}} >E-mail</Text>
        <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

<Text style={{fontSize:16}} >Password</Text>
      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />

<Text style={{fontSize:16}} >Confirm Password</Text>
      <FormInput
        labelValue={confirmPassword}
        onChangeText={(userPassword) => setConfirmPassword(userPassword)}
        placeholderText="Confirm Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormButton
        buttonTitle="Sign Up"
        onPress={() => register(email, password,userName)}
      />
      
      <TouchableOpacity 
      style={styles.buttonContainer}
      onPress={() => navigation.goBack()}>
      <Text style={styles.buttonText}>Sign In</Text>
    </TouchableOpacity>
      </View>
      </View>
      
      </View>
      </ScrollView>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#009387'
  },
  header: {
      flex: 1,
      paddingVertical:80,
      paddingHorizontal: 20,
      paddingBottom: 10
  },
  footer: {
      flex: 3,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
  },
  text_header: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 30
  },
  text_footer: {
      color: '#05375a',
      fontSize: 18
  },
  action: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5
  },
  actionError: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FF0000',
      paddingBottom: 5
  },
  textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#05375a',
  },
  errorMsg: {
      color: '#FF0000',
      fontSize: 14,
  },
  button: {
      alignItems: 'center',
      marginTop: 50
  },
  signIn: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
  },
  textSign: {
      fontSize: 18,
      fontWeight: 'bold'
  },
  bottom:{
    flex:7,
    backgroundColor:'#fff',
    borderTopStartRadius:30,
    borderTopEndRadius:30
  },
  form:{
    marginTop:50,
    paddingHorizontal:20
  },
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    height: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor:'#fff',
    borderColor:'#009387',
    borderWidth:1,
    color:'#009387'
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#009387',
    fontFamily: 'Lato-Regular',
  },
  });
