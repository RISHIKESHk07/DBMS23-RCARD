import {Routes,Route,BrowserRouter} from 'react-router-dom';
import './App.css'
import Register from '../src/pages/register';
import Login  from '../src/pages/login';
import Dashboard from '../src/pages/Dashboard';
import Todo from '../src/components/Todo';
import Kanban from '../src/pages/Kanban';
import Event_sch from '../src/pages/event_sch';
import Error404 from './pages/Error';
import note from '../src/pages/Notes';
import file from '../src/pages/file';
import pdf from '../src/pages/pdf';
import notestart from "../src/pages/Notestart" 
function App() {
  

  return (
    <>
      
      <BrowserRouter>
      
      <Routes>
        
        <Route path="/register" Component={Register}></Route>
        <Route path="/login" Component={Login}></Route>
        {/* <Route path="/Dashboard" Component={Dashboard}></Route> */}
        <Route path="/login/:username/Dashboard" Component={Dashboard}></Route>
        <Route path="/login/:username/Dashboard/todos" Component={Todo}></Route>
        <Route path="/login/:username/Dashboard/Kanban" Component={Kanban}></Route>
        <Route path="/login/:username/Dashboard/Event_scheduler" Component={Event_sch}></Route>
        <Route path="/login/:username/Dashboard/todos/:id/Notes" Component={note}></Route>
        <Route path="/login/:username/Dashboard/todos/:id/Notes/:nid/files/:fid" Component={file}></Route>
        <Route path="/login/:username/Dashboard/todos/:id/Notes/file/:fid/pdf" Component={pdf}></Route> 
        <Route path="/login/:username/Dashboard/todos/:id/Notestart" Component={notestart}></Route>
        <Route path="*" Component={Error404}></Route>
      </Routes>
      </BrowserRouter>
     
    </>
  )
}

export default App
