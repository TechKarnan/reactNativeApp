import react, { useEffect, useState } from 'react';
import {View,StyleSheet, Text, Button, TextInput, Alert} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';


export function Register({navigation}: {navigation: any}){
    const [name , setName]=useState("");
    const [username , setUserName]=useState("");
    const [password , setPassword]=useState("");
    const [confpassword , setConfPassword]=useState("");

    const [login , setLogin] = useState(false);
    useEffect(()=>{
       

    let res = checkLogin();
   res.then((data:any)=>{
    console.log(data)
    if(data != null)
    navigation.navigate('home')
   })
    },[])

    return (
        <View style={styles.container}>
        <TextInput placeholder='Name' onChangeText={(value)=> setName(value)}></TextInput>
        <TextInput placeholder='username' onChangeText={(value)=> setUserName(value)}></TextInput>
        <TextInput placeholder='password' secureTextEntry={true} onChangeText={(value)=> setPassword(value)}></TextInput>
        <TextInput placeholder='Confirm password' secureTextEntry={true} onChangeText={(value)=> setConfPassword(value)}></TextInput>
        <Button title='Register' onPress={()=>{
            console.log(password);
            console.log(confpassword)
            if(password == confpassword){
            AsyncStorage.setItem('username', username);
            AsyncStorage.setItem('password', password); 
            AsyncStorage.setItem('name', name); 
            navigation.navigate('login')
            }else{
                alert();
            }
        }}></Button>
        </View>
    )
}

async function checkLogin(){
    
    return await AsyncStorage.getItem('username')
   
}

function alert(){
    Alert.alert(  
        'Password Mismatch',  
        'check the password and try again...!',  
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

const styles = StyleSheet.create({
    text:{
        textAlign:'center'
    },
    container:{
        justifyContent:'center'
    }
    })