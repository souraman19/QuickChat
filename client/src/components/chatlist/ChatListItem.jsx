import React from "react";
import { useState } from "react";
import Avatar from "../common/Avatar";

function ChatListItem({ data, key, isContact }) {
  const [hover, setHover] = useState(false);

  return (
    <div 
      style={{...styles.outermostDiv, backgroundColor: hover ? "#f0f0f6" : "white"}}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >

      <div style={styles.AvatarDiv}>
        <Avatar type={"sm"} image={data?.profilePic} changeOption={false} />
      </div>

      <div style={styles.nameWithInformation}>
        <div>{data?.name}</div>
        <div>{data?.about || "\u00A0"}</div>
      </div>

      {!isContact && (
        <div style = {styles.timeWithCount}>
        <span style={styles.time}>9:39 pm</span>
        <div style={styles.Unread}>1</div> 
      </div>
      )

      }

    </div>
  );
}

const styles = {
  outermostDiv: {
    // border:"1px solid black",
    display: "flex",
    flexDirection:"row",
    paddingTop: "0.7rem",
    paddingBottom: "0.7rem",

  },
  AvatarDiv: {
    flex:"1",
    // border:"1px solid black",
    display: "flex",
    flexDirection:"row",
    justifyContent:"center",
  },
  nameWithInformation: {
    marginLeft:"0.4rem",
    display:"flex",
    flexDirection:"column",
    flex:"4",
    // border:"1px solid black",
  },
  timeWithCount:{
    display:"flex",
    flexDirection:"column",
    flex:"1.2",
    // border:"1px solid black", 
    alignItems:"center",
    gap:"0.2rem"
  },
  time:{
    fontSize:"0.8rem",
  },
  Unread:{
    backgroundColor: "#4CAF50",
    color: "white",
    borderRadius: "50%",
    width: "1.2rem",
    height: "1.2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "0.8rem",
  }
};

export default ChatListItem;
