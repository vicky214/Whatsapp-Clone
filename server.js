import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';
import Cors from 'cors';

const app =express()
const port = 2001

const pusher = new Pusher({
    appId: "1103389",
    key: "1d29d99bd43a4da42e99",
    secret: "7da2918671313f2292ab",
    cluster: "ap2",
    useTLS: true
  });

app.use(express.json());
app.use(Cors())
// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin","*");
//     res.setHeader("Access-Control-Allow-Headers","*");
//     next();
// })

const Database_url = 'mongodb+srv://user:user@cluster0.lrwdb.mongodb.net/whatsapp?retryWrites=true&w=majority';
mongoose.connect(Database_url,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
})
const db = mongoose.connection
db.once('open',()=>{
    console.log('DB has connected');

    const msgCollection = db.collection('messagecontents')
    const changeStream = msgCollection.watch()

    changeStream.on('change',(change)=>{

        if(change.operationType === 'insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger('messages','inserted',
            {
                name:messageDetails.user,
                message:messageDetails.message,
                timestamp:messageDetails.timestamp,
                received:messageDetails.received
            })
        }
        else{
            console.log('Error triggering pusher')
        }
    })
})

app.get('/messages/sync',(req,res)=>{
    Messages.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})

app.post('/messages/new',(req,res)=>{
    const dbMessage = req.body;
    Messages.create(dbMessage,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data)
        }
    })
})

app.listen(port,()=>{console.log(`Server is running on port ${port}`)})