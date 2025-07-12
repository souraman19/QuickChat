import { useStateProvider } from "@/context/Statecontext";
import { GET_ALL_CONTACTS } from "@/utils/ApiRoutes";
import React, { useState } from "react";
import { useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { IoMdSearch } from "react-icons/io";
import axios, { all } from "axios";
import ChatListItem from "./ChatListItem";

function ContactsList() {
  const [allContacts, setAllContacts] = useState([]);
  const [{}, dispatch]  = useStateProvider();
  const [searchText, setSearchText] = useState("");
  const [searchedContacts, setSearchedContacts] = useState([]);
  
  
  useEffect(() => {
    const getAllContacts = async () => {
      try {
        const {
          data: { users },
        } = await axios.get(GET_ALL_CONTACTS);
        setAllContacts(users);
        setSearchedContacts(users);
      } catch (err) {
        console.log(err);
      }
    };
    getAllContacts();
  }, []);


  useEffect(() => {
    if(searchText.length > 0) {
      const filteredData = {};
      Object.keys(allContacts).forEach((key) => {
        filteredData[key] = allContacts[key].filter((obj) => {
          return obj.name.toLowerCase().includes(searchText.toLowerCase());
        });  
      });
      setSearchedContacts(filteredData);
    } else {
      setSearchedContacts(allContacts);
    }
  }, [searchText]);


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
          <input 
            type="text" 
            value = {searchText}
            onChange = {(e) => setSearchText(e.target.value)}
            placeholder="Search contacts" 
            style={styles.inputArea}
          />
        </div>
      </div>
      {
        Object.entries(searchedContacts).map(([initialLetter, userList]) => {
          // console.log(allContacts);
          return (
            <div 
              key = {Date.now() + initialLetter}  
              style = {styles.SingleLetterContactList}
            >
              {/* <span>{initialLetter}</span> */}
              {userList.map((contact) => {
                return <ChatListItem 
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
  SingleLetterContactList: {
    marginTop: "0.5rem",
    paddingLeft: "0.75rem",
    paddingRight: "0.75rem",
  },
  outermostDiv: {
    marginTop: "0rem",
    marginBottom: "1rem",
    color: "#fff",
    backgroundColor: "#0e0e10",
    height: "100%",
  },
  headOfContactList: {
    paddingTop: "1rem",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    height: "4.5rem",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  backArrowStyle: {
    fontSize: "1.4rem",
    marginRight: "1rem",
    cursor: "pointer",
    color: "#ccc",
  },
  arrowContainer: {
    marginLeft: "1rem",
    display: "flex",
    alignItems: "center",
    color: "#eee",
    fontWeight: 600,
    fontSize: "1rem",
  },
  searchDiv: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginTop: "0.5rem",
    paddingLeft: "0.75rem",
    paddingRight: "0.75rem",
  },
  iomdsearch: {
    fontSize: "1.5rem",
    color: "#aaa",
    marginRight: "0.5rem",
  },
  inputArea: {
    width: "100%",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.08)",
    backgroundColor: "rgba(255,255,255,0.05)",
    color: "#fff",
    outline: "none",
  },
};

export default ContactsList;
