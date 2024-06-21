import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { FaTimes } from 'react-icons/fa';
import { useEffect, useRef } from "react";

const clientId = "857079739116-jb3h2b10pkjie045e9l493ct9le162el.apps.googleusercontent.com";


const allPhotos = [
  "/avatars/1.png",
  "/avatars/2.png",
  "/avatars/3.png",
  "/avatars/4.png",
  "/avatars/5.png",
  "/avatars/6.png",
  "/avatars/7.png",
  "/avatars/8.png",
  "/avatars/9.png"
]

function PhotoLibrary({currentOption, image, setImage, myImage, setMyImage, setChangeImage}) {
  const [googlePhotos, setGooglePhotos] = useState([]);

  function setLibraryImage(img){
    setImage(img);
    setMyImage(img); 
    setChangeImage(false);
  }

  const onSuccess = (response) => {
    const token = response.accessToken;
    fetchPhotos(token);
  }

  const onFailure = (error) => {
    console.error('Login failed: ', error);
  }

  const fetchPhotos = async (token) => {
    const response = await fetch('https://photoslibrary.googleapis.com/v1/mediaItems', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setGooglePhotos(data.mediaItems || []);
  }


  const videoRef = useRef(null); // A videoRef is created using useRef to get a reference to the <video> element.
  //console.log(videoRef.current); // Outputs: <video> element


  useEffect(() => {
    let stream; // A stream variable to store the video stream from the camera.
    if (currentOption === "Take Photo") {
      const startCamera = async () => {
        stream = await navigator.mediaDevices.getUserMedia({ // The getUserMedia method is used to get the video stream from the camera. or request access to the user's camera. and microp.
          video: true,
          audio: false
        });
        videoRef.current.srcObject = stream; // stream is assigned to the srcObject property of the video element referenced by videoRef.
        //to display the live stream in the video element through srcObj property of <video> media element.

      };
      startCamera(); // The startCamera function is called to start the camera when the currentOption is "Take Photo".

      return () => { // The return statement is used to clean up the video stream when the component is unmounted or when currentOption changes
        if (stream) { 
          stream.getTracks().forEach((track) => track.stop()); // The getTracks method is used to get all the tracks from the stream
          // The stream is stopped and the srcObject of the video element is set to null.
        }
        if (videoRef.current) { // The videoRef.current is checked to avoid null reference errors.
          videoRef.current.srcObject = null; // The srcObject of the video element is set to null.
          // This stops the video stream and clears the video element.
        }
      };
    } 
  }, [currentOption]);


  const capturePhoto = () => { //to take a snapshot from the video feed and save it as an image.
    const canvas = document.createElement("canvas"); //A new <canvas> element is created dynamically in the DOM. This element is not visible to the user unless it's appended to the document.
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0, 300, 150); 
    //canvas.getContext("2d") gets the 2D rendering context for the canvas. The 2D context provides various methods to draw shapes, text, images, and other objects.
    //The drawImage method is used to draw an image, video, or canvas onto the canvas.
    //The first number 0 represents the x-coordinate of the top-left corner of the rectangle.
    //The second number 0 represents the y-coordinate of the top-left corner of the rectangle.
    //The third number 300 represents the width of the rectangle.
    //The fourth number 150 represents the height of the rectangle.

    setImage(canvas.toDataURL("image/jpeg")); 
    setMyImage(canvas.toDataURL("image/jpeg")); 
    //converts the content of the canvas to a base64-encoded data URL representing the image in JPEG format

    setChangeImage(false);
  }


  return <div style={styles.scrollableContainer}>

    {currentOption === "Get from Library" && (
        <div style={styles.gridContainer}>
        {allPhotos.map((photo, index) => (
          <img 
            key={index}
            src={photo}
            alt="avatar"
            style={styles.gridItem}
            onClick={() => setLibraryImage(photo)}
            />
        ))}
        </div>
    )}

    {currentOption === "Google Photos" && (
      <div>
        <GoogleLogin
            clientId={clientId}
            buttonText="Login With Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            scope="https://www.googleapis.com/auth/photoslibrary.readonly.appcreateddata"
            render={(renderProps) => (
              <button id="google-login-button" onClick={() => renderProps.onClick()} disabled={renderProps.disabled}>
                Login With Google
              </button>
            )}
          />
      <div className="gridContainet">
        {googlePhotos.map((photo, index) => {
        <img 
          key = {index}
          src = {photo.baseUrl}
          alt = {'photo-${index}'}
          style={styles.gridItem}
        />
      })}
      </div>
      </div>
    )}

    
{currentOption === "Take Photo" && (
        <div style={styles.cameraContainer}>
          <video
            style={styles.video}
            id="video"
            autoPlay 
            ref={videoRef} 
          ></video>
          <button
            style={styles.captureButton}
            onClick={capturePhoto}
          ></button>
        </div>
      )}
  </div>;
}


const styles = {
  scrollableContainer:{
    height: "360px",
    overflowY: "scroll",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)", // 3 columns
    gap: "10px", // gap between items
  },
  gridItem: {
    width: "100%",
    height: "auto",
    borderRadius: "8px",
    cursor: "pointer",
  },
  cameraContainer: {
    position: "relative",
    height: "22.5rem",
    width: "20rem",
    overflow: "hidden",
    // border: "2px solid green",
  },
  video: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    // overflow: "hidden",
    // border: "2px solid red",
  },
  captureButton: {
    position: "absolute",
    bottom: "10px",
    left: "50%",
    transform: "translateX(-50%)",
    border: "2px solid green",
    borderRadius: "50%",
    height: "35px",
    width: "35px",
    cursor: "pointer",
    background: "white",
  },
};
export default PhotoLibrary;
