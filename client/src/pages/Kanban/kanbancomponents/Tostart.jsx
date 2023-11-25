import Item from "./item"
import { useState } from "react"
import Updatetost from "./updatetost"
const tostart = ({todo,change}) => {
    console.log(todo)
  return (
    <div id="tostartlist" className="stat bg-slate-500">
            
            <div id="st" className="ram bg-slate-400 p-2 rounded-lg">
            TO START
            </div>
        <div className="inertodo">
            {todo.map((item,k) => {
                const [clk,setClk] = useState(false) 
                const chgclk = ()=>{
                    setClk(!clk)
                }
                if(item.t_status === 0){
                    return(
                        <div>
                            <span className="tdo" key={k} onClick={() =>{chgclk()}} >
                            <Item des={item.t_title} proj={item.project} />
                            </span>
                            {clk === true ? <Updatetost id={item.t_id} change={change} chgclk={chgclk} /> : null }
                        </div>    
                    )
                }   
            }) }
        </div>
      
    </div>
  )
}

export default tostart
