import react from 'react';
import {View,StyleSheet, Text} from 'react-native'


export default function  CartScreen({navigation}: {navigation: any}){

    return(
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to home Screen...!</Text></View>
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