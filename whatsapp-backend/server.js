//Import 
// in node const express = require("express");
import express from "express"
import mongoose from "mongoose"
import Messages from "./dbMessages.js";
import Pusher from "pusher";
import cors from "cors";
//App config
const app = express();
const port = process.env.PORT || 9000;


//middleware
const pusher = new Pusher({
    appId: "1178797",
    key: "19acdf74e46fc3de1e57",
    secret: "63be0e26535b9ac839f1",
    cluster: "eu",
    useTLS: true
  });


app.use(express.json());
app.use(cors());




//DB config
const connection_url = "mongodb+srv://admin:YW4rqH9Di_@%23UGM@cluster0.4gmop.mongodb.net/whatsapp-clone?retryWrites=true&w=majority";
mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', ()=>{
    console.log('db connected');

    const msgCollection = db.collection('messagecontents');
    const changeStream = msgCollection.watch();

    changeStream.on('change', (change)=>{
        console.log(change);

        if(change.operationType === 'insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted', {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp
            });
        }else{
            console.log("error triggering pusher");
        }
    });


});

//api routes

app.get("/", (req,res)=>res.status(200).send("Hello world"));


app.get("/messages/sync", (req,res)=>{
    Messages.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    });
});

app.post("/messages/new", (req, res) => {
    const dbMessage = req.body;
    Messages.create(dbMessage, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    });
  });

// listen
app.listen(port,()=>console.log(`Listening on localhost ${port}`));

