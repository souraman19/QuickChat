import React from "react";
import { useStateProvider } from "@/context/Statecontext";
import Avatar from "../common/Avatar";
import { FaEnvelope } from 'react-icons/fa';
import { RiFilterLine } from 'react-icons/ri';
import { reducerCases } from "@/context/Constants";


function ChatListHeader() {
   const [{ userInfo, contactSearch }, dispatch] = useStateProvider();
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
        <input 
            style={styles.searchBox}
            type="text" 
            placeholder="Search..." 
            value={contactSearch}
            onChange={(e) => dispatch({type: reducerCases.SET_CONTACT_SEARCH, contactSearch: e.target.value})}
        />
    </div>
    <div style = {styles.rightConatiner}>
        <RiFilterLine
            style={{cursor:"pointer"}}  
        />
    </div>
  </div>);
}

const styles = {
    searchBox:{
        padding: "0.48rem",
        paddingLeft: "0.91rem",
        paddingRight: "0.91rem",
        borderRadius: "0.5rem",
        // border: "2px solid black",
    },
    outermostContainer:{
        // paddingTop:"0.3rem",
        // paddingBottom:"0.3rem",
        display: "grid",
        gridTemplateColumns: "1fr 3.4fr 1fr",
        // border: "1px solid black"
        marginTop: "0.3rem",
        marginBottom: "0.4rem",
        backgroundColor: "#f5f5f5",
        height:"3rem",
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
        // backgroundColor: "#4CAF50",
        color:"white",
        borderRadius: "0.7rem",
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