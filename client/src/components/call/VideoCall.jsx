import React from "react";
import dynamic from "next/dynamic";
import { useStateProvider } from "@/context/Statecontext";
const Container = dynamic(() => import("./Container"), { ssr: false});
import { useEffect } from "react";



function VideoCall() {
  const [ { userInfo, videoCall, socket } ] = useStateProvider();

  useEffect(() => {
    if (videoCall.type === "out-going") {
      socket.current.emit("outgoing-video-call", {
        to: videoCall.id,
        from: {
          id: userInfo.id,
          profilePicture: userInfo.profilePic,
          name: userInfo.name,
        },
        callType: videoCall.callType,
        roomId: videoCall.roomId,
      });
    }
  }, [videoCall]);

  return <Container data = {videoCall}/>;
}

export default VideoCall;
