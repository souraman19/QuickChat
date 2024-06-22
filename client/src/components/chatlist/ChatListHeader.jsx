import React from "react";
import { useStateProvider } from "@/context/Statecontext";
import Avatar from "../common/Avatar";
import { FaEnvelope } from 'react-icons/fa';
import { RiFilterLine } from 'react-icons/ri';
import { reducerCases } from "@/context/Constants";


function ChatListHeader() {
   const [{ userInfo }, dispatch] = useStateProvider();
    // console.log(userInfo);

    const handleNewChatContactPage = () => {
        dispatch({type: reducerCases.SET_ALL_CONTACTS_PAGE })
    }

  return (<div style = {styles.outermostContainer}>
    <div style = {styles.leftContainer}>
        <FaEnvelope 
            title="New Chat"
            style={{cursor:"pointer"}}
            onClick={handleNewChatContactPage}
        />
    </div>
    <div style = {styles.middleContainer}>
        <span style={{fontSize:"1rem"}}>Chat</span>
        <span style={{fontSize:"1rem"}}>Status</span>
        <span style={{fontSize:"1rem"}}>Calls</span>
    </div>
    <div style = {styles.rightConatiner}>
        <RiFilterLine
            style={{cursor:"pointer"}}  
        />
    </div>
  </div>);
}

const styles = {
    outermostContainer:{
        // paddingTop:"0.3rem",
        // paddingBottom:"0.3rem",
        display: "grid",
        gridTemplateColumns: "1fr 3.4fr 1fr",
        // border: "1px solid black"
        backgroundColor: "#f5f5f5",
        height:"3.5rem",
        alignItems: "center",
        justifyContent: "center",
    },
    leftContainer:{
        // backgroundColor: "red",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }, 
    middleContainer:{
        height:"80%",
        backgroundColor: "black",
        color:"white",
        borderRadius: "1rem",
        display: "flex",
        flexDirection:"row",
        gap:"1rem",
        alignItems: "center",
        justifyContent: "center",
    },
    rightConatiner:{
        // backgroundColor: "red",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
}

export default ChatListHeader;