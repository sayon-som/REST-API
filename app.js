const { urlencoded } = require('express');
const express=require('express');
const app=express();
const path=require('path');
const methodOverride=require('method-override');//for the method override
//for getting the body from the post request
app.use(express.urlencoded({extended:true}))
app.set('view enjine','ejs');
app.set('views',path.join(__dirname,'views'));
//for the uuid
app.use(methodOverride('__method'));

const { v4: uuidv4 } = require('uuid');
console.log(uuidv4()); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
//for the method over ride

app.get("/",(req,res)=>{
    res.render('index.ejs');
})
app.get("/submit",(req,res)=>{
    res.send("got your get request");

    const {name}=req.query;//for the get request
    
})
app.post("/submit",(req,res)=>{
    res.send("got your post request");
    console.log(req.body);//for the post request
})
let comments=[
    {
        id:1,
        username:"Sayon",
            comment:"bksjf dksjda diusagda iabdsad diasdgas hiasd as"
    },
    {
        id:2,
        username:"Saon",
            comment:"bksjf dksjda diusagda iabdsad diasdgas hiasd as"
    },
    {
        id:3,
        username:"Syon",
            comment:"bksjf dksjda diusagda iabdsad diasdgas hiasd as"
    },
    {
        id:4,
        username:"ayon",
            comment:"bksjf dksjda diusagda iabdsad diasdgas hiasd as"
    }
]
//IMPLEMENTING THE RESTFUL APPLICATION

//getting all the comments
app.get("/comments",(req,res)=>{
    res.render('comments/index.ejs',{comments});
})
//making new comments
app.get("/comments/new",(req,res)=>{
res.render("comments/new.ejs")});

app.post("/comments",(req,res)=>{
    const {username,comment}=req.body;
   let obj={};

   obj.username=username;
   obj.comment=comment;
   comments.push(obj);
   res.redirect('/comments');
})
//getting the comments based on the comment index

app.get("/comments/:id",(req,res)=>{
    const {id}=req.params;
    console.log(id);
    const obj=comments.find(c=>
        c.id===parseInt(id)
    );
    
    res.render("comments/show.ejs",{obj})
})
//update a certain post
app.patch("/comments/:id/update",(req,res)=>{
    const {id}=req.params;
    const {comment}=req.body;
    for(let i of comments){
        if(i.id===parseInt(id)){
            i.comment=comment;
        }
    }
    res.redirect('/comments');
})

app.get('/comments/:id/update',(req,res)=>{
    const {id}=req.params;
    console.log(id);
    const comment=comments.find((element)=>element.id===parseInt(id));
    res.render('comments/update.ejs',{comment});
})
app.get('/comments/:i/delete',(req,res)=>{
    const {i}=req.params;
    res.render('comments/delete.ejs',{i});
})
app.delete("/comments/:id/delete",(req,res)=>{
    const {id}=req.params;
    comments=comments.filter((element)=>element.id!==parseInt(id)
        
    )
    res.redirect('/comments');
})


app.listen(3000,()=>{
    console.log("server listening at port 3000");
});
