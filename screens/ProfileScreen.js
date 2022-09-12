import { View, Text, TouchableOpacity, StyleSheet,FlatList,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React,{useState,useEffect} from 'react';
import Notes from '../components/Notes';
import AddNote from '../components/AddNote';
import DeleteNote from '../components/DeleteNote';
import Products from '../components/Products';
import AddProduct from '../components/AddProduct';
import EditProduct from '../components/EditProduct';

const Stack = createStackNavigator();

const ProfileScreen = () => {


  const[note,setNote] = useState();
  const[image,setImage] = useState(null);
  const[notes,setNotes] = useState([]);
  const[date,setDate] = useState(new Date().toUTCString());
  const[moveToBin,setMoveToBin] = useState([]);
  const[product,setProduct] = useState();
  const[products,setProducts] = useState([]);
  const[moveToBinProduct,setMoveToBinProduct] = useState([]);

  function handleNote(){
    let newNote = note;
    let newNotes = [newNote, ...notes];
    setNotes(newNotes);
    setNote('');
    setImage('');
  }

  function handleProduct(){
    let newProduct = product;
    let newProducts = [newProduct, ...products];
    setProducts(newProducts);
    setProduct('');
  }

  return(
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='Mart'>
            {props => <Notes {...props} moveToBin={moveToBin} setMoveToBin={setMoveToBin} notes={notes} setNotes={setNotes} note={note} setNote={setNote}
            date={date} setDate={setDate} />}
        </Stack.Screen>
        <Stack.Screen name='AddNote'>
            {props => <AddNote {...props} note={note} image={image} setImage={setImage} setNote={setNote} handleNote={handleNote} />}
        </Stack.Screen>
        <Stack.Screen name='DeleteNote'>
            {props => <DeleteNote {...props}
             moveToBin={moveToBin} setMoveToBin={setMoveToBin} notes={notes} setNotes={setNotes} date={date} />}
        </Stack.Screen>
        <Stack.Screen name='EditProducts'>
            {props => <EditProduct {...props} products={products} setProducts={setProducts} />}
        </Stack.Screen>
        <Stack.Screen name='Products'>
            {props => <Products {...props} moveToBin={moveToBin} setMoveToBin={setMoveToBin} notes={notes} setNotes={setNotes} note={note} setNote={setNote}
            date={date} setDate={setDate} product={product} setProduct={setProduct} products={products}
            setProducts={setProducts} moveToBinProduct={moveToBinProduct} setMoveToBinProduct={setMoveToBinProduct} />}
        </Stack.Screen>
        <Stack.Screen name='AddProduct'>
            {props => <AddProduct {...props} note={note} image={image} setImage={setImage} setNote={setNote} handleNote={handleNote}
            product={product} setProduct={setProduct} products={products}
            setProducts={setProducts} handleProduct={handleProduct} moveToBinProduct={moveToBinProduct} setMoveToBinProduct={setMoveToBinProduct} />}
        </Stack.Screen>
        
      </Stack.Navigator>
  )
  
};

export default ProfileScreen;