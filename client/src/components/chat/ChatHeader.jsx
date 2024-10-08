import React from "react";
import Avatar from "./../common/Avatar";
import { IoMdSearch } from "react-icons/io";
import { IoEllipsisVertical, IoCall, IoVideocam } from 'react-icons/io5';
import { useStateProvider } from "@/context/Statecontext";
import { reducerCases } from "@/context/Constants";


function ChatHeader() {
  const [{userInfo, currentChatUser}, dispatch] = useStateProvider();
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
        <IoCall style={styles.IoIcon} />
        <IoVideocam style={styles.IoIcon} />
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
    // backgroundColor: "#f5f5f5",
    height: "3.5rem",
    borderBottom: "1.5px solid black",
    display: "grid",
    gridTemplateColumns: "3fr 1.3fr",
    paddingLeft:"0.3rem",
    paddingRight:"0.4rem"
  },
  leftContainer: {
    display: "flex",
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
    // border: "2px solid black",
    // backgroundColor:"yellow"
  },
  rightContainer: {
    // border: "2px solid pink",
    // backgroundColor:"blue",
    display:"flex",
    gap: "1rem",
    alignItems:"center",
    justifyContent:"right"
  },
  AvatarDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // border: "1px solid red",
    marginRight: "0.4rem"
  },
  nameWithOnlineStatus: {
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
    // justifyContent: "center",
    // border: "1px solid green",
  },
  NameStyle: {
    fontSize:"1.2rem"
  },
  statusStyle: {
    fontSize: "0.8rem",
    justifyContent:"left",
    marginLeft:"0.2rem",
    // backgroundColor: "red",
  },
  IoIcon: {
    color: "black",
    fontSize: "1.3rem",
  },

};

export default ChatHeader;
