import axios from 'axios';
import Sidebar from './sidebar';
import { useParams } from 'react-router-dom';
import { useState ,useEffect} from "react";
import SearchButtons from './Searchbuttons';
import Error404 from '../pages/Error';
const Todo =()=>{
const [edit,Setedit]=useState(false);  
const [items,Setitems]=useState([]);
const [nitem,Setnitem]=useState("");
const [tags,Settags]=useState("");
const [up,Setup]=useState("");
const [click,setclick]=useState("");
const uname=useParams().username;
const [auth,setAuth]=useState(false);

let val=0

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
},[]);

useEffect(()=>{
     
    axios.post('http://localhost:3002/todos/todos',{"u_name":uname},{withCredentials:true}).then((response)=> Setitems(response.data)).catch((err)=> console.log(err));
    
},[]);






const handleChange=()=>{
    axios.post('http://localhost:3002/todos/create',{"Title":nitem,"Tags":tags,"uname":uname,"project":"p1"}).then((response)=> console.log(response)).catch((err)=>(err))
   console.log("Success added");
};
 const handleDelete=(id)=>{
    
    axios.delete(`http://localhost:3002/todos/`+`${id}`).then((res)=>console.log(res)).catch((err)=>console.log(err));
    console.log("delete")
};
const handleedit =(id) =>{
  axios.put(`http://localhost:3002/todos/update/`+`${id}`).then((res)=>console.log(res)).catch((err)=>console.log(err));
}
const handlechange = (e)=>{
  console.log(e.target.value);
   axios.post('http://localhost:3002/todos/todos_tags',{"name":uname,"tags":e.target.value},{withCredentials:true}).then((response)=> Setitems(response.data)).catch((err)=> console.log(err)); 
 }
return(<>


{auth ?<><Sidebar name={uname}/>
<div className="p-4 sm:ml-64">
  {edit && <>
  <div className='absolute w-[50%] h-[50%]'>
  <input className=" bg-slate-100 rounded-md p-4 mt-1" 
        type="text"
        value={up}
        onChange = {(e)=>{
          Setup(e.target.value);
        }}
        placeholder="updated ........"
  /> 
  <button className="delete" onClick={() => {Setedit(!edit);handleedit()}}>CLOSE</button>
    
    </div></> }
<div className=" flex flex-col items-center">
        
      <div className="p-6">
        <input className=" bg-slate-100 rounded-md p-4" 
        type="text"
        value={nitem}
        onChange = {(e)=>{
          Setnitem(e.target.value);
        }}
        placeholder="Create a new todo"
        />
        
      </div>
      <div className="p-6">
        <input className=" bg-slate-100 rounded-md p-4" 
        type="text"
        value={tags}
        onChange = {(e)=>{
          Settags(e.target.value);
        }}
        placeholder="Create a tags for todo"
        />
       
      </div>
      <button onClick={handleChange} 
        className=" bg-green-500 text-white p-3 m-3 rounded-md font-bold hover:bg-green-600">Add Tasks</button>
       <br/>
      <div className="w-[490px]">{/* here is data */}
         {items.map((item)=>{
                let str=`${item.tags}`;
                console.log(str,"-->",typeof (item.tags),typeof(str),item);
                let array_new=(str.split(","));
                
                
            return (
               <div key={item.T_id} className="p-3 m-4 rounded-lg w-100 flex flex-col outline card">
                      
                     <div className="flex  flex-row justify-between mb-4">
                      <div className="text-blue-400 font-extrabold text-4xl inline">Tid :{item.t_id}</div>
                      <div className="text-blue-600 font-extrabold inline text-2xl">{item.t_title}</div>
                      <div className="text-blue-600 font-extrabold inline text-2xl">Project:{item.project}</div>
                     

                     </div>
                     <div className="flex flex-row justify-end text-right ">
                         { array_new.map((n,key)=>{
                        return(
                            
                            <button key={key} className='px-1.25 h-[1%] ml-2 text-blue-600 rounded-full text-sans  text-center tags'>#{n}</button>
                          
                        );
                        }) }
                     </div>
                     <div className='flex flex-row justify-between mt-[20px]'>
                       <div className="">
                        <button className=" delete text-red-500 mr-2 text-lg font-semibold " onClick={()=>handleDelete(item.t_id)}>DELETE</button>
                        <button className="edit w-[70.8px] text-lg text-blue-500 font-bold" onClick={()=> Setedit(!edit)}>EDIT</button>
                       </div>
                       <div>
                        <button className='card text-lg create'>+CREATE</button>
                       </div>
                       
                       


                     </div>
                     
                     
               </div>
            );
         })}
      </div> 
    </div>
    <SearchButtons name={uname} handle={handlechange}/>
</div>




</> : <Error404 />}
</>)
};
export default Todo;