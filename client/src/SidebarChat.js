import React from 'react';
import './SidebarChat.css';
import {Avatar,IconButton} from '@material-ui/core';

export default function SidebarChat() {
    return (
        <div className="sidebarChat">
            <Avatar />
            <div className="sidebarChat_info">
                <h2>Room Name</h2>
                <p>This is last msg</p>
            </div>
        </div>
    )
}
