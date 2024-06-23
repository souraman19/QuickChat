import React from "react";
import { AiOutlineSmile, AiOutlineLike } from 'react-icons/ai';
import { FaWallet } from 'react-icons/fa';
import { IoMdSend } from "react-icons/io";
import { AiOutlinePaperClip } from 'react-icons/ai';
import { AiOutlineAudio } from 'react-icons/ai';
import { ADD_NEW_MESSAGE } from "@/utils/ApiRoutes";
import { useStateProvider } from "@/context/Statecontext";
import axios from "axios";
import { reducerCases } from "@/context/Constants";
import EmojiPicker from "emoji-picker-react";
import { useEffect } from "react";
import { useState } from "react";

function MessageBar(){
    const [{userInfo, currentChatUser, socket}, dispatch] = useStateProvider();
    const [message, setMessage] = React.useState("");
    const [showEmojiList, setShowEmojiList] = useState(false);
    const emojiRef = React.useRef(null);
    
    useEffect(() => {
        const handleClickedOutSide = (e) => {
            // alert("a");
            if(e.target.id !== "emojiPickerList"){
                // alert("b");
                // console.log(emojiRef.current);
                // console.log(e.target);
                // console.log(e.target.id);
                // console.log(emojiRef.current?.contains(e.target));
                if(emojiRef.current && !emojiRef.current.contains(e.target)){
                    // alert("c");
                    setShowEmojiList(false);
                    // alert(showEmojiList);
                }
            }
        };
            document.addEventListener("click", handleClickedOutSide);
        return () => {
            document.removeEventListener("click", handleClickedOutSide);
        }
    }, []);

    const handleEmojiShow = () => {
        // alert("Emoji Clicked");
        setShowEmojiList(!showEmojiList);
    }

    const handleEmojiClick = (emoji) => {
        setMessage((prevMessage) => prevMessage += emoji.emoji);
    }



    const sendMessageHandler = async() => {
        try{
            const {data} = await axios.post(ADD_NEW_MESSAGE, {
                message,
                fromUser: userInfo?.id,
                toUser: currentChatUser?.id,
            });
            // console.log(data);
            socket.current.emit("send-msg", { //This will emit the send-msg event to the server with the message data.
                toUser: currentChatUser?.id,
                fromUser: userInfo?.id,
                message: data.message,
            });
            dispatch({
                type: reducerCases.ADD_MESSAGE,
                newMessage: {
                    ...data.message,
                },
                fromSelf: true,
            })
            setMessage("");
        }catch(err){
            console.error(err);
        }
    }

    
    return (<div style={styles.outermostContainer}>
        <div style = {styles.emojistyle}>
            <AiOutlineSmile 
                style = {styles.iconStyle}
                onClick={() => handleEmojiShow()}
            />
            {showEmojiList && 
                        <EmojiPicker 
                        style={{ position: "absolute", bottom: "3rem", left:"24rem" }}
                        id = "emojiPickerList"
                        ref={emojiRef}
                        onEmojiClick={handleEmojiClick} />
            }
        </div>
        <div style = {styles.textboxdiv}>
            <input type="text" 
                placeholder="Message..."
                style = {styles.textholdstyle}
                value={message}
                onChange={e => setMessage(e.target.value)}
            />
        </div>
        <div style = {styles.iconbox}>
            {/* <IoMdSend style = {styles.iconStyle}/> */}
            <IoMdSend style = {styles.iconStyle} 
                onClick={sendMessageHandler}

            />
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
        fontSize:"1.8rem",
        cursor: "pointer"
    },
    WalleticonStyle:{
        fontSize:"1.5rem"
    },

}

export default MessageBar;