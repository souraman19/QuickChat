import React from "react";
import { useStateProvider } from "@/context/Statecontext";
import { reducerCases } from "@/context/Constants";

function IncomingVideoCall() {
  const [{ incomingVideoCall, socket, callAccepted }, dispatch] = useStateProvider();

  const acceptCall = () => {
    dispatch({
      type: reducerCases.SET_CALL_ACCEPTED, 
      callAccepted: true,
    })
    // console.log(callAccepted);
    dispatch({
      type: reducerCases.SET_VIDEO_CALL,
      videoCall: {
        ...incomingVideoCall,
        type: "in-coming",
      }
    })
    socket.current.emit("accept-incoming-call", {id: incomingVideoCall.id});
    dispatch({
      type: reducerCases.SET_INCOMING_VIDEO_CALL,
      incomingVideoCall: undefined,
    })
  };

  const rejectCall = () => {
    socket.current.emit("reject-video-call", { from : incomingVideoCall.id});
    dispatch({
      type: reducerCases.END_CALL,
    })
    dispatch({
      type: reducerCases.SET_CALL_ACCEPTED, 
      callAccepted: false,
    })
  };

  return (
    <div style={styles.container}>
      <div style={styles.avatarContainer}>
        <img 
          src={incomingVideoCall.profilePicture} 
          alt="avatar" 
          style={styles.avatar}
        />
      </div>
      <div style={styles.infoContainer}>
        <div style={styles.callerName}>{incomingVideoCall.name}</div>
        <div style={styles.callType}>Incoming Video Call</div>
        <div style={styles.buttonsContainer}>
          <button onClick={acceptCall} style={{ ...styles.button, ...styles.acceptButton }}>Accept</button>
          <button onClick={rejectCall} style={{ ...styles.button, ...styles.rejectButton }}>Reject</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '250px',
    height: '250px',
    borderRadius: '25px',
    backgroundColor: '#fff',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    padding: '30px',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    // border: '2px solid #e6e6e6',  
  },
  avatarContainer: {
    marginBottom: '20px',
  },
  avatar: {
    width: '6rem',
    height: '6rem',
    borderRadius: '50%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out',
  },
  avatarContainerHover: {
    transform: 'scale(1.05)',
  },
  infoContainer: {
    width: '100%',
  },
  callerName: {
    fontSize: '26px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333',
  },
  callType: {
    fontSize: '18px',
    color: '#777',
    marginBottom: '30px',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    padding: '12px 25px',
    border: 'none',
    borderRadius: '25px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    width: '100px',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  rejectButton: {
    backgroundColor: '#F44336',
    color: 'white',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  }
};

export default IncomingVideoCall;
