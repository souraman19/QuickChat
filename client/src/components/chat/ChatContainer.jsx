import React from "react";
import { useStateProvider } from "@/context/Statecontext";
import { calculateTime } from "@/utils/CalculateTime";
import MessageStatus from "../common/MessageStatus";
import ImageMessage from "./ImageMessage";
import { HOST } from "@/utils/ApiRoutes";

function ChatContainer() {
  const [{ userInfo, currentChatUser, messages }, dispatch] =
    useStateProvider();

  return (
    <>
      <div style={styles.outermostdiv}>
        <div style={styles.allmessagesDiv}>
          {messages.map((message, index) => {
            return (
              <>
                <div
                  key={index}
                  style={dynamicStyles(message, userInfo).singleMessage}
                >


                  {message.type === "text" && (
                    <div style={dynamicStyles(message, userInfo).messageBubble}>
                      <div style={styles.messageText}>{message.message}</div>
                      <div style={styles.timeWithStatus}>
                        <div style={styles.timeStyle}>
                          {calculateTime(message.createdAt)}
                        </div>
                        <div style={styles.messageStatus}>
                          {message.senderId === userInfo.id && (
                            <MessageStatus
                              messageStatus={message.messageStatus}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {message.type === "image" && (
                    <>
                      <ImageMessage message={message} />
                      {console.log(`${HOST}/${message.message}`)}
                    </>
                  )}

                </div>
              </>
            );
          })}
        </div>
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
    // overflowY:"hidden",
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
    borderRadius: "7.5px",
    padding: "8px 12px",
    boxShadow: "0 1px 1px rgba(0, 0, 0, 0.1)",
    maxWidth: "60%",
    position: "relative",
  },
});

export default ChatContainer;
