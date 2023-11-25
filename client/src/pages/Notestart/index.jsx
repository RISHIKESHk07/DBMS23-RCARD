import React from 'react'
import axios from 'axios';
import '../../App.css'
import { useParams,useNavigate } from 'react-router-dom';
import { useState ,useEffect} from "react";
import Sidebar from '../../components/sidebar';
const index = () => {
    const uname=useParams().username;
    const id=(useParams().id);
    const [ids,setids] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        axios.get("http://localhost:3002/notes/note/ids")
        .then(res=>{
            setids(res.data)
        })
        .catch(err=>console.log(err))
    },[])
    console.log(typeof(id))
    console.log(ids)
    
  return (
    <div>
        <Sidebar name={uname}/>
        {
                ids.map((item,k)=>{
                    if(item.t_id == id){
                        console.log("From map")
                        console.log(typeof(item.t_id))
                        navigate(`/login/${uname}/Dashboard/todos/${id}/Notes`)
                    }
                })
        }
        <div className=' ml-[16vw] flex flex-col gap-4 justify-center items-center h-screen'>
            <p className=' text-3xl font-semibold italic'>NO EXISTING NOTE</p>
            <button className='npsvbutton' onClick={()=>{
                    axios.put('http://localhost:3002/notes/newnote',{id})
                    .then(navigate(`/login/${uname}/Dashboard/todos/${id}/Notes`))
                    .catch(err=>console.log(err))  
            }}> create Note</button>
        </div>
      
    </div>
  )
}

export default index
