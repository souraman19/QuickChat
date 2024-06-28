import React from "react";
import { FaArchive, FaPhone } from "react-icons/fa";
import { IoMdSearch, IoMdBookmark, IoMdSettings } from "react-icons/io";
import { AiOutlineHome } from "react-icons/ai";
import Avatar from "../common/Avatar";

function LeftMenuBar() {
  return (
    <div style={styles.outermostContainer}>
      <div style={styles.upperContainer}>
        <AiOutlineHome style={styles.IoIcon} />
        <FaPhone style={styles.FaIcon} />
        <IoMdBookmark style={styles.IoIcon} />
        <IoMdSettings style={styles.IoIcon} />
        <FaArchive style={styles.FaIcon} />
      </div>
      <div style={styles.lowerContainer}>
        <Avatar type={"sm"} image={"/chat_img1.png"} changeOption={false} />
      </div>
    </div>
  );
}

export default LeftMenuBar;

const styles = {
  outermostContainer: {
    // border: "1px solid black",
    backgroundColor: "rgb(29 33 36)",
    display: "grid",
    gridTemplateRows: "7fr 1fr",
    paddingTop: "0.6rem",
  },
  upperContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1.5rem",
  },
  lowerContainer:{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  IoIcon: {
    color: "white",
    fontSize: "1.5rem",
    cursor: "pointer",

  },
  FaIcon: {
    color: "white",
    fontSize: "1.2rem",
    cursor: "pointer",
    
  },
};
