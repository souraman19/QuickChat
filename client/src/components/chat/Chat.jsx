import React from "react";
import ChatHeader from "./ChatHeader";
import ChatContainer from "./ChatContainer";
import MessageBar from "./MessageBar";

function Chat() {
  return <div style={styles.outermostdiv}>
    <div style={{flex:"1"}}><ChatHeader /></div>
    <div style={{flex:"8.6"}}><ChatContainer /></div>
    <div style={{flex:"0.8"}}><MessageBar /></div>
  </div>;
}

const styles = {
  outermostdiv:{
    display: "flex",
    flexDirection:"column"
  },

}

export default Chat;
