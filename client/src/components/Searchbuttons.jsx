import axios from 'axios';
import {useState} from 'react';
import {useEffect} from 'react'
import {useParams} from 'react-router-dom'
const SearchButtons =({name ,handle})=>{
     console.log(name, handle) 
    const [list,setlist]=useState([])
    let [array,setarray]=useState([])
    
    const factor=list.length
     console.log(name)
      
      useEffect(()=>{
        axios.post('http://localhost:3002/todos/tags',{"tags":"","name":`${name}`},{withCredentials: true}).then((response)=>{
              
                   
            setlist(response.data);
            /* console.log(list[0]) */
            let array1=[]
            for(let i=0; i<list.length; i++){
                /* console.log(list[i]) */
                
                list[i].tags.split(",").forEach((tag)=>{
                    array1.push(tag)
                }) 
                if(i == list.length-1){
                    setarray(array1)
                }
                
            }
            /* console.log("this is array",array) */
            
           
            
            
            
             
        }).catch((err)=>{
            console.log(err);
        })
      },[factor])
      
        
       console.log(array) 
  return (
     <>
     {
        
        array.map((value,key)=>{
            return(
                <button className="mr-2 p-2 "key={key} value={value} onClick={(e)=>{handle(e)}}>{value}</button>
            )
        })
     }
     <button className="mr-2 p-2 " value={""} onClick={(e)=>{handle(e)}}>ALL</button>
     </>
  )
}
export default SearchButtons;