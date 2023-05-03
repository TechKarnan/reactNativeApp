import AsyncStorage from '@react-native-async-storage/async-storage';
import react, { useEffect, useState } from 'react';
import {View,StyleSheet, Text, Button, TextInput, Alert, BackHandler, FlatList, TouchableOpacity, Image} from 'react-native'



export default function  HomeScreen({navigation}: {navigation: any}){

    useEffect(() => {

         getName().then((val:any)=>{
            setname(val);
         })

         navigation.addListener('beforeRemove', (e:any) => {
            e.preventDefault();
            alert()
            return
        }),
        [navigation]
        
      }, [])


      const [name, setname] = useState('');
      

      const Leavesdata = [
        {
            id:'1',
            name:'Leaves',
            des:'',
            url:require('../assets/leave.png')

        },
        {
            id:'2',
            name:'Employee Data',
            des:'coming soon ..!',
            url:require('../assets/data.png')
        },
        {
            id:'3',
            name:'Calendar',
            des:'coming soon ..!',
            url:require('../assets/cal.png')
            
        },
      ]
       
      
    return(
        <View>
        <View>
    <Text style={Styles.title}>{"Welcome "+name+"..!"}</Text>
    </View>
        <View style={Styles.container}>
    {Leavesdata.map((val)=>{
           return(
            <View style={Styles.card} key={val.id}>
           <TouchableOpacity onPress={()=>{
            
            switch(val.id){
                case '1':{
                    getTotalLeaves().then((val:any)=>{
                        console.log("total >>>>"+val)
                        if(val)
                        {
                            navigation.navigate('ProgressScreen');
                        }else{
                            navigation.navigate('TotalLeaves');
                        }
                     }) 
                  
                }
                    break;
                case '3':
                    break
                case '2':
                    break;
                default:
                    
            }
           }} >
          
            <Text style={Styles.text}>{val.name}</Text>
            <Image source={val.url} style={Styles.image}/>
            <Text style={Styles.text}>{val.des}</Text>
          
            </TouchableOpacity>
            </View>
            )
    })}
 {/* <Button title='Clear' onPress={()=>{
    AsyncStorage.clear();
 }}></Button> */}
    </View>
    </View>
     
    )
}

const Styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        flex:1,
       
        
    },
    card:{
      height:210,
      width:150,
      backgroundColor:'#d7d7d8',
      borderRadius:10,
      margin:"4%",
      
      
    },
    text:{
        textAlign:'center',
        fontFamily:'',
        fontWeight:'bold',
        padding:5
    },
    image:{
        height:100,
        width:100,
        margin:"16%"
    },
    title:{
        textAlign:'center',
        margin:10,
        fontWeight:'bold'
        
    }
})

function getName(){
    return AsyncStorage.getItem("name"); 
}

function getTotalLeaves(){
    return AsyncStorage.getItem('totalleave');
}


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