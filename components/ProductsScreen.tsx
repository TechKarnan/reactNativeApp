import react from 'react';
import {View,StyleSheet, Text, Button} from 'react-native'


export default function  ProductsScreen({navigation}: {navigation: any}){

    return(
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to Products Screen...!</Text>
            <Button title='Carts Page>>' onPress={()=>navigation.navigate('carts')}></Button>
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