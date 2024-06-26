import React, { useRef, useEffect, useState, use } from "react";
import { useStateProvider } from "@/context/Statecontext";
import { calculateTime } from "@/utils/CalculateTime";
import MessageStatus from "../common/MessageStatus";
import ImageMessage from "./ImageMessage";
import dynamic from "next/dynamic";
import SearchMessages from "./SearchMessages";
const VoiceMessage = dynamic(() => import("./VoiceMessage"), { ssr: false });

function ChatContainer() {
  const [{ userInfo, currentChatUser, messages, messagesSearch }, dispatch] = useStateProvider();
  const [searchText, setSearchText] = useState("");
  const [searchedMessages, setSearchedMessages] = useState([]);
  const [searchedMessageIndex, setSearchedMessageIndex] = useState(0);

  const messageRefs = useRef([]);
    searchedMessages.forEach((mymessage) => {
      console.log("len", searchedMessages.length);
      console.log(mymessage.index);
      console.log(mymessage);
    })

  const highlightText = (text, searchText) => {
    if (!searchText) return text;
    const parts = text.split(new RegExp(`(${searchText})`, "gi"));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === searchText.toLowerCase() ? (
            <span key={index} style={{ backgroundColor: "yellow" }}>
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };


  useEffect(() => {
    if(searchText !== "") {
      setSearchedMessages(
        messages
          .map((singlemessage, index) => ({
            ...singlemessage,
            index,
          }))
          .filter(
            (singlemessage) =>
              singlemessage.type === "text" &&
              singlemessage.message.toLowerCase().includes(searchText.toLowerCase())
          )
      );
    }
    setSearchedMessageIndex(0);
  }, [searchText, messages]);

  useEffect(() => {
    if (searchedMessages.length > 0) {
      const currentMessageRef = messageRefs.current[searchedMessages[searchedMessageIndex].index];
      if (currentMessageRef) {
        currentMessageRef.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [searchedMessageIndex, searchedMessages]);

  return (
    <>
      <div style={styles.outermostdiv}>
        <div style={styles.allmessagesDiv}>
          {messages.map((message, index) => (
            <div
              key={index}
              style={dynamicStyles(message, userInfo).singleMessage}
              ref={(el) => (messageRefs.current[index] = el)}
            >
              {message.type === "text" && (
                <div style={dynamicStyles(message, userInfo).messageBubble}>
                  <div style={styles.messageText}>
                    {messagesSearch &&
                    searchedMessages.length > 0 &&
                    message.id === searchedMessages[searchedMessageIndex].id
                      ? highlightText(message.message, searchText)
                      : message.message}
                  </div>
                  <div style={styles.timeWithStatus}>
                    <div style={styles.timeStyle}>{calculateTime(message.createdAt)}</div>
                    <div style={styles.messageStatus}>
                      {message.senderId === userInfo.id && (
                        <MessageStatus messageStatus={message.messageStatus} />
                      )}
                    </div>
                  </div>
                </div>
              )}
              {message.type === "image" && <ImageMessage message={message} />}
              {message.type === "audio" && <VoiceMessage message={message} />}
            </div>
          ))}
        </div>
        {messagesSearch && (
          <div style={styles.searchMessageSlide}>
            <SearchMessages 
              messageRefs={messageRefs} 
              searchedMessageIndex={searchedMessageIndex}
              setSearchedMessageIndex={setSearchedMessageIndex}
              searchedMessages={searchedMessages}
              searchText={searchText}
              setSearchText={setSearchText}
              setSearchedMessages={setSearchedMessages}
            />
          </div>
        )}
      </div>
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 12px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f0f0f0;
            border-radius: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #a0a0a0;
            border-radius: 6px;
            border: 3px solid #f0f0f0;
          }
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #a0a0a0 #f0f0f0;
          }
        `}
      </style>
    </>
  );
}

const styles = {
  outermostdiv: {
    maxHeight: "83vh",
    height: "100%",
    width: "100%",
    overflowY: "auto",
    overflowX: "hidden",
  },
  allmessagesDiv: {
    height: "100%",
    width: "100%",
    backgroundImage: "url('./chat_back.webp')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: "0.8",
    padding: "10px 16px",
    overflowY: "scroll",
  },
  messageText: {
    maxWidth: "400px",
    wordWrap: "break-word",
  },
  timeWithStatus: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "4px",
    marginTop: "4px",
  },
  timeStyle: {
    fontSize: "0.75rem",
    color: "#999",
  },
  messageStatus: {
    fontSize: "0.75rem",
  },
  searchMessageSlide: {
    position: "absolute",
    top: "3rem",
    right: "3rem",
  },
};

const dynamicStyles = (message, userInfo) => ({
  singleMessage: {
    display: "flex",
    justifyContent:
      message.senderId === userInfo.id ? "flex-end" : "flex-start",
    padding: "4px 0",
  },
  messageBubble: {
    backgroundColor: message.senderId === userInfo.id ? "#DCF8C6" : "#FFF",
    borderRadius: "12px",
    padding: "8px",
    boxShadow: "0 1px 1px rgba(0,0,0,0.1)",
  },
});

export default ChatContainer;
