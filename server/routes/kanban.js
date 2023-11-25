const express = require('express');
const cors= require('cors');
  const mysql= require('mysql');
const moment = require('moment');
const router=express.Router();

const db=mysql.createConnection({
    // host:"localhost",
    // user:"root",
    // password:"Password",
    // database:"project",
    // multipleStatements:true
    host:"localhost",
    user:"root",
    password:"",
    database:"trial2",
    multipleStatements:true
})

router.get('/',(req,res)=>{
    return res.json("From kanban")
})
router.put('/update/:tid',(req,res)=>{
    const id=req.params.tid
    const newstatus=req.body.newst
    const sql="UPDATE todo SET t_status=? WHERE t_id= ?"

    db.query(sql,[newstatus,id],(err,data)=>{
        if(err) res.json(err)
        return res.json("UPDATED")
    })
})
router.get('/user/:name',(req,res)=>{
    const n=req.params.name
    const sql = "SELECT * FROM todo WHERE u_name= ?"
    db.query(sql,[n],(err,data)=>{
        if(err) res.json(err)
        return res.json(data)
    })
    // return res.json("name todos")
})

module.exports = router;