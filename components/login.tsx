import { useState } from "react";
import { Alert, Button, TextInput, View ,} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Login({navigation}: {navigation: any}){
    const [username , setUserName]=useState("");
    const [password , setPassword]=useState("");
    return(
        <View>
            <TextInput placeholder="UserName" onChangeText={(value)=>setUserName(value)}></TextInput>
            <TextInput placeholder="Password" onChangeText={(value)=>setPassword(value)}></TextInput>
            <Button title="Login" onPress={async ()=>{
                if((username == await AsyncStorage.getItem('username')) && (password == await AsyncStorage.getItem('password'))){
                    
                    navigation.navigate('homeScreen');
                   
                }else{
                    alert();
                }
            }}></Button>
        </View>
    )
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