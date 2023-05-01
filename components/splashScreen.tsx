import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import react, { useState ,useEffect } from 'react';
import {StyleSheet, Text, View , Image} from 'react-native'
import HomeScreen from './homeScreen';
import ProductsScreen from './ProductsScreen';
import CartScreen from './cartScreen';
import { Register } from './register';
import { Login } from './login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TotalLeaves } from './totalLeaves';




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
        {Screen ? <Stack.Screen name="splash" component={Splash} options={{
            headerShown:false
        }}/>:null}
        {login ?<Stack.Screen name="home" component={HomeScreen} /> :null}
        
        <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="products" component={ProductsScreen} />
        <Stack.Screen name="carts" component={CartScreen} />
        {/* {login ?<Stack.Screen name="homeScreen" component={HomeScreen} /> :null} */}
        <Stack.Screen name="homeScreen" component={HomeScreen} options={{
             headerLeft:()=><Text></Text>,
             gestureEnabled: false,
        }}/>
        <Stack.Screen name="TotalLeaves" component={TotalLeaves} />
      </Stack.Navigator>
        </NavigationContainer>
    );
}

async function checkLogin(){
    
     return await AsyncStorage.getItem('username')
    
}

export  function Splash({navigation}: {navigation: any}){
    return(

       <View style={style.container}>
        <Image source={require("../assets/app.png")} style={style.image}></Image>
        <Text style={style.text} >Phone Book</Text>
       </View>
    )
    
}


const style = StyleSheet.create(
    {
    container:{
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        
    },
    text:{
        alignItems:'center',
        justifyContent:'center',
        fontWeight:'bold',
        textAlign:'center',
        margin:30
        
    },
    image:{
        height:200,
        width:200,   
    }

    }
);