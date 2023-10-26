import { useSession, useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';

function EventScheduler() {
  const [ start, setStart ] = useState(new Date());
  const [ end, setEnd ] = useState(new Date());
  const [ eventName, setEventName ] = useState("");
  const [ eventDescription, setEventDescription ] = useState("");

  const session = useSession(); // tokens, when session exists we have a user
  const supabase = useSupabaseClient(); // talk to supabase!
  const { isLoading } = useSessionContext();
  
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

  async function signOut() {
    await supabase.auth.signOut();
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
    }).then((data) => {
      console.log(data);
      alert("Event created, check your Google Calendar!");
    });
  }

  return (
    <div>
      <div className=' mt-[30px] w-[70%] m-auto'>
        {session ?
          <div>
            <div className=' bg-purple-300 p-16 rounded-3xl flex-col'>
              <p className=' text-2xl font-bold'>Logged in as {session.user.email}</p>
              <div className=' mt-20 py-4 flex justify-start flex-wrap'>
                <p className=' m-2 p-2 bg-blue-400 rounded-md'>Start of your event: <DateTimePicker onChange={setStart} value={start} className=' bg-blue-300'/></p>
                <p className=' m-2 p-2 bg-blue-400 rounded-md'>End of your event: <DateTimePicker onChange={setEnd} value={end} className=' bg-blue-300'/></p>
              </div>
              <div>
                <span className=' m-2 p-2 bg-blue-400 rounded-md'>Event name: <input className=' rounded-md ml-1' type="text" onChange={(e) => setEventName(e.target.value)} placeholder=' Title'/></span>
                <br />
                <br />
                <span className=' m-2 p-2 bg-blue-400 rounded-md'>Event description: <input className=' rounded-md ml-1' type="text" onChange={(e) => setEventDescription(e.target.value)} placeholder=' Description'/></span>
              </div>
              <div className='flex justify-start mt-6'>
                <button className='ml-2 p-2 bg-green-400 rounded-md hover:bg-green-500' onClick={() => createCalendarEvent()}>Create Calendar Event</button>
                <button className=' ml-4 p-2 bg-red-400 rounded-md hover:bg-red-500' onClick={() => signOut()}>Sign Out</button>
              </div>
            </div>
          </div>
          :
          <>
            <h2 className=' text-3xl font-bold'>Not Signed in</h2>
            <button className=' mt-4 p-2 bg-yellow-500 rounded-lg' onClick={() => googleSignIn()}>Sign In With Google</button>
          </>
        }
      </div>
    </div>
  );
}

export default EventScheduler;