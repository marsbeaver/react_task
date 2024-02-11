const {MongoClient, ServerApiVersion}= require("mongodb");
const mongoose = require("mongoose") 
const PORT=3000;
const uri = "mongodb+srv://react_task_db:therectr@cluster0.y6z3nrg.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri,{
    serverApi:{
        version: ServerApiVersion.v1,
        strict:true,
        deprecationErrors: true
    }
});
async function run(){
    try{
        const d = client.db("login_data");
        const u = d.collection("user_data");
        const express = require("express");
        const app = express()
        const cors = require("cors");

        await client.connect();
        await client.db("login_data").command({ping:1});
        console.log("Connected to database!");
        app.use(express.json());
        app.use(cors());
        app.post("/register",async (req,res)=>{
            try{
                let email = req.body.emailId;
                let mobile = req.body.mobile;
                let check = await u.find({emailId:email,mobile:mobile}).toArray();
                if(check.length!=0){
                    console.log("user already exists");
                    res.send("User already exists. Please enter a different mobile or email.");
                }else{
                    try{
                        let result = await u.insertOne(req.body);
                        res.send(req.body);
                    }catch(e){
                        res.send("Something went wrong...");
                    }
                }
            }catch(e){
                res.send("Something went wrong...");
            }
        });
        app.post("/login",async (req,res)=>{
            try{
                let check = await u.find(req.body).toArray();
                if(check.length!=0){
                    console.log("Found it!");
                    res.send(check);
                }else{
                    res.status(404);
                    res.send("Not found");
                }
            }catch(e){
                console.log(e);
                res.send("Something went wrong...");
            }
        });
        app.listen(5000);
        
    }catch(e){
        console.log(e);
    }
}

run().catch(console.dir);


/*
*/