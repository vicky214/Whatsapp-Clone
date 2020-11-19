import {useEffect, useState} from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Pusher from 'pusher-js';
import axios from './axios';

function App() {
  const [messages,setMessages] = useState([])

  useEffect(()=>{
    axios.get('/messages/sync')
    .then(response=>{
      console.log(response.data)
      setMessages(response.data)
    })
  },[]);

  useEffect(()=>{
    const pusher = new Pusher('1d29d99bd43a4da42e99', {
      cluster: 'ap2'
    });
    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (data) => {
      // alert(JSON.stringify(data));
      setMessages([...messages,data])
    });
    return ()=>{
      channel.unbind_all();
      channel.unsubscribe();
    }

  },[messages])

  return (
    <div className="app">
      <div className="app_body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
