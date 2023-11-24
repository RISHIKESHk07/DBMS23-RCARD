const express = require('express');
const mysql = require('mysql');

const router = express.Router();

const db=mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"Password",
  database:"project",
  multipleStatements:true
})

router.post('/', (req,res) => {
  const title = req.body.eventName
  const description = req.body.eventDescription
  const start = req.body.start
  const end = req.body.end
  const uname = req.body.username

  const query = "INSERT INTO events (u_name,event_name, event_description, event_start, event_end) VALUES (?,?,?,?,?)"
  const vals = [uname,title,description,start,end]
  db.query(query, vals, (err,data) => {
    if(err) {
      console.log(err)
    }
    console.log('Inserted an Event')
    return res.json(data)
  })
})

router.get('/getall/:name', (req, res) => {
  const name = req.params.name
  console.log(name)
  const query = "SELECT * FROM events where u_name = ?"
  const vals = [name]
  db.query(query,vals,(err,data) => {
    if(err) {
      console.log(err)
    }
    console.log(data)
    return res.json(data)
  })
})

module.exports = router;