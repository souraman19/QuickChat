import React from "react";
import ReactDOM from "react-dom"; //ReactDOM is used for rendering elements in the DOM

function PhotoPicker({ onChange }) { 

  const component = (
    <input type = "file" hidden id = "photo-picker" onChange = {onChange}/>
    //onChange function will be called whenever a file is selected.
  );  

  //This is useful for creating components that need to be rendered outside the normal component hierarchy.
  //For example, modals, tooltips, and popovers.
  return ReactDOM.createPortal(component, document.getElementById("photo-picker-element")); //ReactDOM.createPortal() is used to render the component in the DOM
  //The first argument is the component to be rendered and the second argument is the DOM element where the component should be rendered.
  //This means the file input will appear in the DOM element with the id photo-picker-element
  
}

export default PhotoPicker;
