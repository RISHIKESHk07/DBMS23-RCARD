const express = require('express');
const cors= require('cors');
  const mysql= require('mysql');
const moment = require('moment');
const multer= require('multer');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const router=express.Router();
const fileupload = require('express-fileupload');
const upload= multer({dest: 'uploads/'});
const path = require("path");

const db=mysql.createConnection({
    // host:"localhost",
    // user:"root",
    // password:"Password",
    // database:"project",
    host:"localhost",
    user:"root",
    password:"",
    database:"trial2",
    multipleStatements:true
})

router.use(fileupload())

router.get('/',(req,res)=>{
    return res.json("From Notes")
})

router.get('/note/ids',(req,res)=>{
    const sql="SELECT t_id From notes"
    db.query(sql,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

router.put('/newnote',(req,res)=>{
    const sql = "INSERT INTO notes (t_id,note_text) VALUES (?,'')"
    const id=req.body.id
    db.query(sql,[id],(err,data)=>{
        if(err) return console.log(err)
        return res.json("CREATED")
    })
})

router.get('/note/:id',(req,res)=>{
    id=req.params.id
    const sql="SELECT * FROM notes WHERE t_id = ?"
    db.query(sql,[id],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

router.get('/todo/:id',(req,res)=>{
    id=req.params.id
    const sql="SELECT * FROM todo WHERE t_id= ?"
    db.query(sql,[id],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
router.get('/files/:n_id',(req,res)=>{
    id=req.params.n_id
    const sql="SELECT * FROM file WHERE note_id= ?"
    db.query(sql,[id],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

router.delete("/:fid",(req,res)=>{
    fid=req.params.fid
    const sql = "DELETE FROM file WHERE file_id=?"
    console.log(fid)
    db.query(sql,fid,(err,data)=>{
        if(err) return res.json(err)
        return res.json("DELETED")
    })
})
router.get('/files/:f_id/blob',(req,res)=>{
    id=req.params.f_id
    const sql="SELECT content FROM file WHERE file_id=?"
    db.query(sql,[id],(err,result)=>{
        if(err) return res.json(err)
        const filename=path.join(__dirname,"../../client/public","generated.pdf");
        const blb=result[0].content
        const data=Buffer.from(blb,'binary')

        fs.writeFile(filename,blb,'binary',(fileerr)=>{
            if(fileerr) return console.log(fileerr)
            console.log("fine appended");
        })
        
        // res.sendFile(filename);
         res.json(data);
    })
})

router.put('/note/update/:nid',(req,res)=>{
    id=req.params.nid
    const newtxt = req.body.txt
    const sql="UPDATE notes SET note_text=? WHERE note_id=? "

    db.query(sql,[newtxt,id],(err,data)=>{
        if(err) return res.json(err)
        return res.json("updated")
    })

})

router.post('/file/upload/:nid',(req,res)=>{
    console.log(req.files)
    const filename=req.files.avatar.name
    const nid= req.params.nid
    // const data=req.file.avatar.data
    // const file=req.file
    // const filename=file.originalname
    // console.log(file)
    const sql="INSERT INTO file (file_name,note_id,content) VALUES (?,?,?)"
    // console.log(file.buffer)
    db.query(sql,[filename,nid,req.files.avatar.data],(err,data)=>{
        if(err){
            return console.log(err)
        }
        console.log("uploaded")
    })
})

module.exports = router;