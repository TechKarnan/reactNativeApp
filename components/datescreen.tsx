import React, { useEffect, useState } from "react";
import {Text, View,StyleSheet, TouchableOpacity, Modal, Image, TextInput ,Button, Alert} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from "@react-native-async-storage/async-storage";



export function DateScreen( props:any ){

    const [isDisplayfrmDate, setfrmShow] = useState(false);
    const [isDisplaytoDate, settoShow] = useState(false);
    const [mydate, setDate] = useState(new Date());
    const [frmdatetext, setfrmdatetext]= useState('');
    const [todatetext, settodatetext] = useState('');
    const [todate, settodate] = useState(0);
    const [frmdate, setfrmdate] = useState(0);
    const [days, setdays] = useState(0);
    const [screen, setscreen] = useState('');
    const [apply, setapply] = useState(false);
    



    

    useEffect(() => {
       setfrmdatetext(mydate.toLocaleDateString());
       settodatetext(mydate.toLocaleDateString());
       setscreen(props.route.params.id);
        console.log(props.route.params.id)
      }, [])
      
   
  
    return(
        
        <View>
        <View><Text style={styles.datetitle}>Select Date</Text></View>
        <View>
            
            <View style={styles.calcontainer}>
            <Text style={styles.caltext}>Select To Date :</Text>
            <Text style={styles.caltext}>{todatetext}</Text>
            <TouchableOpacity onPress={()=>{settoShow(true)}}>
                <Image source={require("../assets/cal.png")}  style={styles.calendar}></Image>
            </TouchableOpacity>
            </View>
            <View style={styles.calcontainer}>
                <Text style={styles.caltext} >Select From Date :</Text>
                <Text style={styles.caltext}>{frmdatetext}</Text>
                <TouchableOpacity onPress={()=>{setfrmShow(true)}}>
                <Image source={require("../assets/cal.png")}  style={styles.calendar}></Image>
                </TouchableOpacity>
            </View>
            <View style={styles.calcontainer}>
            <Text style={styles.daytext} >No Of Days:</Text>
            <Text  style={styles.daytext}>{days+1}</Text>
            </View>
        </View>


        {isDisplayfrmDate && (
            <DateTimePicker
               value={mydate}
               mode='date'
               is24Hour={true}
               display="default"
               onChange={(val)=>{
               setfrmShow(false)


                let timestamp:any = val.nativeEvent.timestamp
                
                let from = new Date(timestamp)
                setfrmdatetext(from.toLocaleDateString());
                setfrmdate(timestamp);
                let to = new Date(todate)

                if(to.getTime()<from.getTime()){
                    alert();
                    setapply(true)
                }else{
                    setapply(false)
                }

                let diff = to.getTime()-from.getTime();
                let Difference_In_Days = diff / (1000 * 3600 * 24);
                console.log(Difference_In_Days)
                setdays(Difference_In_Days);   
               }}
               onTouchCancel={()=>{
                console.log("cancel")
               }}
            />
         )}
         {isDisplaytoDate && (
            <DateTimePicker
               value={mydate}
               mode='date'
               is24Hour={true}
               display="default"
               onChange={(val)=>{
                settoShow(false)
                let timestamp:any = val.nativeEvent.timestamp

                


                settodate(timestamp)
                let to = new Date(timestamp)
                settodatetext(to.toLocaleDateString());

                let from = mydate
                setfrmdatetext(from.toLocaleDateString());

                if(to.getTime()<from.getTime()){
                    alert();
                    setapply(true)
                }else{
                    setapply(false)
                }

                let diff = to.getTime()-from.getTime();
                let Difference_In_Days = diff / (1000 * 3600 * 24);
                console.log(Difference_In_Days)
                setdays(Difference_In_Days);
               }}
               
            />
         )}

         <View style={styles.buttoncontainer}>
            <TouchableOpacity disabled={apply} onPress={()=>{
                applyLeave(screen,days)
                props.navigation.navigate('home');
            }}>
            <Text style={styles.buttontext}>Apply</Text>
            </TouchableOpacity>
         </View>

         <View style={styles.buttoncontainer}>
            <TouchableOpacity onPress={()=>{
               Alert.alert(  
                'Do you Clear Applied Leaves ?',  
                'Please confirm',  
                [  
                    {  
                        text: 'Cancel',  
                        onPress: () => {
                            
                    },  
                        style: 'cancel',  
                    },  
                    {text: 'OK', onPress: () => 
                {
                    switch(screen){
                        case '1': {
                            AsyncStorage.removeItem("appliedCL");
                            props.navigation.navigate('home');
                            
                        }
                        break;
                        case '2':
                            {AsyncStorage.removeItem("appliedSL");
                            props.navigation.navigate('home');
                            
                        }
                        break;
                        case '3':{
                            AsyncStorage.removeItem("appliedEL");
                            props.navigation.navigate('home');
                            
                        }
                        default:
                    }
                    
                }},  
                ]  
            ); 
               
            
            }}>
            <Text style={styles.clearbuttontext}>Clear All</Text>
            </TouchableOpacity>
         </View>
        </View>
        

    )
} 


function applyLeave(type:string , days:number){
    switch(type){
        case '1':{
            console.log("cl days:"+days)
            AsyncStorage.getItem("appliedCL").then(
                (val:any)=>{
                    if(val){
                        let num = days+Math.floor(val);
                        AsyncStorage.getItem("cl").then((val:any)=>{
                            console.log("total cl:"+Math.floor(val))
                            console.log("applied cl:"+num)
                            if(Math.floor(val)>=num){
                                AsyncStorage.setItem("appliedCL",num.toString())
                                
                            }else{
                                limitalert();

                               
                            }
                        })
                         
                    }else{
                        AsyncStorage.setItem("appliedCL",days.toString()) 
                        
                    }
                }
            )
        }
            break;
        case '2':{

            AsyncStorage.getItem("appliedSL").then(
                (val:any)=>{
                    if(val){
                        let num = days+Math.floor(val);
                        AsyncStorage.getItem("sl").then((val:any)=>{
                            if(Math.floor(val)>=num){
                                AsyncStorage.setItem("appliedSL",num.toString())
                                
                            }else{
                                limitalert();
                                
                            }
                        })
                    }else{
                        AsyncStorage.setItem("appliedSL",days.toString()) 
                    
                    }
                }
            )
           
        }
            break;
        case '3':{
            AsyncStorage.getItem("appliedEL").then(
                (val:any)=>{
                    if(val){
                        let num = days+Math.floor(val);
                        AsyncStorage.getItem("el").then((val:any)=>{
                            if(Math.floor(val)>=num){
                                AsyncStorage.setItem("appliedEL",num.toString())
                                
                            }else{
                                limitalert();
                                
                            }
                        })
                    }else{
                        AsyncStorage.setItem("appliedEL",days.toString()) 
                      
                    }
                }
            )
          
        }
            break;
        default:
    }
    
}

function alert(){
    Alert.alert(  
        'Invalid Date',  
        'Please check the date',  
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

function limitalert(){
    Alert.alert(  
        'Invalid Date',  
        'Crossed Maximum days',  
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
       
        datetitle:{
            fontWeight:"bold",
            margin:"10%",
            marginTop:"2%",
            alignItems:"center",
            textAlign:"center",
            fontSize:20
            
        },
        calendar:{
            height:50,
            width:50
        },
        calcontainer:{
            display:"flex",
            flexDirection:"row",

        },
        caltext:{
            fontSize:15,
            
            borderRadius:10,
            margin:5,
            width:"35%"
        },
        daytext:{
            fontSize:20,
            margin:5,  
        },
        buttontext:{
            borderRadius:10,
            textAlign:"center",
            backgroundColor:"#00aeff",
            width:200,
            height:40,
            fontSize:20,
            padding:5,
            color:"white"
            
           
        },
        buttoncontainer:{
            alignItems:"center",
            margin:20 
        },
        clearbuttontext:{
            borderRadius:10,
            textAlign:"center",
            backgroundColor:"#e4002b",
            width:200,
            height:40,
            fontSize:20,
            padding:5,
            color:"white"
  
        },


    }
)