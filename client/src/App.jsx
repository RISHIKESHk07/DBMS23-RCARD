import {Routes,Route,BrowserRouter} from 'react-router-dom';
import './App.css'
import Register from '../src/pages/register';
import Login  from '../src/pages/login';
import Dashboard from '../src/pages/Dashboard';
import Todo from '../src/components/Todo';
import Kanban from '../src/pages/Kanban';
import event_sch from '../src/pages/event_sch';
import EventWrap from './components/EventWrap';
function App() {
  

  return (
    <>
      <a className=' m-2 p-2 bg-emerald-700 rounded-md' href='/login/:username/Dashboard/Event_scheduler'>Go to Event Scheduler</a>
      
      <BrowserRouter>
      
      <Routes>
        
        <Route path="/register" Component={Register}></Route>
        <Route path="/login" Component={Login}></Route>
        {/* <Route path="/Dashboard" Component={Dashboard}></Route> */}
        <Route path="/login/:username/Dashboard" Component={Dashboard}></Route>
        <Route path="/login/:username/Dashboard/todos" Component={Todo}></Route>
        <Route path="/login/:username/Dashboard/Kanban" Component={Kanban}></Route>
        <Route path="/login/:username/Dashboard/Event_scheduler" Component={EventWrap}></Route>
      </Routes>
      </BrowserRouter>
     
    </>
  )
}

export default App
