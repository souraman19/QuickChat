import React from "react";
import ChatList from "./chatlist/ChatList";
import Empty from "./Empty";
import Chat from "./chat/Chat";
import LeftMenuBar from "./LeftMenuBar/LeftMenuBar";
import { onAuthStateChanged } from "firebase/auth";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import {useRouter} from "next/router";
import { useStateProvider } from "@/context/Statecontext";
import { reducerCases } from "@/context/Constants";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import axios from "axios";
import { useEffect, useState } from "react";
import GapLeftOfChatList from "./GapLeftOfChatList";

function Main() {
  const router = useRouter();
  const [{userInfo}, dispatch] = useStateProvider();
  const [redirectLogin, setRedirectLogin] = useState(false);

  useEffect(() => {
    if(redirectLogin) router.push("/login"); 
  }, [redirectLogin])


  onAuthStateChanged(firebaseAuth, async (currentUser) => {
    if(!currentUser) setRedirectLogin(true);
    if(!userInfo && currentUser?.email) {
        const data = await axios.post(CHECK_USER_ROUTE, {email: currentUser.email});
        if(!data.status){
          router.push("/login");
        }
        if(data?.data){
          const {id, name, email, profilePic, status} = data.data;
          dispatch({type: reducerCases.SET_USER_INFO, userInfo: {
            id,
            name,
            email,
            profilePic,
            status
          }})
        }
    }
  })



  return <div style={styles.outerContainer}>
    <LeftMenuBar />
    <GapLeftOfChatList />
    <ChatList />
    {/* <Empty />  */}
    <Chat />
  </div>;
}


const styles = {
  outerContainer:{
    display: "grid",
    gridTemplateColumns: "0.7fr 0.07fr 4.5fr 12fr",
    overflow: "hidden",
    height:"100vh",
    width: "100vw"
  }
}

export default Main;
