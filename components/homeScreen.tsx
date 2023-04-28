import AsyncStorage from '@react-native-async-storage/async-storage';
import react, { useState } from 'react';
import {View,StyleSheet, Text, Button, TextInput, Alert} from 'react-native'


export default function  HomeScreen({navigation}: {navigation: any}){

    return(
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to home Screen...!</Text>
            <Button title='Products Page>>' onPress={()=>navigation.navigate('products')}></Button>
            <Button title='Clear' onPress={()=>{AsyncStorage.removeItem('username')}
        }></Button>
            </View>
    )
}




const styles = StyleSheet.create({
text:{
    textAlign:'center'
},
container:{
    justifyContent:'center'
}
})