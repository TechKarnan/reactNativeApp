import react, { useState } from 'react';
import {View,StyleSheet, Text, Button, TextInput, Alert} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';


export function Register({navigation}: {navigation: any}){
    const [username , setUserName]=useState("");
    const [password , setPassword]=useState("");
    const [confpassword , setConfPassword]=useState("");
    return (
        <View style={styles.container}>
        <Text style={styles.text}>Welcome to home Screen...!</Text>
        <TextInput placeholder='username' onChangeText={(value)=> setUserName(value)}></TextInput>
        <TextInput placeholder='password' secureTextEntry={true} onChangeText={(value)=> setPassword(value)}></TextInput>
        <TextInput placeholder='Confirm password' secureTextEntry={true} onChangeText={(value)=> setConfPassword(value)}></TextInput>
        <Button title='Register' onPress={()=>{
            console.log(password);
            console.log(confpassword)
            if(password == confpassword){
            AsyncStorage.setItem('username', username);
            AsyncStorage.setItem('password', password); 
            navigation.navigate('login')
            }else{
                alert();
            }
        }}></Button>
        <Button title='Products Page>>' onPress={()=>navigation.navigate('products')}></Button>
        </View>
    )
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