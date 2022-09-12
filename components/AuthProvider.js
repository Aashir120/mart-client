import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import SweetAlert from 'react-native-sweet-alert';
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          if (email === undefined || password === undefined){
            SweetAlert.showAlertWithOptions({
              title: 'Please Enter Email and Password',
              subTitle: 'Fields cannot be empty!',
              confirmButtonTitle: 'OK',
              confirmButtonColor: '#000',
              otherButtonTitle: 'Cancel',
              style: 'error',
              cancellable: true
            })
          } else{
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
            if (e.code === 'auth/user-not-found' || e.code === 'auth/wrong-password') {
              SweetAlert.showAlertWithOptions({
                title: 'Incorrect Username or Password',
                subTitle: 'Please Try Again!',
                confirmButtonTitle: 'OK',
                confirmButtonColor: '#000',
                otherButtonTitle: 'Cancel',
                style: 'error',
                cancellable: true
              })
              
            }
        
            if (e.code === 'auth/invalid-email') {
              console.log('');
              SweetAlert.showAlertWithOptions({
                title: 'That email address is invalid!',
                subTitle: 'Please Try Again!',
                confirmButtonTitle: 'OK',
                confirmButtonColor: '#000',
                otherButtonTitle: 'Cancel',
                style: 'error',
                cancellable: true
              })
            }
          }
        }},
        register: async (email, password,name) => {
          if (email === undefined || password === undefined || name === undefined){
            SweetAlert.showAlertWithOptions({
              title: 'Please Enter Email and Password',
              subTitle: 'Fields cannot be empty!',
              confirmButtonTitle: 'OK',
              confirmButtonColor: '#000',
              otherButtonTitle: 'Cancel',
              style: 'error',
              cancellable: true
            })
          } else{
          try {
            await auth().createUserWithEmailAndPassword(email, password)
            .then(function(result) {
              return result.user.updateProfile({
                displayName: name
              })
            });

          } catch (e) {
            console.log(e);
          }
        }},
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};