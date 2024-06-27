import React, { useEffect, useState } from "react";
import ChatListItem from "./ChatListItem";
import axios from "axios";
import { GET_INITIAL_CONTACTS } from "@/utils/ApiRoutes";
import { reducerCases } from "@/context/Constants";
import { useStateProvider } from "@/context/Statecontext";


function List() {
  const [{userInfo, userContacts, onlineUsers, filteredContacts, contactSearch}, dispatch] = useStateProvider();

  useEffect(() => {
    const getContacts = async() => {
      try{
        const { data : {users, onlineUsers}} = await axios(`${GET_INITIAL_CONTACTS}/${userInfo.id}`); 
        dispatch({type: reducerCases.SET_USER_CONTACTS, userContacts: users});
        dispatch({type: reducerCases.SET_ONLINE_USERS, onlineUsers});
      }catch(err){
        console.log(err);
      }
    };

    if(userInfo?.id) getContacts();
  }, [userInfo])

  useEffect(() => {
    console.log(contactSearch);
  }, [contactSearch])

  return <div>
    {contactSearch !== "" ?
      (
        filteredContacts.map((contact) => (
          <ChatListItem data = {contact} key={contact.id} />
        ))
      ) : 
      (
        userContacts.map((contact) => (
          <ChatListItem data={contact} key={contact.id} />
        ))
      )
    }
    {}
  </div>;
}

export default List;
