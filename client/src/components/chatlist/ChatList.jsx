import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import List from "./List";
import ChatListHeader from "./ChatListHeader";
import ContactsList from "./ContactsList";
import { useStateProvider } from "@/context/Statecontext";

function ChatList() {

  const [{ contactsPage }] = useStateProvider();
  const [currentPageType, setCurrentPageType] = useState("default");

  useEffect(() => {
    if(contactsPage) setCurrentPageType("show-all-contacts");
    else setCurrentPageType("default");
  }, [contactsPage])
  

  return <div style={{backgroundColor:"#f9f5f5", borderLeft:"2px black grey", borderRight:"1.5px solid black"}}>
    {currentPageType === "default" && (
      <div>
        <ChatListHeader />
        <List />
      </div>
    )}
    {currentPageType === "show-all-contacts" && (
      <div>
        <ContactsList />
      </div>
    )}
  </div>;
}

export default ChatList;
