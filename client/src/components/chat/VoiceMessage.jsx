import { useStateProvider } from "@/context/Statecontext";
import { HOST } from "@/utils/ApiRoutes";
import React from "react";
import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import Avatar from "../common/Avatar";
import { calculateTime } from "@/utils/CalculateTime";
import MessageStatus from "../common/MessageStatus";
import { FaPause, FaPlay } from "react-icons/fa";

function VoiceMessage({ message }) {
  const [{ userInfo, currentChatUser, socket }, dispatch] = useStateProvider();
  const [audioMessage, setAudioMessage] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  const waveformRef = useRef(null);
  const waveform = useRef(null);

  useEffect(() => {
    if (waveform.current === null) {
      waveform.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#ddd",
        progressColor: "#4a9eff",
        cursorColor: "#7ae3c3",
        barWidth: 2,
        height: 30,
        responsive: true,
      });

      waveform.current.on("finish", () => {
        setIsPlaying(false);
      });
    }

    return () => {
      if (waveform.current) {
        waveform.current.destroy();
        waveform.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (waveform.current) {
      const audioURL = `${HOST}/${message.message}`;
      const audio = new Audio(audioURL);
      setAudioMessage(audio);
      waveform.current.load(audioURL);
      waveform.current.on("ready", () => {
        setTotalDuration(waveform.current.getDuration());
      });
    }
  }, [message.message]);

  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    if (audioMessage) {
      const updatePlaybackTime = () => {
        setCurrentPlaybackTime(audioMessage.currentTime);
      };
      audioMessage.addEventListener("timeupdate", updatePlaybackTime);
      return () => {
        audioMessage.removeEventListener("timeupdate", updatePlaybackTime);
      };
    }
  }, [audioMessage]);

  const handlePlayAudio = () => {
    if (audioMessage) {
      waveform.current.stop();
      waveform.current.play();
      audioMessage.play();
      setIsPlaying(true);
    }
  };

  const handlePauseAudio = () => {
    waveform.current.stop();
    audioMessage.pause();
    setIsPlaying(false);
  };

  const isSender = message.senderId === userInfo.id;
  const messageClass = isSender ? "senderMessage" : "receiverMessage";

  return (
    <div className={`messageContainer ${messageClass}`}>
      {!isSender && (
        <Avatar image={currentChatUser.profilePic} type="sm" className="avatar" />
      )}
      <div className="messageContent">
        <div className="audioControls">
          {!isPlaying ? (
            <FaPlay onClick={handlePlayAudio} className="playPauseIcon" />
          ) : (
            <FaPause onClick={handlePauseAudio} className="playPauseIcon" />
          )}
          <div ref={waveformRef} className="waveform" />
        </div>
        <div className="timeInfo">
          <span>{formatTime(isPlaying ? currentPlaybackTime : totalDuration)}</span>
          <span className="messageTime">{calculateTime(message.createdAt)}</span>
          {isSender && (
            <MessageStatus messageStatus={message.messageStatus} />
          )}
        </div>
      </div>
      {isSender && (
        <Avatar image={userInfo.profilePic} type="sm" className="avatar" />
      )}
      <style jsx>{`
        .messageContainer {
          display: flex;
          align-items: flex-end;
          margin: 10px 0;
          padding: 15px;
          border-radius: 20px;
          width: 30%;
          word-wrap: break-word;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .messageContainer:hover {
          transform: scale(1.02);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }
        .senderMessage {
          background: linear-gradient(135deg, #dcf8c6, #aff1b6);
          align-self: flex-end;
        }
        .receiverMessage {
          background: linear-gradient(135deg, #fff, #f1f1f1);
          align-self: flex-start;
          border: 1px solid #e5e5e5;
        }
        .messageContent {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 5px;
          margin: 0 10px;
          width: 100%;
        }
        .audioControls {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .playPauseIcon {
          font-size: 1.5em;
          cursor: pointer;
          margin-right: 10px;
          color: #4a9eff;
          transition: color 0.2s ease;
        }
        .playPauseIcon:hover {
          color: #007bff;
        }
        .waveform {
          flex: 1;
          margin-right: 10px;
          border-radius: 5px;
          overflow: hidden;
        }
        .timeInfo {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 5px;
          font-size: 0.9em;
        }
        .messageTime {
          font-size: 0.8em;
          color: #999;
        }
        .avatar {
          margin: 0 5px;
        }
      `}</style>
    </div>
  );
}

export default VoiceMessage;
