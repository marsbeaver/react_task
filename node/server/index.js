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
        await client.connect();
        await client.db("login_data").command({ping:1});
        console.log("ping");
        const d = client.db("login_data");
        /*
        await d.createCollection("user_data",{
            validator: {
                $jsonSchema: {
                    required: ["emailId","mobile"],
                    properties: {
                        firstName:{
                            bsonType: "string",
                            
                        },
                        lastName:{
                            bsonType: "string",
                            
                        },
                        emailId:{
                            bsonType: "string",
                            
                            uniqueItems:true
                        },
                        mobile:{
                            bsonType: "string",
                            uniqueItems:true
                        },
                        address:{
                            bsonType: "string",
                            
                        },
                        password:{
                            bsonType: "string",
                            
                        }
                    }
                }
            }
        });
        */
    
    const u = d.collection("user_data");
    const express = require("express");
    const app = express()
    const cors = require("cors");
    app.use(express.json());
    app.use(cors());
    app.post("/register",async (req,res)=>{
        try{
            let result = await u.insertOne(req.body);
            console.log(result);
            if(result){
                res.send(req.body);
            }else{
                console.log("User already exists");
            }
        }catch(e){
            //console.log(e);
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