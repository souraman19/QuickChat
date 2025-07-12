import React from "react";
import Avatar from "./../common/Avatar";
import { IoMdSearch } from "react-icons/io";
import { IoEllipsisVertical, IoCall, IoVideocam } from 'react-icons/io5';
import { useStateProvider } from "@/context/Statecontext";
import { reducerCases } from "@/context/Constants";


function ChatHeader() {
  const [{userInfo, currentChatUser}, dispatch] = useStateProvider();

  const handleVoiceCall = () => {
    dispatch({type: reducerCases.SET_VOICE_CALL, 
      voiceCall:{
        ...currentChatUser,
        type: "out-going",
        callType: "voice",
        roomId: Date.now(),
      }
    })
  }

  const handleVideoCall = () => {
    dispatch({type: reducerCases.SET_VIDEO_CALL, 
      videoCall:{
        ...currentChatUser,
        type: "out-going",
        callType: "video",
        roomId: Date.now(),
      }
    })
  }


  // console.log(userInfo);
  return (
    <div style={styles.outermostContainer}>

      <div style={styles.leftContainer}>
        <div style={styles.AvatarDiv}>
          <Avatar type={"sm"} image={currentChatUser?.profilePic} changeOption={false} />
        </div>
        <div style={styles.nameWithOnlineStatus}>
          <div style={styles.NameStyle}>{currentChatUser?.name || `Bai Strisker`}</div>
          <div style={styles.statusStyle}>online</div>
        </div>
      </div>

      <div style={styles.rightContainer}>
        <IoCall 
          style={styles.IoIcon} 
          onClick={handleVoiceCall}
        />
        <IoVideocam 
          style={styles.IoIcon} 
          onClick={handleVideoCall}
        />
        <IoMdSearch style={{...styles.IoIcon, cursor: "pointer"} }
          onClick={() => dispatch({type: reducerCases.SET_MESSAGE_SEARCH})}
        />
        <IoEllipsisVertical style={styles.IoIcon} />
      </div>
    </div>
  );
}

const styles = {
  outermostContainer: {
    height: "3.5rem",
    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
    display: "grid",
    gridTemplateColumns: "3fr 1.3fr",
    padding: "0 0.75rem",
    backgroundColor: "#121417cc", // semi-transparent dark
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    alignItems: "center",
  },
  leftContainer: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
  },
  AvatarDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  nameWithOnlineStatus: {
    display: "flex",
    flexDirection: "column",
  },
  NameStyle: {
    fontSize: "1.05rem",
    color: "#f1f1f1",
    fontWeight: 600,
  },
  statusStyle: {
    fontSize: "0.78rem",
    color: "#77e88d",
    marginLeft: "0.2rem",
  },
  rightContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "1.2rem",
  },
  IoIcon: {
    color: "#cfd8dc",
    fontSize: "1.25rem",
    cursor: "pointer",
    transition: "color 0.3s ease, transform 0.3s ease",
  },
};


export default ChatHeader;
