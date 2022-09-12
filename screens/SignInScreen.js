import React,{useState,useContext} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Platform,
    StyleSheet ,
    StatusBar,
    Alert
} from 'react-native';

import { useTheme } from 'react-native-paper';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { AuthContext } from '../components/AuthProvider';

const SignInScreen = ({navigation}) => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState()

    const { colors } = useTheme();
    const {login} = useContext(AuthContext);

    
    return (
      <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.text_header}>Welcome!</Text>
        </View>
        <View style={styles.bottom} >
        <View style={styles.form} >
        <Text style={{fontSize:18}} >E-mail</Text>
        <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Text style={{fontSize:18}} >Password</Text>
      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />
      
      <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
        <Text style={{color:'#009387',fontWeight:'bold'}}>Forgot Password?</Text>
      </TouchableOpacity>

      <View style={{marginTop:30}} >
      <FormButton
        buttonTitle="Sign In"
        onPress={() => login(email, password)}
      />
      
      <TouchableOpacity 
      style={styles.buttonContainer}
      onPress={() => navigation.navigate('SignUpScreen')}>
      <Text style={styles.buttonText}>Sign Up</Text>
    </TouchableOpacity>
      </View>
      </View>
      </View>
      </View>
    );
};

export default SignInScreen;

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
