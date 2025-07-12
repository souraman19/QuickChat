import React, { useRef, useEffect, useState } from "react";
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

  const highlightText = (text, searchText) => {
    if (!searchText) return text;
    const parts = text.split(new RegExp(`(${searchText})`, "gi"));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === searchText.toLowerCase() ? (
            <span key={index} style={{ backgroundColor: "#ffee58", color: "#000", fontWeight: 600 }}>
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
    if (searchText !== "") {
      setSearchedMessages(
        messages
          .map((msg, index) => ({ ...msg, index }))
          .filter(
            (msg) =>
              msg.type === "text" &&
              msg.message.toLowerCase().includes(searchText.toLowerCase())
          )
      );
    } else {
      setSearchedMessages([]);
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
        <div className="starry-background" />
        <div style={styles.allmessagesDiv} className="custom-scrollbar">
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
                    message.id === searchedMessages[searchedMessageIndex]?.id
                      ? highlightText(message.message, searchText)
                      : message.message}
                  </div>
                  <div style={styles.timeWithStatus}>
                    <div style={styles.timeStyle}>{calculateTime(message.createdAt)}</div>
                    {message.senderId === userInfo.id && (
                      <div style={styles.messageStatus}>
                        <MessageStatus messageStatus={message.messageStatus} />
                      </div>
                    )}
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
    width: 8px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #0e0e10;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #333;
    border-radius: 10px;
    border: 2px solid #0e0e10;
  }
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #333 #0e0e10;
  }

  ::selection {
    background: #00e5ff44;
  }

  .starry-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    background: radial-gradient(white 1px, transparent 1px),
                radial-gradient(white 1px, transparent 1px);
    background-size: 80px 80px;
    background-position: 0 0, 40px 40px;
    animation: twinkle 15s linear infinite;
    opacity: 0.2;
    z-index: 0;
    pointer-events: none;
  }

  @keyframes twinkle {
    0% {
      transform: translateY(0px);
    }
    100% {
      transform: translateY(-100px);
    }
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
  backgroundColor: "#0e0e10",
  position: "relative",
  zIndex: 1,
},
  allmessagesDiv: {
  height: "100%",
  width: "100%",
  padding: "10px 16px",
  overflowY: "scroll",
  position: "relative",
  zIndex: 2,
},
  messageText: {
    maxWidth: "420px",
    wordWrap: "break-word",
    color: "#e0e0e0",
  },
  timeWithStatus: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "4px",
    marginTop: "4px",
  },
  timeStyle: {
    fontSize: "0.75rem",
    color: "#aaa",
  },
  messageStatus: {
    fontSize: "0.75rem",
  },
  searchMessageSlide: {
    position: "absolute",
    top: "3rem",
    right: "3rem",
    zIndex: 5,
  },
};

const dynamicStyles = (message, userInfo) => ({
  singleMessage: {
    display: "flex",
    justifyContent: message.senderId === userInfo.id ? "flex-end" : "flex-start",
    padding: "6px 0",
    zIndex: 2,
  },
messageBubble: {
  background: message.senderId === userInfo.id
    ? "linear-gradient(135deg, #3f51b5, #5c6bc0, #7986cb)" // Deep blue-indigo gradient
    : "linear-gradient(to right, #1a1a2f, #2b2b3d)", 
  color: "#ffffff",
  borderRadius: "16px",
  padding: "12px 16px",
  boxShadow: message.senderId === userInfo.id
    ? "0 0 12px #00c85388"
    : "0 0 12px #2a2a4088",
  fontSize: "1rem",
  backdropFilter: "blur(8px)",
  transition: "transform 0.2s ease-in-out",
  transform: "scale(1)",
  maxWidth: "80%",
  wordWrap: "break-word",
},

});

export default ChatContainer;
