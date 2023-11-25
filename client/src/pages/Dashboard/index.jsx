import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Sidebar from '../../components/sidebar';
import { useState, useEffect } from 'react';
import axios from "axios";
const Dashboard = () => {
   const uname = useParams().username;
   const [auth, setAuth] = useState(false);
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
   }, [uname]);

   const greet = [
      'Amateurs sit and wait for inspiration, the rest of us just get up and go to work.',
      "If you spend too much time thinking about a thing, you'll never get it done.",
      'Create with the heart; build with the mind.',
      'Your mind is for having ideas, not holding them.',
      'Simplicity boils down to two steps: Identify the essential. Eliminate the rest.'
   ]
   return (
      <>
         {
            auth ? <><Sidebar name={uname} />
               <div className=" ml-[16vw]">
                  <div className=" flex">
                     <p className=" text-6xl italic">Hey</p>
                     <span className=" ml-6 text-6xl text-blue-500">{uname}</span>
                  </div>
                  <div className=" mt-8">
                     <p className=" text-5xl">Welcome to <span className=" text-purple-700">#UP</span> CHALLENGE</p>
                  </div>
                  <div className=" mt-8 text-7xl">
                     <p className=" my-4 text-4xl">Quote for you:</p>
                     <p className=" text-blue-600 font-semibold italic">{greet[(Math.floor(Math.random() * greet.length))]}</p>
                  </div>
                  <div className="mt-8 text-3xl">
                     <span>
                        <button className=" bg-green-400 px-4 py-2 rounded-md">
                           <a href={`/login/${uname}/Dashboard/todos`}>Go to To Dos</a>
                        </button>
                     </span>
                  </div>
               </div>
            </>


               :
               <h1>NOT ALLOWED HERE</h1>
         }


      </>
   );
}

export default Dashboard;