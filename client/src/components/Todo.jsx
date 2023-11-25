import axios from 'axios';
import Sidebar from './sidebar';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import SearchButtons from './Searchbuttons';
import Error404 from '../pages/Error';
const Todo = () => {
  const [edit, Setedit] = useState(false);
  const [items, Setitems] = useState([]);
  const [nitem, Setnitem] = useState("");
  const [tags, Settags] = useState("");
  const [up, Setup] = useState("");
  const [click, setclick] = useState("");
  const uname = useParams().username;
  const [auth, setAuth] = useState(false);
  const [project, setProject] = useState('');

  let val = 0

  useEffect(() => {
    console.log(uname);
    axios.post("http://localhost:3002/todos/", { "ver_name": `${uname}` }, { withCredentials: true }).then(res => {
      console.log(res.data);
      if (res.data.status == "token") {
        setAuth(true);
      }
      else {
        setAuth(false);
      }
    })
  }, []);

  useEffect(() => {

    axios.post('http://localhost:3002/todos/todos', { "u_name": uname }, { withCredentials: true }).then((response) => Setitems(response.data)).catch((err) => console.log(err));

  }, []);






  const handleChange = () => {
    axios.post('http://localhost:3002/todos/create', { "Title": nitem, "Tags": tags, "uname": uname, "project": project }).then((response) => console.log(response)).catch((err) => (err))
    console.log("Success added");
  };
  const handleDelete = (id) => {

    axios.delete(`http://localhost:3002/todos/` + `${id}`).then((res) => console.log(res)).catch((err) => console.log(err));
    console.log("delete")
  };
  const handleedit = (id) => {
    axios.put(`http://localhost:3002/todos/update/` + `${id}`).then((res) => console.log(res)).catch((err) => console.log(err));
  }
  const handlechange = (e) => {
    console.log(e.target.value);
    axios.post('http://localhost:3002/todos/todos_tags', { "name": uname, "tags": e.target.value }, { withCredentials: true }).then((response) => Setitems(response.data)).catch((err) => console.log(err));
  }
  return (<>


    {auth ? <><Sidebar name={uname} />
      <div className="p-4 sm:ml-64 flex gap-2">
        {edit && <>
          <div className='absolute w-[50%] h-[50%]'>
            <input className=" bg-slate-100 rounded-md p-4 mt-1"
              type="text"
              value={up}
              onChange={(e) => {
                Setup(e.target.value);
              }}
              placeholder="updated ........"
            />
            <button className="delete" onClick={() => { Setedit(!edit); handleedit() }}>CLOSE</button>

          </div></>}
        <div className=" flex flex-col items-center w-[70%]">
          <div className=' bg-slate-400 rounded-lg w-[950px]'>
            <div className=' flex gap-2'>
              <div className="p-6 flex gap-2 items-center">
                <p>Task:</p>
                <input className=" bg-slate-100 rounded-md p-4"
                  type="text"
                  value={nitem}
                  onChange={(e) => {
                    Setnitem(e.target.value);
                  }}
                  placeholder="Enter name of the task"
                />
              </div>
              <div className="p-6 flex gap-2 items-center">
                <p>Tags:</p>
                <input className=" bg-slate-100 rounded-md p-4"
                  type="text"
                  value={tags}
                  onChange={(e) => {
                    Settags(e.target.value);
                  }}
                  placeholder="Enter tags for the task"
                />
              </div>
            </div>
            <div className=' flex gap-2 items-center justify-between'>
              <div className="p-6 flex gap-2 items-center">
                <p>Project:</p>
                <input className=" bg-slate-100 rounded-md p-4"
                  type="text"
                  value={project}
                  onChange={(e) => {
                    setProject(e.target.value);
                  }}
                  placeholder="Enter Project Name"
                />
              </div>
            </div>
            <div className=' m-2'>
              <button onClick={handleChange} className=" w-full bg-green-500 text-white px-4 py-2 rounded-md font-bold hover:bg-green-600">Add Task</button>
            </div>
          </div>
          <div className=" overflow-scroll">{/* here is data */}
            {items.map((item) => {
              let str = `${item.tags}`;
              console.log(str, "-->", typeof (item.tags), typeof (str), item);
              let array_new = (str.split(","));
              return (
                <div key={item.T_id} className="p-3 m-4 rounded-lg w-[950px] flex flex-col outline bg-emerald-300">
                  <div className="flex  flex-row justify-between mb-4">
                    {/* <div className="text-blue-400 font-extrabold text-4xl inline">Tid :{item.t_id}</div> */}
                    <div className="text-blue-600 font-extrabold inline text-2xl italic">{item.t_title}</div>
                    <div className="text-blue-600 text-xl">Project:{item.project}</div>
                  </div>
                  <div className="flex flex-row justify-start text-left flex-wrap gap-2">
                    {array_new.map((n, key) => {
                      return (
                        <button key={key} className='px-2 h-[1%] text-blue-600 rounded-full text-sans bg-emerald-400 text-center'>#{n}</button>
                      );
                    })}
                  </div>
                  <div className='flex flex-row justify-between mt-[20px]'>
                    <div className="">
                      <button className=" text-red-500 mr-2 text-lg font-semibold " onClick={() => handleDelete(item.t_id)}>DELETE</button>
                      <button className="w-[70.8px] text-lg text-blue-500 font-bold" onClick={() => Setedit(!edit)}>EDIT</button>
                    </div>
                    <div>
                      <button className=' text-lg'><a href={`/login/${uname}/Dashboard/todos/${item.t_id}/Notestart`}>NOTES</a></button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className=' w-[30%] bg-slate-400 rounded-lg flex flex-col p-4'>
          <div className=' text-3xl mb-8'>
            Search with Tags...
          </div>
          <div className=' flex flex-col'>
            <SearchButtons name={uname} handle={handlechange} />
          </div>
        </div>
      </div>




    </> : <Error404 />}
  </>)
};
export default Todo;