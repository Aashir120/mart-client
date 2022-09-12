/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

 import React, { useEffect,useContext,useState } from 'react';
 import { View, ActivityIndicator } from 'react-native';
 import { 
   NavigationContainer, 
   DefaultTheme as NavigationDefaultTheme,
   DarkTheme as NavigationDarkTheme
 } from '@react-navigation/native';
 import { createDrawerNavigator } from '@react-navigation/drawer';
 
 import { 
   Provider as PaperProvider, 
   DefaultTheme as PaperDefaultTheme,
   DarkTheme as PaperDarkTheme 
 } from 'react-native-paper';
 
 import { DrawerContent } from './screens/DrawerContent';
 
 import MainTabScreen from './screens/MainTabScreen';
 import SupportScreen from './screens/SupportScreen';
 import SettingsScreen from './screens/SettingsScreen';
 import BookmarkScreen from './screens/BookmarkScreen';
 import auth from '@react-native-firebase/auth';
 import {AuthContext } from './components/AuthProvider';
 
 import RootStackScreen from './screens/RootStackScreen';
 
 const Drawer = createDrawerNavigator();
 
 const Routes = () => {
   const {user, setUser} = useContext(AuthContext);
   const [initializing, setInitializing] = useState(true);
 
   const onAuthStateChanged = (user) => {
     setUser(user);
     if (initializing) setInitializing(false);
   };
 
   useEffect(() => {
     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
     return subscriber; // unsubscribe on unmount
   }, []);
 
   const [isDarkTheme, setIsDarkTheme] = React.useState(false);
 
   const CustomDefaultTheme = {
     ...NavigationDefaultTheme,
     ...PaperDefaultTheme,
     colors: {
       ...NavigationDefaultTheme.colors,
       ...PaperDefaultTheme.colors,
       background: '#ffffff',
       text: '#333333'
     }
   }
   
   const CustomDarkTheme = {
     ...NavigationDarkTheme,
     ...PaperDarkTheme,
     colors: {
       ...NavigationDarkTheme.colors,
       ...PaperDarkTheme.colors,
       background: '#333333',
       text: '#ffffff'
     }
   }
 
   const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;
 
   
   const authContext = React.useMemo(() => ({
     toggleTheme: () => {
       setIsDarkTheme( isDarkTheme => !isDarkTheme );
     }
   }), []);
   if( initializing ) {
     return(
       <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
         <ActivityIndicator size="large"/>
       </View>
     );
   }
   return (
     <PaperProvider theme={theme}>
     <NavigationContainer theme={theme}>
       { user ? (
         <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
           <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
           <Drawer.Screen name="SupportScreen" component={SupportScreen} />
           <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
           <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
         </Drawer.Navigator>
       )
     :
       <RootStackScreen/>
     }
     </NavigationContainer>
     </PaperProvider>
   );
 }
 
 export default Routes;
 