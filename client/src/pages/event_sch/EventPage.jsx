import { useSession, useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState, useEffect } from 'react';
import DateTimePicker from 'react-datetime-picker';
import Sidebar from '../../components/sidebar';
import { useParams } from "react-router-dom";
import Axios from 'axios';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

function EventScheduler() {
  const [ start, setStart ] = useState(new Date());
  const [ end, setEnd ] = useState(new Date());
  const [ eventName, setEventName ] = useState("");
  const [ eventDescription, setEventDescription ] = useState("");

  const [eventList, setEventList] = useState([])

  const session = useSession(); // tokens, when session exists we have a user
  const supabase = useSupabaseClient(); // talk to supabase!
  const { isLoading } = useSessionContext();

  const uname = useParams().username

  useEffect(() => {
    Axios.get(`http://localhost:3002/events/getall/${uname}`).then((response) => {
      console.log(response.data)
      setEventList(response.data)
    })
  },[])
  
  if(isLoading) {
    return <></>
  }

  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/calendar'
      }
    });
    if(error) {
      alert("Error logging in to Google provider with Supabase");
      console.log(error);
    }
  }

  async function createCalendarEvent() {
    const event = {
      'summary': eventName,
      'description': eventDescription,
      'start': {
        'dateTime': start.toISOString(),
        'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      'end': {
        'dateTime': end.toISOString(),
        'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    }
    await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      method: "POST",
      headers: {
        'Authorization':'Bearer ' + session.provider_token
      },
      body: JSON.stringify(event)
    }).then((data) => {
      return data.json();
    }).then(() => {
      alert("Event Added to Your Google Calendar ✅");
    });
  }

  const addEvent = () => {
    // console.log('Add Event Called')
    Axios.post('http://localhost:3002/events',{
      username : uname,
      eventName : eventName,
      eventDescription : eventDescription,
      start : start,
      end : end
    }).then((response) => {
      console.log('Inserted successfully...')
    })
  }

  const clearForm = () => {
    setStart(new Date());
    setEnd(new Date());
    setEventName("");
    setEventDescription("");
  }

  return (
    <div>
      <Sidebar name={uname} />
      <div className=' mt-2 ml-[21vw] flex gap-1'>
        <div className=' w-[65%] bg-slate-400 h-screen overflow-scroll rounded-2xl'>
          <p className=' px-4 py-2 font-semibold text-5xl italic'>Your Events</p>
          <div>
            {
              eventList.map((item,key)=>{
                return <div key={key} className=' rounded-lg m-2 p-2 bg-blue-400'>
                  <div className=' flex flex-col gap-2'>
                    <p className=' italic text-3xl'>{item.event_name}</p>
                    <p className=' my-2 break-words font-light'>{item.event_description}</p>
                    <div className=' flex justify-around'>
                      <p className=' px-2 py-1 rounded-lg bg-blue-500'>From: <span className=' bg-blue-300 rounded-lg px-1'>{item.event_start}</span></p>
                      <p className=' px-2 py-1 rounded-lg bg-blue-500'>To: <span className=' bg-blue-300 rounded-lg px-1'>{item.event_end}</span></p>
                      <button className=' px-2 py-1 bg-red-400 rounded-lg hover:bg-red-500'>Delete</button>
                    </div>
                  </div>
                </div>
              })
            }
          </div>
        </div>
        <div className=' w-[35%] bg-indigo-500 rounded-2xl mx-1 max-h-[420px] min-h-[420px]'>
          {session ?
            <div className=' p-4 rounded-3xl flex-col'>
              <p className=' text-2xl font-bold'>Logged in as <span className=' text-slate-200'>{session.user.email}</span></p>
              <p className=' mt-4 text-xl font-semibold'>Create New Event</p>
              <div className=' mt-1 pt-4 flex flex-col'>
                <div className=' p-2 bg-blue-400 rounded-lg'>Start of your event: <DateTimePicker onChange={setStart} value={start} className=' bg-blue-300' calendarClassName={' bg-slate-400 rounded-2xl'} clockClassName={' bg-blue-500 rounded-full'}/></div>
                <div className=' mt-2 p-2 bg-blue-400 rounded-lg'>End of your event: <DateTimePicker onChange={setEnd} value={end} className=' bg-blue-300' calendarClassName={' bg-slate-400 rounded-2xl'} clockClassName={' bg-blue-500 rounded-full'}/></div>
              </div>
              <div className='flex flex-col flex-wrap'>
                <span className=' mt-2 p-2 bg-blue-400 rounded-md'>Event Name:<input className=' px-2 rounded-md ml-1' type="text" onChange={(e) => setEventName(e.target.value)} placeholder='Title' value={eventName}/></span>
                <span className=' mt-2 p-2 bg-blue-400 rounded-md'>Event Description:<input className=' px-2 rounded-md ml-1' type="text" onChange={(e) => setEventDescription(e.target.value)} placeholder='Description' value={eventDescription}/></span>
              </div>
              <div className='flex justify-center mt-6'>
                <button className='ml-2 px-4 py-2 bg-green-400 rounded-md hover:bg-green-500' onClick={() => {createCalendarEvent();addEvent();}}>Add Event</button>
                <button className=' ml-4 px-4 py-2 bg-yellow-400 rounded-md hover:bg-yellow-500' onClick={clearForm}>Clear</button>
                {/* <button className=' ml-4 px-4 py-2 bg-red-400 rounded-md hover:bg-red-500' onClick={async () => {await supabase.auth.signOut();}}>Sign Out</button> */}
              </div>
            </div>
            :
            <div className=' flex flex-col gap-10 justify-center items-center'>
              <h2 className=' text-3xl font-semibold mt-[100px]'>Not Signed in</h2>
              <button className=' m-4 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg' onClick={() => googleSignIn()}>Sign In With Google</button>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default EventScheduler;