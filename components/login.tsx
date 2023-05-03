import { useEffect, useState } from "react";
import { Alert, Button, TextInput, View ,} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Login({navigation}: {navigation: any}){
    const [username , setUserName]=useState("");
    const [password , setPassword]=useState("");
    const [dbusername , setdbusername]=useState("");
    const [dbpassword , setdbpassword]=useState("");
    useEffect(()=>{
        getUsername().then((user:any)=>{
            setdbusername(user.trim())
        })
    
        getpassword().then((pwd:any)=>{
            setdbpassword(pwd.trim())
        })
    },[])
   
    return(
        <View>
            <TextInput placeholder="UserName" onChangeText={(value)=>setUserName(value.trim())}></TextInput>
            <TextInput placeholder="Password" onChangeText={(value)=>setPassword(value.trim())}></TextInput>
            <Button title="Login" onPress={()=>{   
                console.log("db username:"+dbusername)
                console.log("db password:"+dbpassword)
                if(dbpassword == password && dbusername== username)
                {
                    navigation.navigate('home');
                }else{
                    alert();
                }  
            }}></Button>
        </View>
    )
}



function getUsername(){
    return AsyncStorage.getItem('username')
}

function getpassword(){
    return AsyncStorage.getItem('password')
}

function alert(){
    Alert.alert(  
        'Invalid Credentials',  
        'Username or Password invalid',  
        [  
            {  
                text: 'Cancel',  
                onPress: () => console.log('Cancel Pressed'),  
                style: 'cancel',  
            },  
            {text: 'OK', onPress: () => console.log('OK Pressed')},  
        ]  
    );  
}