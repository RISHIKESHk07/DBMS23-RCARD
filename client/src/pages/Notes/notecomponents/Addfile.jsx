import axios from 'axios';
import React, { createRef, useState } from 'react';
const Addfile = ({nid}) => {
    // const filechange=(e)=>{
    //     // setFile(e.target.files[0]);
    //     const file=e.target.files[0];
    //     console.log(file.name,file.type)
    //     // setFile(file)
    //     // console.log(file)
    // };
    // const fileadd=(e)=>{
    //     e.preventDefault(); 
    //     console.log("clicked")
    //     // console.log(Buffer.from(file,'binary'))
    //     axios.post('http://localhost:3002/notes/file/upload/'+nid,file)
    //     .catch(err => console.log(err))
    // }
    const fileInput= createRef();
    const onsubmit= async (e)=>{
      e.preventDefault()

      const formData=new FormData();
      formData.set("avatar",fileInput.current.files[0])

      try{
        const response = await fetch('http://localhost:3002/notes/file/upload/'+nid,{
          method:"POST",
          body: formData
        });
        const pres=await response.json()                   
      }catch(e){
        console.log(e)
      }
    }
  return (
    <div>

       <form onSubmit={onsubmit}>
        <input type="file" name='avatar' ref={fileInput}/>
        <input type="submit" value='submit'/>
       </form>

     
    </div>
  )
}

export default Addfile
