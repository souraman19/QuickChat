import React from "react";
import { useState } from "react";
import Avatar from "../common/Avatar";
import { reducerCases } from "@/context/Constants";
import { useStateProvider } from "@/context/Statecontext";
import MessageStatus from "../common/MessageStatus";
import { FaCamera, FaMicrophone } from "react-icons/fa";
import { calculateTime } from "@/utils/CalculateTime";

function ChatListItem({ data, isContact = false }) {
  const [{ userInfo, currentChatUser }, dispatch] = useStateProvider();
  const handleClick = () => {
    // if(currentChatUser?.id === data?.id){
    dispatch({
      type: reducerCases.CHANGE_CURRENT_CHAT_USER,
      user: { ...data },
    });

    if (isContact) dispatch({ type: reducerCases.SET_ALL_CONTACTS_PAGE });
    // }
  };
  const [hover, setHover] = useState(false);

  return (
    <div
      style={{
        ...styles.outermostDiv,
        backgroundColor: hover ? "#f0f0f6" : "white",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
    >
      <div style={styles.AvatarDiv}>
        <Avatar type={"sm"} image={data?.profilePic} changeOption={false} />
      </div>

      <div style={styles.nameWithInformation}>
        <div style={styles.nameStyle}>{data?.name}</div>
        <div>
          {isContact ? (
            data?.about || "\u00A0"
          ) : (
            < div style={styles.messageStatusWithLastMessageStyle}>
              <div style={styles.messageStatusStyle}>
                {data.senderId === userInfo.id && (
                  <MessageStatus messageStatus={data.messageStatus} />
                  
                )}
              </div>
              <div>{data.type === "text" && <span>{data.message}</span>}</div>
              <div>{data.type === "image" && <span><FaCamera style={{fontSize:"0.8rem"}}/> Image </span>}</div>
              <div>{data.type === "audio" && <span><FaMicrophone style={{fontSize:"0.8rem"}}/> Audio </span>}</div>
            </ div>
          )}
        </div>
      </div>

      {!isContact && (
        <div style={styles.timeWithCount}>
          <span style={dynamicStyles.time}>{calculateTime(data.createdAt)}</span>
          {data.totalUnreadMessages > 0 && (
            <div style={styles.Unread}>{data.totalUnreadMessages}</div>
          )}
        </div>
      )}
    </div>
  );
}

const dynamicStyles = (data) => ({
  time: {
    fontSize: "0.8rem",
    color: data.totalUnreadMessages > 0 ? "green" : "black",
  },
});
const styles = {
  outermostDiv: {
    // border:"1px solid black",
    display: "flex",
    flexDirection: "row",
    paddingTop: "0.7rem",
    paddingBottom: "0.7rem",
  },
  nameStyle: {
    fontSize: "1.15rem",
    fontWeight: 600,
  },
  AvatarDiv: {
    flex: "1",
    // border:"1px solid black",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  nameWithInformation: {
    marginLeft: "0.4rem",
    display: "flex",
    flexDirection: "column",
    flex: "4",
    // border:"1px solid black",
  },
  messageStatusWithLastMessageStyle:{
    display:"flex",
    flexDirection:"row",
  },
  messageStatusStyle:{
    marginRight:"0.3rem",
  },
  timeWithCount: {
    display: "flex",
    flexDirection: "column",
    flex: "1.2",
    // border:"1px solid black",
    alignItems: "center",
    gap: "0.2rem",
  },
  Unread: {
    backgroundColor: "#4CAF50",
    color: "white",
    borderRadius: "50%",
    width: "1.2rem",
    height: "1.2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "0.8rem",
  },
};

export default ChatListItem;
