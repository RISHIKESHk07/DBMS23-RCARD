import React from 'react'
import pdf from '../../../public/generated.pdf'
import axios from 'axios';
import '../../App.css'
import {useParams,useNavigate} from "react-router-dom";

const index = () => {
    const navigate = useNavigate()
    let uname= useParams().username
    let id=useParams().id
    let fid=useParams().fid
    return (
        <div>
            <div>
                <iframe src={pdf} width="100%" height="1000px"></iframe>
            </div>
            <button className='npsvbutton'><a href={`/login/${uname}/Dashboard/todos/${id}/Notes`}>go back</a></button>
            <button className='npsvbutton' onClick={()=>{
                axios.delete(`http://localhost:3002/notes/${fid}`)
                .then(res=>console.log(res.data))
                .then(navigate(`/login/${uname}/Dashboard/todos/${id}/Notes`))
                .catch(err=>console.log(err))
            }}>DELETE</button>
        </div>
    )
}

export default index
