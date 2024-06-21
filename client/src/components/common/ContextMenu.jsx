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
    // console.log(e);
    const file = e.target.files[0]; //extracts the first file from the file input element that triggered the event. e.target refers to the file input element, and files[0] is the first file in the list of selected files.
    const reader = new FileReader(); //The FileReader object lets web applications asynchronously read the contents of files (or raw data buffers) stored on the user's computer, using File or Blob objects to specify the file or data to read.
    const data = document.createElement("img");  //The document.createElement() method creates the HTML element specified by tagName.'

    reader.onload = function (event) { //This line sets up an onload event handler for the FileReader. When the file is read successfully, this function is executed.
      data.src = event.target.result; //src attribute of the img element to the result of the file read operation (a data URL representing the file's contents ).
      data.setAttribute("data-src", event.target.result); //The setAttribute() method adds a new attribute or changes the value of an existing attribute on the specified element.
    };

    reader.readAsDataURL(file); 
    //The readAsDataURL method is used to read the contents of the specified Blob or File. 
    //When the read operation is finished, the readyState becomes DONE, and triggers the onload event handler. 
    //At that time, the result is a data URL that contains a base64-encoded string representing the file's contents.


    //The delay might be added to ensure that the image is fully loaded and its data URL is properly set before updating the state.
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

  const closeCamera = () => {
    // if (videoRef.current.srcObject) {
    //   videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    // }
    // setIsCameraOpen(false);
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
            onClick={() => {
              setIsContextVisible(false);
              // closeCamera();
            }}
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
            onClick={() => {
              setIsContextVisible(false);
              // closeCamera();
            }}
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
