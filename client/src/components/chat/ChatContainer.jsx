import React from "react";

function ChatContainer() {
  return <div style={styles.outermostdiv}>
    <div style={styles.myStyle}>

    </div>
  </div>;
}

const styles = {
  outermostdiv:{
    height: "100%",
    width: "100%",
  },
  myStyle:{
    height: "100%",
    width: "100%",
    backgroundImage: "url('./chat_back.webp')",
    backgroundSize: "120%", 
    backgroundPosition: "center",
    opacity: "0.5"

  }
}

export default ChatContainer;
