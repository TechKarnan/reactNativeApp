import AsyncStorage from '@react-native-async-storage/async-storage';
import react, { useState } from 'react'
import {Button, View} from 'react-native'
import { TextInput } from 'react-native-paper'

export function TotalLeaves({navigation}: {navigation: any}){

const[cl , setcl] = useState('');
const[sl , setsl] = useState('');
const[el , setel] = useState('');

return(
    <View>
        <TextInput placeholder='Casual Leave' keyboardType='number-pad' onChangeText={(val)=>setcl(val)}></TextInput>
        <TextInput placeholder='Sick Leave' keyboardType='number-pad'onChangeText={(val)=>setsl(val)} ></TextInput>
        <TextInput placeholder='Earned Leave' keyboardType='number-pad' onChangeText={(val)=>setel(val)} ></TextInput>
        <Button title='Submit' onPress={()=>{
            onSubmit(cl,el,sl).then((val)=>{
                console.log("on submit"+val)
                AsyncStorage.setItem('totalleave','true');
                navigation.navigate('home');
            })
            
        }}></Button>
    </View>
)
}

async function onSubmit(cl:any , el:any, sl:any){
     return new Promise<Boolean>(async (resolve)=>{

        try{
            await AsyncStorage.setItem('cl', cl);
            await AsyncStorage.setItem('el', el);
            await AsyncStorage.setItem('sl', sl);
            resolve(true);
            }catch(e){
                console.log(e);
            }
     })
    
   

}