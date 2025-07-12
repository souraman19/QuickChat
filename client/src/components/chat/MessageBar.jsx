import React from "react";
import { AiOutlineSmile, AiOutlineLike } from "react-icons/ai";
import { FaWallet } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { AiOutlinePaperClip } from "react-icons/ai";
import { AiOutlineAudio } from "react-icons/ai";
import { ADD_IMAGE_MESSAGE, ADD_NEW_MESSAGE } from "@/utils/ApiRoutes";
import { useStateProvider } from "@/context/Statecontext";
import axios from "axios";
import { reducerCases } from "@/context/Constants";
import EmojiPicker from "emoji-picker-react";
import { useEffect } from "react";
import { useState } from "react";
import PhotoPicker from "./../common/PhotoPicker";
import dynamic from "next/dynamic";

const CaptureAudio = dynamic(() => import("../common/CaptureAudio"), {
    ssr: false,
});

function MessageBar() {
  const [{ userInfo, currentChatUser, socket }, dispatch] = useStateProvider();
  const [message, setMessage] = React.useState("");
  const [showEmojiList, setShowEmojiList] = useState(false);
  const emojiRef = React.useRef(null);
  const [grabPhoto, setGrabPhoto] = useState(false);
  const [showAudioRecorder, setShowAudioRecorder] = useState(false);

  useEffect(() => {
    const handleClickedOutSide = (e) => {
      // alert("a");
      if (e.target.id !== "emojiPickerList") {
        // alert("b");
        // console.log(emojiRef.current);
        // console.log(e.target);
        // console.log(e.target.id);
        // console.log(emojiRef.current?.contains(e.target));
        if (emojiRef.current && !emojiRef.current.contains(e.target)) {
          // alert("c");
          setShowEmojiList(false);
          // alert(showEmojiList);
        }
      }
    };
    document.addEventListener("click", handleClickedOutSide);
    return () => {
      document.removeEventListener("click", handleClickedOutSide);
    };
  }, []);

  useEffect(() => {
    if (grabPhoto) {
      // If the grabPhoto state is true, the photo picker is opened
      const data = document.getElementById("photo-picker");
      data.click(); //The click() method simulates a mouse click on an element.
      //This line programmatically triggers a click event on the file input element. This opens the file picker dialog, allowing the user to select a photo from their device.

      //After selecting a file, the focus returns to the document, triggering the onfocus event handler on the document body.
      document.body.onfocus = (e) => {
        setTimeout(() => {
          setGrabPhoto(false);
        }, 1000);
        // This ensures that the file picker dialog doesn't repeatedly open.
      };
    }
  }, [grabPhoto]);

  const addMessageToState = (message, fromSelf) => {
    dispatch({
      type: reducerCases.ADD_MESSAGE,
      newMessage: message,
      fromSelf,
    });
  };

  //   useEffect(() => {
  //       if (socket.current && !socketEvent) {
  //           socket.current.on("msg-receive", (data) => {
  //             alert(socketEvent + "1");
  //             // alert("1");
  //             dispatch({
  //                 type: reducerCases.ADD_MESSAGE,
  //                 newMessage: {
  //                     ...data.message,
  //                 },
  //                 fromSelf: false,
  //             });
  //             setSocketEvent(true);
  //             alert(socketEvent+ "02");
  //         });
  //         // alert(socketEvent+ "3");

  //     }
  // }, [socket.current]);

  const photoPickerChange = async (e) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      const response = await axios.post(ADD_IMAGE_MESSAGE, formData, {
        headers: {
          "Content-Type": "multiport/form-data",
        },
        params: {
          fromUser: userInfo?.id,
          toUser: currentChatUser?.id,
        },
      });
      if (response.status === 201) {
        socket.current.emit("send-msg", {
          //This will emit the send-msg event to the server with the message data.
          toUser: currentChatUser?.id,
          fromUser: userInfo?.id,
          message: response.data.message,
        });
        // addMessageToState(data.message, true);
        dispatch({
          type: reducerCases.ADD_MESSAGE,
          newMessage: {
            ...response.data.message,
          },
          fromSelf: true,
        });
        setMessage("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEmojiShow = () => {
    // alert("Emoji Clicked");
    setShowEmojiList(!showEmojiList);
  };

  const handleEmojiClick = (emoji) => {
    setMessage((prevMessage) => (prevMessage += emoji.emoji));
  };

  const sendMessageHandler = async () => {
    try {
      const { data } = await axios.post(ADD_NEW_MESSAGE, {
        message,
        fromUser: userInfo?.id,
        toUser: currentChatUser?.id,
      });
      // console.log(data);
      socket.current.emit("send-msg", {
        //This will emit the send-msg event to the server with the message data.
        toUser: currentChatUser?.id,
        fromUser: userInfo?.id,
        message: data.message,
      });
      dispatch({
        type: reducerCases.ADD_MESSAGE, //This will dispatch an action to add the message to the context.
        newMessage: { //The newMessage object contains the message data from the server.
          ...data.message,
        },
        fromSelf: true,
      });
      setMessage("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={styles.outermostContainer}>
        
      {!showAudioRecorder && (
        <>
          <div style={styles.emojistyle}>
            <AiOutlineSmile
              style={styles.iconStyle}
              onClick={() => handleEmojiShow()}
            />
            {showEmojiList && (
              <EmojiPicker
                style={{ position: "absolute", bottom: "3rem", left: "24rem" }}
                id="emojiPickerList"
                ref={emojiRef}
                onEmojiClick={handleEmojiClick}
              />
            )}
          </div>
          <div style={styles.textboxdiv}>
            <input
              type="text"
              placeholder="Message..."
              style={styles.textholdstyle}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div style={styles.iconbox}>
            {/* <IoMdSend style = {styles.iconStyle}/> */}

            {message.length !== 0 ? (
              <IoMdSend style={styles.iconStyle} onClick={sendMessageHandler} />
            ) : (
              <AiOutlineAudio
                style={styles.iconStyle}
                onClick={() => setShowAudioRecorder(true)}
              />
            )}

            <AiOutlinePaperClip
              style={styles.iconStyle}
              onClick={() => setGrabPhoto(true)}
            />
            <FaWallet style={styles.WalleticonStyle} />
          </div>
          {grabPhoto && <PhotoPicker onChange={photoPickerChange} />}
        </>
      )}

      {showAudioRecorder && <>
        <div style={styles.audioRecordBoxSyle}>
            <CaptureAudio hideAudioRecord = {() => setShowAudioRecorder(false)}/>
        </div>
      </>}

    </div>
  );
}

const styles = {
  outermostContainer: {
    height: "100%",
    width: "100%",
    background: "rgba(15, 15, 25, 0.85)", // darker tone
    backdropFilter: "blur(8px)",
    borderTop: "1px solid rgba(255, 255, 255, 0.07)",
    display: "flex",
    alignItems: "center",
    padding: "0.6rem 1.2rem",
    gap: "0.8rem",
    boxShadow: "0 -2px 12px rgba(0, 0, 0, 0.4)",
  },
  emojistyle: {
    flex: "0.5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  textboxdiv: {
    flex: "8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  textholdstyle: {
    width: "100%",
    border: "1px solid rgba(180, 180, 255, 0.1)",
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: "16px",
    padding: "0.65rem 1rem",
    color: "#e0e0f0",
    fontSize: "1rem",
    outline: "none",
    backdropFilter: "blur(12px)",
    boxShadow: "inset 0 0 4px rgba(255, 255, 255, 0.05)",
  },
  iconbox: {
    flex: "2",
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    justifyContent: "center",
  },
  iconStyle: {
    fontSize: "1.7rem",
    cursor: "pointer",
    color: "#b2a1ff", // Neon purple tone
    transition: "transform 0.2s ease, color 0.3s ease",
  },
  WalleticonStyle: {
    fontSize: "1.4rem",
    color: "#ffb74d", // Warm neon amber
    cursor: "pointer",
    transition: "transform 0.2s ease",
  },
  audioRecordBoxSyle: {
    position: "absolute",
    bottom: "5rem",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 999,
  },
};


export default MessageBar;
