import React from "react";
import ChatList from "./chatlist/ChatList";
import Empty from "./Empty";
import Chat from "./chat/Chat";
import LeftMenuBar from "./LeftMenuBar/LeftMenuBar";
import { onAuthStateChanged } from "firebase/auth";
import { CHECK_USER_ROUTE, GET_MESSAGES, HOST } from "@/utils/ApiRoutes";
import {useRouter} from "next/router";
import { useStateProvider } from "@/context/Statecontext";
import { reducerCases } from "@/context/Constants";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import axios from "axios";
import { useEffect, useState } from "react";
import GapLeftOfChatList from "./GapLeftOfChatList";
import { io } from "socket.io-client";
import { useRef } from "react";
import VideoCall from "./call/VideoCall";
import VoiceCall from "./call/VoiceCall";
import IncomingVideoCall from "./common/IncomingVideoCall";
import IncomingCall from "./common/IncomingCall";

function Main() { 
  const router = useRouter();
  const [{userInfo, currentChatUser, messagesSearch, videoCall, voiceCall, incomingVideoCall, incomingVoiceCall}, dispatch] = useStateProvider();
  const [redirectLogin, setRedirectLogin] = useState(false);
  const [socketEvent, setSocketEvent] = useState(false); // to prevent multiple event listeners on socket
  const socket = useRef();

  useEffect(() => {
    if(redirectLogin) router.push("/login"); 
  }, [redirectLogin])

  //<<---------------------------{{{{ Changed Code }}}}------------------------------------------------------------------------>>

  // onAuthStateChanged(firebaseAuth, async (currentUser) => {
  //   if(!currentUser) setRedirectLogin(true);
  //   if(!userInfo && currentUser?.email) {
  //       const data = await axios.post(CHECK_USER_ROUTE, {email: currentUser.email});
  //       if(!data.status){
  //         router.push("/login");
  //       }
  //       if(data?.data){
  //         const {id, name, email, profilePic, status} = data.data;
  //         dispatch({type: reducerCases.SET_USER_INFO, userInfo: {
  //           id,
  //           name,
  //           email,
  //           profilePic,
  //           status
  //         }})
  //       }
  //   }
  // });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (currentUser) => {
        if (!currentUser) {
            router.push("/login");
            return;
        }
        if (currentUser?.email) {

          
            try {
                const { email } = currentUser;
                const { data } = await axios.post(CHECK_USER_ROUTE, { email });
                if (data?.status) {
                    const { id, name, email, profilePic, status } = data.data;
                    dispatch({
                        type: reducerCases.SET_USER_INFO,
                        userInfo: {
                            id,
                            name,
                            email,
                            profilePic,
                            status
                        }
                    });
                } else {
                    router.push("/onboarding");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                router.push("/login");
            }
        }
    });

    return () => unsubscribe();
}, [router, dispatch]);




//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(firebaseAuth, async (currentUser) => {
//         if (currentUser) {
//             const { email } = currentUser;
//             const { data } = await axios.post(CHECK_USER_ROUTE, { email });
//             if (data.status) {
//                 dispatch({
//                     type: reducerCases.SET_USER_INFO,
//                     userInfo: data.data
//                 });
//             } else {
//                 router.push("/onboarding");
//             }
//         } else {
//             router.push("/login");
//         }
//     });

//     return () => unsubscribe();
// }, [router, dispatch]);


  //<<---------------------------------------------------------------------------------------------------

  useEffect(() => { 
    if(userInfo) { 
      socket.current = io(HOST); //connect to the socket
      socket.current.emit("add-user", userInfo.id); 
      dispatch({type: reducerCases.SET_SOCKET, socket}); 
    }
  }, [userInfo]); 


  useEffect(() => {
    if(socket.current && !socketEvent){ 
      socket.current.on("msg-receive", (data) => {
        dispatch({
          type: reducerCases.ADD_MESSAGE, 
          newMessage:{
            ...data.message
          },
          fromSelf: false,
        });
      })

      socket.current.on("incoming-voice-call", ({from, roomId, callType}) => {
        dispatch({
          type: reducerCases.SET_INCOMING_VOICE_CALL,
          incomingVoiceCall: {...from, roomId, callType}
        });
      })

      socket.current.on("incoming-video-call", ({from, roomId, callType}) => {
        dispatch({
          type: reducerCases.SET_INCOMING_VIDEO_CALL,
          incomingVideoCall: {...from, roomId, callType}
        });
      })

      socket.current.on("voice-call-rejected", () => {
        dispatch({
          type: reducerCases.END_CALL, 
        });
      })

      socket.current.on("video-call-rejected", () => {
        dispatch({
          type: reducerCases.END_CALL, 
        });
      })

      socket.current.on("end-call", () => {
        dispatch({
          type: reducerCases.END_CALL,
        });
      });

      setSocketEvent(true); //to prevent multiple event listeners
    }
  }, [socket.current])

  useEffect(() => {
    try{
      const getMessages = async () => {
        const { data:{messages} } = await axios.get(`${GET_MESSAGES}/${userInfo?.id}/${currentChatUser?.id}`);
        dispatch({type: reducerCases.SET_MESSAGES, messages})
      };
      if(userInfo.id !== undefined && currentChatUser?.id){
        getMessages();
      }
    }catch(err){
      console.log(err);
    }

  }, [currentChatUser])

  // useEffect(() => {
  //   if (incomingVideoCall) {
  //     alert("Incoming video call!");
  //   } else {
  //     alert("No incoming video call!");
  //   }
  // }, []);


  return (<div style={styles.outermostContainer}>

    {incomingVideoCall && (
      <div style={styles.incomingVideoCallDiv}>
        <IncomingVideoCall />
      </div>
    )}

    {incomingVoiceCall && (
      <div style={styles.incomingVoiceCallDiv}>
         <IncomingCall />
      </div>
    )}
    {/* <IncomingVideoCall /> */}


    {videoCall && 
      <div style={styles.videoCallDiv}>
        <VideoCall />
      </div>
    }
    {voiceCall && 
      <div style={styles.voiceCallDiv}>
        <VoiceCall />
      </div>
    }
    {(!videoCall && !voiceCall) && <>
      <div style={styles.outerContainer}>
    <LeftMenuBar />
    <GapLeftOfChatList />
    <ChatList />
    {currentChatUser ? <Chat /> : <Empty />}
    {/* <Empty />  */}
    {/* <Chat /> */}
  </div>
    </>}
  </div>);
}


const styles = {
  incomingVideoCallDiv:{
    position: "absolute",
    bottom: "3rem",
    right: "2rem",
    // border: "2px solid red",
    zIndex: "100",
  },
  incomingVoiceCallDiv:{
    position: "absolute",
    bottom: "3rem",
    right: "2rem",
    // border: "2px solid red",
    zIndex: "100",
  },
  outermostContainer: {
    height: "100vh",
    width: "100vw",
    // overflowY: "hidden",
    // overflowX: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  videoCallDiv:{
    // height: "100vh",
    // width: "100vw",
    // overflow: "hidden",
  },
  voiceCallDiv:{
    // height: "100vh",
    // width: "100vw",
    // overflow: "hidden",
  },
  outerContainer:{
    display: "grid",
    gridTemplateColumns: "0.7fr 0.07fr 4.5fr 12fr",
    overflow: "hidden",
    height:"100vh",
    width: "100vw"
  }
}

export default Main;
