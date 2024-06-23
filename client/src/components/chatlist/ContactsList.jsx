import { useStateProvider } from "@/context/Statecontext";
import { GET_ALL_CONTACTS } from "@/utils/ApiRoutes";
import React, { useState } from "react";
import { useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { IoMdSearch } from "react-icons/io";
import axios from "axios";
import ChatListItem from "./ChatListItem";

function ContactsList() {
  const [allContacts, setAllContacts] = useState([]);
  const [{}, dispatch]  = useStateProvider();

  useEffect(() => {
    //runs only one time means at the time of intial render
    const getAllContacts = async () => {
      try {
        const {
          data: { users },
        } = await axios.get(GET_ALL_CONTACTS);
        setAllContacts(users);
        // console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    getAllContacts();
  }, []);

  return (
    <div style={styles.outermostDiv}>
      <div style={styles.headOfContactList}>
        <div style={styles.arrowContainer}>
          <BiArrowBack 
            onClick={() => dispatch({type: "SET_ALL_CONTACTS_PAGE"})}
            style={styles.backArrowStyle} 
          />
          <span>New Message</span>
        </div>
        <div style={styles.searchDiv}>
          <IoMdSearch style={styles.iomdsearch} />
          <input type="text" placeholder="Search contacts" style={styles.inputArea}/>
        </div>
      </div>
      {
        Object.entries(allContacts).map(([initialLetter, userList]) => {
          return (
            <div 
              key = {Date.now() + initialLetter}
              style = {styles.SingleLetterContactList}
            >
              {/* <span>{initialLetter}</span> */}
              {userList.map((contact) => {
                return <ChatListItem 
                  style = {styles.ChatListItemStyle}
                  data = {contact}
                  key = {contact.id}
                  isContact = {true}
                />
              })}
            </div>
          );
        })
      }
    </div>
  );
}

const styles = {
  SingleLetterContactList:{
    
  },
  ChatListItemStyle:{

  },
  outermostDiv: {
    marginTop: "0rem",
    marginBottom: "1rem",
  },
  headOfContactList:{
    paddingTop: "1rem",
    borderBottom:"1px solid #ccc",
    height:"4.5rem",
    backgroundColor:"#f9f5f5",
  },
  backArrowStyle: {
    fontSize: "1.4rem",
    marginRight: "4.5rem",
    cursor:"pointer",

  },
  arrowContainer: {
    marginLeft: "1rem",
    display: "flex",
    alignItems: "center",
  },
  searchDiv: {
    width:"100%",
    display: "flex",
    alignItems: "center",
    // justifyContent: "center",
    marginTop: "0.5rem",
  },
  iomdsearch:{
    fontSize:"1.5rem",
    marginLeft:"0.5rem",
    marginRight:"0.5rem"
  },
  inputArea:{
    width:"75%",
    padding:"0.25rem",
  },
};
export default ContactsList;
