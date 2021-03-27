import  DonutLargeIcon from '@material-ui/icons/DonutLarge';
import {IconButton,Avatar} from "@material-ui/core/";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlined from "@material-ui/icons/SearchOutlined"
import {React} from 'react';
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";


function Sidebar() {
    return (
        <div className="sidebar">

            <div className="sidebar__header">
                <Avatar src ="https://yt3.ggpht.com/yti/ANoDKi7mFMq73wtMBW3vUxjsDkDVKjBq4orpR49nXil6uA=s88-c-k-c0x00ffffff-no-rj-mo"/>

                <div className="sidebar__headerRight">
                    <IconButton>
                    <DonutLargeIcon/>
                    </IconButton>

                    <IconButton>
                        <ChatIcon/>
                    </IconButton>

                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>

                </div>

        </div>
            
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">

                    <SearchOutlined/>
                    <input placeholder="Search or start new chat" 
                    type="text"/>

                </div>
                

            </div>

            <div className="sidebar__chats">
                <SidebarChat/>
                <SidebarChat/>
                <SidebarChat/>

                </div>


            
            
        </div>
    )
}

export default Sidebar
