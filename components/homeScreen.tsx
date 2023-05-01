import AsyncStorage from '@react-native-async-storage/async-storage';
import react, { useEffect, useState } from 'react';
import {View,StyleSheet, Text, Button, TextInput, Alert, BackHandler, FlatList, TouchableOpacity} from 'react-native'
import { Card, Paragraph, Title } from 'react-native-paper';


export default function  HomeScreen({navigation}: {navigation: any}){

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () =>{ 
            alert();
            return true})
        return () => backHandler.remove()
      }, [])

      const Leavesdata = [
        {
            id:'1',
            name:'Leaves',
            des:'Leaves Data'

        },
        {
            id:'2',
            name:'Employee Data',
            des:'Employee info'
        },
        {
            id:'3',
            name:'Calendar',
            des:'Calendar Events Data'
        },
      ]
      
    return(
        <View style={Styles.container}>
        <FlatList style={{padding:20}}
        data={Leavesdata}
        keyExtractor={(item) => item.id}
        renderItem={(data) => 
            <View >
            <TouchableOpacity onPress={()=>{
                console.log(data.item.name)
                switch(data.item.name){
                case 'Leaves':
                    navigation.navigate('TotalLeaves');
                break;
                default:
                }

            }}>
            <Card style={{padding:30 , margin:20}}>
            <Card.Content>
                <Title>{data.item.name}</Title>
            </Card.Content>
            <Card.Cover source={require('../assets/leave.jpg')}   resizeMode='stretch'  />
           <Card.Content>
            <Paragraph>{data.item.des}</Paragraph>
            </Card.Content>
          </Card>
          </TouchableOpacity>
          </View>
        }
    />
    </View>
     
    )
}




const Styles = StyleSheet.create({
    container:{

        
    },
    card:{
        alignItems:'center',
        margin:10
    }
})

function alert(){
    Alert.alert(  
        'Exit App',  
        'Do you want to Exit',  
        [  
            {  
                text: 'Cancel',  
                onPress: () => console.log('Cancel Pressed'),  
                style: 'cancel',  
            },  
            {text: 'OK', onPress: () => BackHandler.exitApp()},  
        ]  
    );  
}