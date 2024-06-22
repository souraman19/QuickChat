import React from "react";
import { AiOutlineSmile, AiOutlineLike } from 'react-icons/ai';
import { FaWallet } from 'react-icons/fa';
import { IoMdSend } from "react-icons/io";
import { AiOutlinePaperClip } from 'react-icons/ai';
import { AiOutlineAudio } from 'react-icons/ai';

function MessageBar(){
    return (<div style={styles.outermostContainer}>
        <div style = {styles.emojistyle}>
            <AiOutlineSmile style = {styles.iconStyle}/>
        </div>
        <div style = {styles.textboxdiv}>
            <input type="text" 
                placeholder="Message..."
                style = {styles.textholdstyle}
            />
        </div>
        <div style = {styles.iconbox}>
            {/* <IoMdSend style = {styles.iconStyle}/> */}
            <AiOutlineAudio style = {styles.iconStyle}/>
            <AiOutlinePaperClip style = {styles.iconStyle}/>
            <FaWallet style = {styles.WalleticonStyle}/>
        </div>
    </div>);
}

const styles = {
    outermostContainer:{
        height: "100%",
        width: "100%",
        backgroundColor:"#f9f5f5",
        display:"flex",
        alignItems: "center"
    },
    emojistyle:{
        flex:"0.8",
        // border:"2px solid red",
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
    },
    textboxdiv:{
        flex:"10",
        // border:"2px solid red",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        marginRight:"0.4rem",
    },
    textholdstyle:{
        // height:"90%",  // Increase the height to 100%
        width:"100%",
        border: "1px solid #ccc", // Optional: add a border for visibility
        padding: "0.3rem",
        fontSize: "1rem",
    },
    iconbox:{
        flex:"1.8",
        // border:"2px solid red",
        display: "flex",
        gap:"0.8rem",
        alignItems:"center",
        justifyContent:"center"
    },
    iconStyle:{
        fontSize:"1.8rem"
    },
    WalleticonStyle:{
        fontSize:"1.5rem"
    },

}

export default MessageBar;