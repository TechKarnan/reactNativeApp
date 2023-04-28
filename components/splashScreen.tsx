import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import react, { useState ,useEffect } from 'react';
import {StyleSheet, Text, View} from 'react-native'
import HomeScreen from './homeScreen';
import ProductsScreen from './ProductsScreen';
import CartScreen from './cartScreen';
import { Register } from './register';
import { Login } from './login';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Stack = createNativeStackNavigator();

export function SplashScreen(){
    const [Screen , setScreen] = useState(true);
    const [login , setLogin] = useState(false);
    useEffect(()=>{
        setTimeout(() => {
            setScreen(false);
        }, 2000);

    let res = checkLogin();
   res.then((data)=>{
    console.log(data)
    if(data != null)
    setLogin(true)
   })
    


    })
    return(
        <NavigationContainer>
            <Stack.Navigator  initialRouteName="splash">
        {Screen ? <Stack.Screen name="splash" component={Splash} />:null}
        {login ?<Stack.Screen name="home" component={HomeScreen} /> :null}
        
        <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="products" component={ProductsScreen} />
        <Stack.Screen name="carts" component={CartScreen} />
        <Stack.Screen name="homeScreen" component={HomeScreen} />
      </Stack.Navigator>
        </NavigationContainer>
    );
}

async function checkLogin(){
    
     return await AsyncStorage.getItem('username')
    
}

export  function Splash({navigation}: {navigation: any}){
    return(

       <View>
        <Text>Welcome to splash Screen ...!</Text>
       </View>
    )
    
}


const style = StyleSheet.create(
    {
    container:{
        textAlign:'center'
    }

    }
);