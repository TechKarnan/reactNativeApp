import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import react, { useState ,useEffect } from 'react';
import {StyleSheet, Text, View , Image} from 'react-native'
import HomeScreen from './homeScreen';
import { Register } from './register';
import { Login } from './login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TotalLeaves } from './totalLeaves';
import { ProgressScreen } from './progressScreen';
import { DateScreen } from './datescreen';





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
    console.log("login"+login)
    return(
        <NavigationContainer>
             <Stack.Navigator>
       {/* {Screen ? <Stack.Screen name="splash" component={Splash} options={{
            headerShown:false
        }}/>:null}

{login ?<Stack.Screen name="homeScreen" component={HomeScreen} options={{
             headerLeft:()=><Text></Text>,
             gestureEnabled: false,
             title:'Home'
        }}/> :<Stack.Screen name="register" component={Register} />} */}

        {Screen ? <Stack.Screen name="splash" component={Splash} options={{
            headerShown:false
        }}/>:null}
        {!login?<Stack.Screen name="register" component={Register} />:null}
        {!login?<Stack.Screen name="login" component={Login} />:null}
        <Stack.Screen name="home" component={HomeScreen} options={{
             headerLeft:()=><Text></Text>,
             gestureEnabled: false,
             title:'Home'
        }}/>
        <Stack.Screen name="TotalLeaves" component={TotalLeaves} />
        <Stack.Screen name="ProgressScreen" component={ProgressScreen} options={{
            title:"Leaves data"
        }}/>
        <Stack.Screen name="DateScreen" component={DateScreen}  options={{
            title:"Date Selection"
        }}/>
      
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
        <Image source={require("../assets/image.png")} style={style.image}></Image>
        <Text style={style.text} >Phone Book</Text>
        <View>
            <Text>Version 1.0</Text>
        </View>
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