import React from "react";

function Empty(){
    return <div style = {styles.outerContainer}>
        <img 
        style = {styles.imgStyle}
        src="/chat_img1.png" alt="chat image" />
    </div>
}

const styles = {
    outerContainer: {
        borderBottom: "4px solid red",
        borderLeft: "1px solid black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    imgStyle:{
        // objectFit: "contain",
    }
}

export default Empty;