import React, { useEffect, useRef, useState } from "react";
import { FaMicrophone, FaPauseCircle, FaTrash, FaPlay, FaStop } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import WaveSurfer from "wavesurfer.js";
import { useStateProvider } from "@/context/Statecontext";
import axios from "axios";
import { ADD_AUDIO_MESSAGE } from "@/utils/ApiRoutes";
import { reducerCases } from "@/context/Constants";

function CaptureAudio({ hideAudioRecord }) {
  const [{ userInfo, currentChatUser, socket }, dispatch] = useStateProvider();

  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [waveform, setWaveform] = useState(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [renderedAudio, setRenderedAudio] = useState(null);

  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const waveformRef = useRef(null);

  useEffect(() => {
    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#ccc",
      progressColor: "#4a9eff",
      cursorColor: "#7ae3c3",
      barWidth: 2,
      height: 30,
      responsive: true,
    });
    setWaveform(wavesurfer);

    wavesurfer.on("finish", () => {
      setIsPlaying(false);
    });

    return () => {
      wavesurfer.destroy();
    };
  }, []);

  useEffect(() => {
    if (waveform) handleStartRecording();
  }, [waveform]);

  const handleStartRecording = () => {
    setRecordingDuration(0);
    setCurrentPlaybackTime(0);
    setTotalDuration(0);
    setRecordedAudio(null);
    setIsRecording(true);
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioRef.current.srcObject = stream;

      const chunks = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
        const audioURL = URL.createObjectURL(blob);
        const audio = new Audio(audioURL);
        setRecordedAudio(audio);

        waveform.load(audioURL);
      };

      mediaRecorder.start();
    }).catch(error => {
      console.log("Error in accessing microphone: ", error);
    });
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      waveform.stop();

      const audioChunks = [];
      mediaRecorderRef.current.addEventListener("dataavailable", (event) => {
        audioChunks.push(event.data);
      });

      mediaRecorderRef.current.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
        const audioFile = new File([audioBlob], "recording.mp3");
        setRenderedAudio(audioFile);
      });
    }
  };

  useEffect(() => {
    if (recordedAudio) {
      const updatePlaybackTime = () => {
        setCurrentPlaybackTime(recordedAudio.currentTime);
      };
      recordedAudio.addEventListener("timeupdate", updatePlaybackTime);
      return () => {
        recordedAudio.removeEventListener("timeupdate", updatePlaybackTime);
      };
    }
  }, [recordedAudio]);

  const handlePlayRecording = () => {
    if (recordedAudio) {
      waveform.stop();
      waveform.play();
      recordedAudio.play();
      setIsPlaying(true);
    }
  };

  const handlePauseRecording = () => {
    waveform.stop();
    recordedAudio.pause();
    setIsPlaying(false);
  };

  const sendRecording = async() => {
    // alert("Send Recording");
    try {
      const formData = new FormData();
      formData.append("audio", renderedAudio);
      const response = await axios.post(ADD_AUDIO_MESSAGE, formData, {
        headers: {
          "Content-Type": "multiport/form-data",
        },
        params: {
          fromUser: userInfo?.id,
          toUser: currentChatUser?.id,
        },
      });
      if (response.status === 201) {
        socket.current.emit("send-msg", {
          //This will emit the send-msg event to the server with the message data.
          toUser: currentChatUser?.id,
          fromUser: userInfo?.id,
          message: response.data.message,
        });
        // addMessageToState(data.message, true);
        dispatch({
          type: reducerCases.ADD_MESSAGE,
          newMessage: {
            ...response.data.message,
          },
          fromSelf: true,
        });
        // setMessage("");
      }
    } catch (err) {
      console.error(err);
    }

  };

  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <FaTrash
          onClick={() => hideAudioRecord()}
          style={styles.icon}
        />
      </div>
      <div style={styles.recordingSection}>
        {isRecording ? (
          <div style={styles.recordingStatus}>
            <span>Recording...</span>
            <span>{formatTime(recordingDuration)}</span>
          </div>
        ) : (
          <div style={styles.playbackControls}>
            {recordedAudio && (
              <>
                {!isPlaying ? (
                  <FaPlay onClick={handlePlayRecording} style={styles.icon} />
                ) : (
                  <FaStop onClick={handlePauseRecording} style={styles.icon} />
                )}
              </>
            )}
          </div>
        )}
        <div ref={waveformRef} hidden={isRecording} style={styles.waveform} />
        {recordedAudio && (
          <span>
            {isPlaying
              ? formatTime(currentPlaybackTime)
              : formatTime(totalDuration)}
          </span>
        )}
        <audio ref={audioRef} hidden />
        <div style={styles.controls}>
          {!isRecording ? (
            <FaMicrophone onClick={handleStartRecording} style={styles.icon} />
          ) : (
            <FaPauseCircle onClick={handleStopRecording} style={styles.icon} />
          )}
          <IoMdSend
            title="Send"
            onClick={sendRecording}
            style={styles.icon}
          />
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '15px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    width: '15rem',
    maxWidth: '350px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #f1f1f1',
  },
  topBar: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '10px',
  },
  recordingSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  recordingStatus: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '10px',
    fontSize: '14px',
    color: '#888',
  },
  playbackControls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: '10px',
  },
  waveform: {
    width: '100%',
    marginBottom: '10px',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  icon: {
    cursor: 'pointer',
    fontSize: '20px',
    color: '#007bff',
    margin: '0 5px',
  },
};

export default CaptureAudio;
