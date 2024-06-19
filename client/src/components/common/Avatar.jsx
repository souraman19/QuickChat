import React, { useEffect } from "react";
import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import ContextMenu from "./ContextMenu";

function Avatar({image , setImage, type, isContextVisible, setIsContextVisible}) {
  const [hover, setHover] = useState(false); 
  const [grabPhoto, setGrabPhoto] = useState(false);
  
  useEffect(() => {
    if(grabPhoto){
      const data = document.getElementById("photo-picker");
      data.click();
      document.body.onfocus = (e) => {
        setTimeout(() => {
          setGrabPhoto(false);
        }, 1000);
      }
    }
  }, [grabPhoto]);

  const removePhoto = () => {
    setImage("/default_avatar.png");
  }

  const uploadPhoto = () => {
    setGrabPhoto(true);
  }


  return (
    <div style={{marginBottom:"1rem"}}>
      {
        type === "sm" && 
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="relative cursor-pointer z-0"
        >
          <div style={{border: "2px solid red", borderRadius:"5px"}}>
            <img src={image}  alt="avatar" className="" style={{ width: "10rem", height: "10rem" }}/>
          </div>
          <div style={{display: "flex", justifyContent:"center" }}>
            <button 
              style={{cursor: "pointer"}}
              onClick={() => setIsContextVisible(true)}
            >
              <FaCamera />
              <span> Change </span>
            </button>
          </div>
        </div>
      } 
      {
        isContextVisible && (
          <div style={styles.overlay}> 
            <ContextMenu 
              setIsContextVisible = {setIsContextVisible}
              grabPhoto = {grabPhoto}
              removePhoto = {removePhoto}
              uploadPhoto = {uploadPhoto}
              setImage = {setImage}
              image = {image}
            />
          </div>
        )
      }
    </div>
  );
}


const styles = {
  overlay: {
    position: "fixed", // Position the overlay fixed relative to the viewport, so it covers the entire screen.
    top: 0,           // Start the overlay at the top of the viewport.
    left: 0,          // Start the overlay at the left of the viewport.
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dull background effect
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
};


export default Avatar;
