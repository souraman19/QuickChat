import React from "react";
import { useRef } from "react";
import { FaCross, FaPen, FaRemoveFormat, FaWindowClose } from "react-icons/fa";
import PhotoPicker from "./PhotoPicker";
import { useState } from "react";
import PhotoLibrary from "./PhotoLibrary";

function ContextMenu({
  setIsContextVisible,
  grabPhoto,
  removePhoto,
  uploadPhoto,
  setImage,
  image,
}) {
  const [myImage, setMyImage] = useState(image);
  const [changeImage, setChangeImage] = useState(false);
  const [currentOption, setCurrentOption] = useState("Upload from device");

  const photoPickerChange = async (e) => {
    console.log(e);
    const file = e.target.files[0];
    const reader = new FileReader();
    const data = document.createElement("img");
    reader.onload = function (event) {
      data.src = event.target.result;
      data.setAttribute("data-src", event.target.result);
    };
    reader.readAsDataURL(file);
    setTimeout(() => {
      setMyImage(data.src);
      setImage(data.src);
    }, 100);
  };

  const removeProfilePic = () => {
    setImage("/default_avatar.png");
    setMyImage("/default_avatar.png");
    removePhoto();
  };

  const changeProfilePic = () => {
    setChangeImage(true);
    // uploadPhoto();
    // setChangeImage(false);
  };

  const uploadProfilePic = () => {
    uploadPhoto();
    setChangeImage(false);
  };

  return (
    <div>
      {!changeImage && (
        <div
          style={{
            width: "22rem",
            height: "22rem",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
          }}
        >
          <FaWindowClose
            style={{ cursor: "pointer" }}
            onClick={() => setIsContextVisible(false)}
          />
          <div
            style={{
              height: "70%",
              width: "70%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={myImage} style={{ width: "100%", height: "100%" }} />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <button
              style={{ width: "45%", height: "2rem", cursor: "pointer" }}
              onClick={changeProfilePic}
            >
              <FaPen />
              <span> Change </span>
            </button>
            <button
              style={{ width: "45%", height: "2rem", cursor: "pointer" }}
              onClick={removeProfilePic}
            >
              <FaCross />
              <span> Remove </span>
            </button>
          </div>

          {grabPhoto && <PhotoPicker onChange={photoPickerChange} />}
        </div>
      )}

      {changeImage && (
        <div
          style={{
            width: "37rem",
            height: "30rem",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
          }}
        >
          <FaWindowClose
            style={{ cursor: "pointer" }}
            onClick={() => setIsContextVisible(false)}
          />
          <div style={{ height: "10%", display: "flex", gap: "1.2rem" }}>
            <button
              style={{
                cursor: "pointer",
                paddingLeft: "12px",
                paddingRight: "12px",
                borderBottom:
                  currentOption === "Google Photos"
                    ? "4px solid blue"
                    : "2px solid black",
              }}
              onClick={() => setCurrentOption("Google Photos")}
            >
              Google Photos
            </button>
            <button
              onClick={() => uploadProfilePic()}
              style={{
                cursor: "pointer",
                paddingLeft: "12px",
                paddingRight: "12px",
                borderBottom:
                  currentOption === "Upload from device"
                    ? "4px solid blue"
                    : "2px solid black",
              }}
            >
              Upload from device
            </button>
            <button
              style={{
                cursor: "pointer",
                paddingLeft: "12px",
                paddingRight: "12px",
                borderBottom:
                  currentOption === "Get from Library"
                    ? "4px solid blue"
                    : "2px solid black",
              }}
              onClick={() => setCurrentOption("Get from Library")}
            >
              Get from Library
            </button>
            <button
              style={{
                cursor: "pointer",
                paddingLeft: "12px",
                paddingRight: "12px",
                borderBottom:
                  currentOption === "Take Photo"
                    ? "4px solid blue"
                    : "2px solid black",
              }}
              onClick={() => setCurrentOption("Take Photo")}
            >
              Take Photo
            </button>
          </div>
          <hr
            style={{ width: "100%", height: "1px", backgroundColor: "black"}}
          />
          <div style={{ height: "90%", backgroundColor: "grey" }}>
          <PhotoLibrary 
            currentOption={currentOption} 
            image={image}
            setImage={setImage} 
            myImage={myImage}
            setMyImage={setMyImage}
            setChangeImage={setChangeImage}
          />
          </div>

        </div>

      )}
      
    </div>
  );
}

export default ContextMenu;
