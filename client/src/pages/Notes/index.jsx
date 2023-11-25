import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar';
import {useNavigate} from 'react-dom'
import {useParams} from "react-router-dom";
import axios from 'axios'
import Addfile from '../Notes/notecomponents/Addfile';
import '../../App.css'
const index = () => {
    let uname= useParams().username
    let id=useParams().id
    const navigate = useNavigate
    const [nttext,setNttext]=useState([{}])
    const [ptodo,setPtodo]=useState([{}])
    const [txt,setTxt] = useState('');
    const [fi,setFi]=useState([])
    const [addfile,setAddfile] =useState(false);
    useEffect(()=>{
       axios.get('http://localhost:3002/notes/note/'+id)
      .then(res => {setNttext(res.data)
                    setTxt(res.data[0].note_text)
      })
      .catch(err => console.log(err))
      axios.get('http://localhost:3002/notes/todo/'+id)
      .then(res => setPtodo(res.data))
      .catch(err => console.log(err))

      
    },[])
    useEffect(()=>{
      axios.get("http://localhost:3002/notes/files/"+nttext[0].note_id)
      .then(res => setFi(res.data))
      .catch(err => console.log(err))
    })
    
    const change = (newtxt)=>{
      setTxt(newtxt)
    }
    // console.log(dt)s
  return ( 
    <>   
        <Sidebar name={uname}/>
            <div className=" ml-[16vw]">
            <div className=' bg-green-500 py-5 my-2 px-4 text-3xl rounded-lg'>
              Notes of <span className=' ml-1 text-white font-semibold'>{ptodo[0].t_title}</span>
            </div>
            <div className='npcont'>
            <div className=' bg-slate-400 p-6'> 
              <textarea id="" cols="150"   rows="21" className=' bg-slate-400' value={txt} onChange={e => change(e.target.value)}></textarea>
            {/* {nttext[0].note_text} */}
            </div>
            <div className='npfiles mx-2'>
              <p className=' text-3xl text-left ml-2 my-4'>Files:</p>
              {
                fi.map((item)=>{
                  return(
                     <a href={`/login/${uname}/Dashboard/todos/${id}/Notes/${nttext[0].note_id}/files/${item.file_id}`} className=' m-2 rounded-lg bg-slate-500 px-4 py-2' key={item.file_id}>{item.file_name}</a>
                  )
                })
              }
              
            </div>
            </div>
            <div className=''>
              <button className='npsvbutton' onClick={()=>{
                axios.put('http://localhost:3002/notes/note/update/'+nttext[0].note_id,{txt})
                // .then(res => navigate('/'))
                .catch(err => console.log(err))
              }}>save</button>
              <button className='npsvbutton' onClick={()=>{setAddfile(!addfile)}}>add file</button>
              {
                addfile===true ? <Addfile nid={nttext[0].note_id}/> : null
              }
            </div>
            </div>
    </>
  )
}

export default index
