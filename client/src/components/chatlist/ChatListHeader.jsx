import React from "react";
import { useStateProvider } from "@/context/Statecontext";
import Avatar from "../common/Avatar";

function ChatListHeader() {
   const [{ userInfo }, dispatch] = useStateProvider();
    // console.log(userInfo);

  return <div>
    <Avatar 
        type={"sm"}
        image = {userInfo?.profilePic}
        changeOption={false}
    />
  </div>;
}

export default ChatListHeader;