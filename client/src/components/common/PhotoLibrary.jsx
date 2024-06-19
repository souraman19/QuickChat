import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";

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
};
export default PhotoLibrary;
