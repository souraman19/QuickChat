import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStateProvider } from "@/context/Statecontext";
import Avatar from "@/components/common/Avatar";
import { MdOutlineCallEnd } from "react-icons/md";
import { reducerCases } from "@/context/Constants";
import { GET_CALL_TOKEN } from "@/utils/ApiRoutes";

function Container({ data }) {
  const [{ userInfo, socket }, dispatch] = useStateProvider();
  const [theCallAccepted, setTheCallAccepted] = useState(false);
  const [token, setToken] = useState(undefined);
  const [zgVar, setZgVar] = useState(undefined);
  const [localStream, setLocalStream] = useState(undefined);
  const [publishStream, setPublishStream] = useState(undefined);

  useEffect(() => {
    if (data.type === "out-going") {
      socket.current.on("accept-call", () => {
        console.log("Call accepted");
        setTheCallAccepted(true);
      });
    } else {
      setTimeout(() => {
        console.log("Incoming call accepted automatically");
        setTheCallAccepted(true);
      }, 1000);
    }
  }, [data]);

  useEffect(() => {
    const getToken = async () => {
      try {
        const {
          data: { token: returnedToken },
        } = await axios.get(`${GET_CALL_TOKEN}/${userInfo.id}`);
        console.log("Token received:", returnedToken);
        setToken(returnedToken);
      } catch (err) {
        console.error("Error fetching token:", err);
      }
    };
    if (theCallAccepted) {
      getToken();
    }
  }, [theCallAccepted]);

  useEffect(() => {
    const startCall = async () => {
      import("zego-express-engine-webrtc").then(
        async ({ ZegoExpressEngine }) => {
          const zg = new ZegoExpressEngine(
            process.env.NEXT_PUBLIC_ZEGO_APP_ID,
            process.env.NEXT_PUBLIC_ZEGO_SERVER_ID
          );
          console.log("ZegoExpressEngine initialized");
          setZgVar(zg);

          zg.on(
            "roomStreamUpdate",
            async (roomId, updateType, streamList, extendedData) => {
              console.log("Room stream update:", { roomId, updateType, streamList, extendedData });
              if (updateType === "ADD") {
                const rmVideo = document.getElementById("remote-video");
                const vd = document.createElement(
                  data.callType === "video" ? "video" : "audio"
                );
                vd.id = streamList[0].streamID;
                vd.autoplay = true;
                vd.playsInline = true;
                vd.muted = false;
                if (rmVideo) {
                  rmVideo.appendChild(vd);
                }
                const stream = await zg.startPlayingStream(streamList[0].streamID, {
                  audio: true,
                  video: true,
                });
                vd.srcObject = stream;
              } else if (
                updateType === "DELETE" &&
                zg &&
                localStream &&
                streamList[0].streamID
              ) {
                zg.destroyStream(localStream);
                zg.stopPublishingStream(streamList[0].streamID);
                zg.logoutRoom(data.roomId.toString());
                dispatch({ type: reducerCases.END_CALL });
              }
            }
          );

          await zg.loginRoom(
            data.roomId.toString(),
            token,
            { userID: userInfo.id.toString(), userName: userInfo.name },
            { userUpdate: true }
          );
          console.log("Logged into room:", data.roomId.toString());

          const localStream = await zg.createStream({
            camera: {
              audio: true,
              video: data.callType === "video" ? true : false,
            },
          });
          const localVideo = document.getElementById("local-audio");
          const videoElement = document.createElement(
            data.callType === "video" ? "video" : "audio"
          );
          videoElement.id = "video-local-zego";
          videoElement.className = "h-28 w-32";
          videoElement.autoplay = true;
          videoElement.muted = false;
          videoElement.playsInline = true;

          localVideo.appendChild(videoElement);
          const td = document.getElementById("video-local-zego");
          td.srcObject = localStream;

          const streamID = "123" + Date.now();
          setPublishStream(streamID);
          setLocalStream(localStream);
          zg.startPublishingStream(streamID, localStream);
          console.log("Started publishing stream:", streamID);

          // Debug and Validate MediaStreamTrack
          const track = localStream.getTracks()[0]; // Get the first track
          if (track instanceof MediaStreamTrack) {
            console.log("Valid MediaStreamTrack:", track);
          } else {
            console.error("Invalid MediaStreamTrack:", track);
          }
        }
      );
    };
    if (token) {
      startCall();
    }
  }, [token]);

  const endCall = () => {
    const id = data.id;
    if (zgVar && localStream && publishStream) {
      zgVar.destroyStream(localStream);
      zgVar.stopPublishingStream(publishStream);
      zgVar.logoutRoom(data.roomId.toString());
    }
    if (data.callType === "voice") {
      socket.current.emit("reject-voice-call", { from: id });
    } else {
      socket.current.emit("reject-video-call", { from: id });
    }
    dispatch({ type: "END_CALL" });
    dispatch({
      type: reducerCases.SET_CALL_ACCEPTED,
      callAccepted: false,
    });
    console.log("Call ended");
  };

  return (
    <div style={styles.container}>
      <span style={styles.name}>{data.name}</span>
      <div style={styles.status}>
        {theCallAccepted && data.callType !== "video"
          ? "On going Call"
          : "Calling..."}
      </div>

      {(!theCallAccepted || data.callType === "voice") && (
        <div style={styles.avatar}>
          <Avatar
            type="md"
            image={data.profilePicture || data.profilePic}
            changeOption={false}
          />
        </div>
      )}
      <div id="remote-video">
        <div id="local-audio"></div>
      </div>
      <div style={styles.endCallButton}>
        <MdOutlineCallEnd onClick={endCall} />
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    paddingLeft: "100px",
    paddingRight: "100px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    maxWidth: "300px",
    height: "350px",
    margin: "auto",
    marginTop: "10%",
    backgroundColor: "#f5f5f5",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
  },
  name: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  status: {
    fontSize: "16px",
    marginBottom: "10px",
  },
  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    overflow: "hidden",
    marginBottom: "10px",
  },
  endCallButton: {
    fontSize: "30px",
    color: "red",
    cursor: "pointer",
    marginTop: "20px",
  },
};

export default Container;
