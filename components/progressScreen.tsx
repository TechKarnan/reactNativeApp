import React, { useEffect, useState } from "react";
import {Text, View,StyleSheet, TouchableOpacity, Modal, Image, TextInput, Alert, BackHandler} from 'react-native'
import * as Progress from 'react-native-progress';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from "@react-native-async-storage/async-storage";

export function ProgressScreen({navigation}: {navigation: any}){

 
    const [cl, setcl] = useState(0);
    const [sl, setsl] = useState(0);
    const [el, setel] = useState(0);
    const [totalcl, settotalcl] = useState(0);
    const [totalsl, settotalsl] = useState(0);
    const [totalel, settotalel] = useState(0);
    const [clpr, setclpr] = useState(0);
    const [slpr, setslpr] = useState(0);
    const [elpr, setelpr] = useState(0);


  
      
       
       let leaveFormat =[
        {
            id:'1',
            name:'Casual Leave Progress',
            applied:cl,
            total:totalcl,
            progress:cl?Math.floor(cl)/Math.floor(totalcl):0
           
        },
        {
            id:'2',
            name:'Sick Leave Progress',
            applied:sl,
            total:totalsl,
            progress:sl?Math.floor(sl)/Math.floor(totalsl):0
        },
        {
            id:'3',
            name:'Earned Leave Progress',
            applied:el,
            total:totalel,
            progress:el?Math.floor(el)/Math.floor(totalel):0
        },
    ]
    

    getAppliedLeaves('1')?.then((val:any)=>{
        setcl(val)
     })

     getAppliedLeaves('2')?.then((val:any)=>{
        setsl(val)
       
    })

    getAppliedLeaves('3')?.then((val:any)=>{
        setel(val)
    })

    getTotalLeaves('1')?.then((val:any)=>{
        settotalcl(val)
       
    })

    getTotalLeaves('2')?.then((val:any)=>{
        settotalsl(val)
    })

    getTotalLeaves('3')?.then((val:any)=>{
        settotalel(val)
    })

    
    return (
       
    <View style={styles.container}>
        {
           leaveFormat.map((val:any)=>{
                return ( 
                    <TouchableOpacity onPress={()=>{
                        (Math.floor(val.total)>Math.floor(val.applied))?navigation.navigate('DateScreen',{id:val.id}):alert();
                    }} key={val.id}>
                    <View  style={styles.card}>
                    <Text style={styles.title}>{val.name}</Text>   
                    <Progress.Bar progress={val.progress} width={200} color={val.progress>0.8?"red":"blue"} />
                    <View style={styles.carddes}>
                        <Text style={styles.carsdestext}>Total Days:{val.total}</Text>
                        <Text style={styles.carsdestext}>Days Applied:{val.applied}</Text>
                    </View>
                </View> 
                </TouchableOpacity>

                )
            })
        }


    </View>

    )

}




function getAppliedLeaves(type:string)
{
    switch(type){
        case '1':
           return AsyncStorage.getItem("appliedCL");
   
        case'2':
        return AsyncStorage.getItem("appliedSL");
   
        case '3':
            return AsyncStorage.getItem("appliedEL");
        default:
    }

}

function getTotalLeaves(type:string)
{
    switch(type){
        case '1':
           return AsyncStorage.getItem("cl");
        case'2':
        return AsyncStorage.getItem("sl");
   
        case '3':
            return AsyncStorage.getItem("el");
        default:
    }

}

function alert(){
    Alert.alert(  
        'Leaves are Complete',  
        'No Available Leaves',  
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


const styles = StyleSheet.create(
    {
        container:{
            display:"flex",
        },
        title:{
            fontWeight:"bold",
            margin:"10%",
            marginTop:"2%"
            
        },
        datetitle:{
            fontWeight:"bold",
            margin:"10%",
            marginTop:"2%",
            alignItems:"center",
            textAlign:"center",
            fontSize:20
            
        },
        card:{
            height:200,
            width:"94%",
            backgroundColor:"#d7d7d8",
            margin:10,
            borderRadius:20,
            justifyContent:"center",
            alignItems:"center"
        },
        calendar:{
            height:50,
            width:50
        },
        calcontainer:{
            display:"flex",
            flexDirection:"row"

        },
        caltext:{
            fontSize:20,
            borderWidth:1,
            borderRadius:10,
            margin:5,
            width:"70%"
        },
        daytext:{
            fontSize:20,
            borderRadius:10,
            margin:5,
            width:"70%"
        },
        carddes:{
            display:"flex",
            flexDirection:"row", 
        },
        carsdestext:{
            margin:50
        }

    


    }
)