import './App.css';
import Sidebar from "./Sidebar";
import Chat from "./Chat"
import Pusher from "pusher-js"
import React, {useEffect,useState} from 'react';
import axios from './axios';

function App() {
    const [messages,setMessages]= useState([]);

  useEffect(()=>{
    axios.get('/messages/sync')
    .then(response =>{
      
      setMessages(response.data);
    })
  }, []);
 
  console.log(messages);
  
 useEffect(()=>{
  var pusher = new Pusher('19acdf74e46fc3de1e57', {
    cluster: 'eu',
  });

  var channel = pusher.subscribe('messages');
  channel.bind('inserted', (newMessage)=> {
   
    setMessages([...messages, newMessage])
  }); 
   return   ()=>{
      channel.unbind_all();
      channel.unsubscribe();
    };

 }, [messages]);

  return (
    <div className="app">
      <div className="app__body">
     {/* comppnents */}
       <Sidebar/>
       
       <Chat messages= {messages}/>
      </div>
    
      
    

      
    </div>
  );
}

export default App;
