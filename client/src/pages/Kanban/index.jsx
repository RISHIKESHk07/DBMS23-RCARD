import {useParams} from "react-router-dom";
import Sidebar from '../../components/sidebar';
import '../../App.css'
import { useEffect, useState } from 'react'
import Tostart from './kanbancomponents/Tostart'
import axios from 'axios'
import Inprg from './kanbancomponents/Inprg'
import Complete from './kanbancomponents/complete'
import Error404 from "../Error";
import { render } from 'react-dom'
import {useNavigate} from 'react-dom'

const index = () => {
  const [auth,setAuth]=useState(false);
    let uname= useParams().username
    const navigate = useNavigate
    useEffect(()=>{
      console.log(uname);
      axios.post("http://localhost:3002/todos/",{"ver_name":`${uname}`},{withCredentials:true}).then(res => {
         console.log(res.data);
         if(res.data.status == "token"){
            setAuth(true);
         }
         else{
            setAuth(false);
         }
      })
    },[uname]);

  const chgst = (id,newst)=>{
    event.preventDefault()
    axios.put('http://localhost:3002/kanban/update/'+id,{newst})  
    .then(res => navigate('/') )
    .catch(err => console.log(err))

    // setLst(lst.filter((item)=> item.id != id))
    lst.map((item)=>{
      if(item.t_id === id){
        item.t_status = newst
      }
    },[])
    setLst(lst)
    setCount(count+1)
    console.log(id,newst)
  }

  const [count,setCount] = useState(0)
  const [lst,setLst] = useState([])
//       { 
//       id:1,
//       discription :"alling kfjkvmzd,x",
//       project :"proj 1",
//       status: 1
//     },
//     {
//       id:2,
//       discription :"dfdkjkf kfjkvmzd,x",
//       project :"proj 2",
//       status: 0
//     },
//     { 
//       id:3,
//       discription :"al kfjkvmzd,x",
//       project :"proj 3",
//       status: 2
//     },
//     { 
//       id:4,
//       discription :"ag kfmzdx",
//       project :"proj 2",
//       status: 1
//     },
//     { 
//       id:5,
//       discription :"alkfjkv",
//       project :"proj 3",
//       status: 0
//     },
//     { 
//       id:6,
//       discription :"kfjkvx",
//       project :"proj 1",
//       status: 2
//     }
  
//   ])
    useEffect(()=>{
        fetch('http://localhost:3002/kanban/user/'+uname)
        .then (res => res.json())
        .then (data => {setLst(data)})
        .catch(err => console.log(err))
      },[])
      
    console.log(lst)
    return (
      <>
      {auth ?
        <>
        
        <Sidebar name={uname}/>
        <div className="sm:ml-64">
        <div className="kh">
        <Tostart todo={lst} change={chgst} count={count} />
        <Inprg todo={lst} change={chgst} count={count} />
        <Complete todo={lst} change={chgst} count={count} />
        </div>
        </div>
        
         </>
    
    
     : <><Error404/></>}
    </>
    );
}

export default index
