import React from "react";
import SearchBar from "./SearchBar";
import List from "./List";
import ChatListHeader from "./ChatListHeader";

function ChatList() {
  

  return <div>
    <ChatListHeader />
    <SearchBar />
    <List />
  </div>;
}

export default ChatList;
