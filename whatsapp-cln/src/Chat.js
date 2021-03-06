import React , {useState} from 'react'
import "./Chat.css"
import {Avatar, IconButton} from "@material-ui/core"
import { AttachFile,  MoreVert,SearchOutlined } from '@material-ui/icons'
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon"
import MicIcon from "@material-ui/icons/Mic"
import axios from "./axios"
function Chat({messages}) {
    const [input,setInput]= useState("");
    const sendMessage = async (e) =>{
    

        e.preventDefault();
       await axios.post('/messages/new',{
            message: input,
            name: "Sjebic",
            timestamp: "just now",
            recieved: false,
        });
     setInput("");
    };
    return ( 
        <div className="chat"> 
            <div className="chat__header">
                <Avatar/>
                <div className="chat__headerInfo">
                    <h2>Dance Room</h2>
                    <p> last seen...</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>

                </div>


            </div>
            <div className="chat__body">
                {messages.map((message)=>(
                     <p className={`chat__message ${message.received && "chat__reciver"}`}>
                     <span className="chat__name"> {message.name}</span>
                     {message.message}
                     <span className="chat__timestamp">
                         {message.date}
 
                     </span>
 
                     
                     </p>

                ))}

                
               
                    

            </div>

            <div className="chat__footer">
                <IconButton>
                <InsertEmoticonIcon/>
                </IconButton>
                <form>
                <input value ={input} 
                onChange={(e) => setInput(e.target.value)} 
                className="chat__footer__input" 
                placeholder="text"/>
                <button onClick={sendMessage} type="submit">
                    Send a message
                </button>
                </form>
                <IconButton>
                <MicIcon/>
                </IconButton>
            </div>
        </div>
    )
}

export default Chat
