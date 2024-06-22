import React, { useEffect } from "react";
import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import ContextMenu from "./ContextMenu";

function Avatar({image , changeOption, setImage, type, isContextVisible, setIsContextVisible}) {

  const [hover, setHover] = useState(false); 
  const [grabPhoto, setGrabPhoto] = useState(false); 
  
  useEffect(() => { 

    if(grabPhoto){ // If the grabPhoto state is true, the photo picker is opened
      const data = document.getElementById("photo-picker");
      data.click(); //The click() method simulates a mouse click on an element.
      //This line programmatically triggers a click event on the file input element. This opens the file picker dialog, allowing the user to select a photo from their device.


      //After selecting a file, the focus returns to the document, triggering the onfocus event handler on the document body.
      document.body.onfocus = (e) => {
        setTimeout(() => {
          setGrabPhoto(false);
        }, 1000);
      // This ensures that the file picker dialog doesn't repeatedly open.


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
    // <div style={{marginBottom:"1rem"}}>
    <div >
      {
        type === "md" && 
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="relative cursor-pointer z-0"
        >
          <div style={{height:"10rem", width:"10rem", border: "2px solid red", borderRadius:"50%", overflow:"hidden"}}>
            <img src={image}  alt="avatar" className="" style={{  borderRadius:"50%", height:"100%", width:"100%", objectFit:"cover"}}/>
          </div>
          {changeOption && (
            <div style={{display: "flex", justifyContent:"center" }}>
            <button 
              style={{cursor: "pointer"}}
              onClick={() => setIsContextVisible(true)}
            >
              <FaCamera />
              <span> Change </span>
            </button>
          </div>
          )}
        </div>
      } 
      {
        type === "sm" && 
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="relative cursor-pointer z-0"
          
          // style={{background: "grey"}}
        >
          <div style={{height:"2.3rem", width:"2.3rem", border: "2px solid red", borderRadius:"50%", overflow:"hidden"}}>
            <img src={image}  alt="avatar" className="" style={{  borderRadius:"50%", height:"100%", width:"100%", objectFit:"cover"}}/>
          </div>
          {changeOption && (
            <div style={{display: "flex", justifyContent:"center" }}>
            <button 
              style={{cursor: "pointer"}}
              onClick={() => setIsContextVisible(true)}
            >
              <FaCamera />
              <span> Change </span>
            </button>
          </div>
          )}
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
    objectFit: "cover",
  },
};


export default Avatar;
