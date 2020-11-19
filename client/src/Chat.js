import React,{useState} from 'react';
import './Chat.css';
import {Avatar,IconButton} from '@material-ui/core';
import {SearchOutlined,AttachFile,MoreVert, SettingsInputAntenna, Message} from '@material-ui/icons';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import axios from './axios';

function Chat({messages}) {
    const [input,setInput] = useState('')

    const sendMessage=async (e)=>{
        e.preventDefault();
        await axios.post('/messages/new',{
            message:input,
            name:'vicky',
            timestamp:'just now',
            received:false
        })
        setInput('')
    }
    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar />

                <div className="chat_headerInfo">
                    <h3>Room Name</h3>
                    <p>Last seen at...</p>
                </div>

                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat_body">
                {messages.map(message=>(
                     <p className={`chat_message ${message.received && "chat_reciever"}`}>
                     <span className="chat_name">{message.name}</span>
                     {message.message}
                     <span className="chat_timestamp">
                         {message.timestamp}
                     </span>
                 </p>
                ))}
                {/* <p className="chat_message">
                    <span className="chat_name">Sonny</span>
                    This is a msg
                    <span className="chat_timestamp">
                        {new Date().toUTCString()}
                    </span>
                </p> */}

                {/* <p className="chat_message chat_reciever">
                    <span className="chat_name">Sonny</span>
                    This is a msg
                    <span className="chat_timestamp">
                        {new Date().toUTCString()}
                    </span>
                </p> */}
            </div>

            <div className="chat_footer">
                <InsertEmoticonIcon />
                <form>
                    <input
                        value={input}
                        onChange={(e)=>setInput(e.target.value)}
                        placeholder="Type a message"
                        type="text"
                    />
                    <button
                        onClick={sendMessage}
                        type="submit"
                    >
                        Send a message
                    </button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
