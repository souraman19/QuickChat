import React from "react";
import Image from "next/image";
import { HOST } from "@/utils/ApiRoutes";
import { useStateProvider } from "@/context/Statecontext";
import { calculateTime } from "@/utils/CalculateTime";
import MessageStatus from "../common/MessageStatus";

function ImageMessage({ message }) {
  const [{ userInfo, currentChatUser }] = useStateProvider();

  const isCurrentUser = message.senderId === userInfo.id;
  const containerStyle = isCurrentUser
    ? styles.sentMessage
    : styles.receivedMessage;

  return (
    <div style={{ ...styles.outermostContainer, ...containerStyle }}>
      <div style={styles.imageContainer}>
        <Image
          style={{ borderRadius: '7px',}}
          src={`${HOST}/${message.message}`}
          alt="image"
          height={300}
          width={300}
        />
      </div>
      <div style={styles.timeWithStatus}>
        <div style={styles.timeStyle}>{calculateTime(message.createdAt)}</div>
        <div style={styles.messageStatus}>
          {isCurrentUser && <MessageStatus messageStatus={message.messageStatus} />}
        </div>
      </div>
    </div>
  );
}

const styles = {
  outermostContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: '10px',
    padding: '2px',
    borderRadius: '10px',
    overflow: 'hidden',
    maxWidth: '80%',
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6', // Light green color for sent messages
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF', // White color for received messages
  },
  imageContainer: {
    position: 'relative',
  },
  timeWithStatus: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5px 10px',
    fontSize: '12px',
    color: '#999',
  },
  timeStyle: {
    alignSelf: 'center',
  },
  messageStatus: {
    display: 'flex',
    alignItems: 'center',
  },
};

export default ImageMessage;
