import { useStateProvider } from "@/context/Statecontext";
import React from "react";
import Input from "@/components/common/Input";
import { useState } from "react";
import Avatar from "@/components/common/Avatar";

function onboarding() {
    const [{ userInfo }] = useStateProvider();
    const [name, setName] = useState(userInfo?.name || "");
    const [about, setAbout] = useState("");
    const [image, setImage] = useState("/default_avatar.png");
    const [isContextVisible, setIsContextVisible] = useState(false);
    return (
    <div  style={{...styles.loginContainer}}>
        <div style={styles.animationWrapper}>
            <div className="animation">QuickChat</div>
        </div>
        <div>Complete your Profile</div>
        <Avatar 
        image = {image} 
        setImage={setImage} type= "sm" 
        isContextVisible ={isContextVisible}
        setIsContextVisible = {setIsContextVisible}
        />
        
        <div style={{display:"flex", flexDirection:"column", gap: "1rem"}}>
            <Input name="Username" state={name} setState={setName} label={true}/>
            <Input name="About" state={about} setState={setAbout} label={true}/>
        </div>

        <style>{keyframes}</style>
    </div>
    );
}

const styles = {
    loginContainer: {
      display: 'flex',
      flexDirection: 'column',
      paddingTop : '2rem',
    //   justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(to bottom right, #c9d6ff, #e2e2e2)',
      fontFamily: 'Arial, Helvetica, sans-serif',
    },
    animationWrapper: {
      marginBottom: '50px',
    },

};

const keyframes = `
  @keyframes fadeIn {
    0% { opacity: 0; }
    50% { opacity: 1; }
    100% { opacity: 0; }
  }

  .animation {
    font-size: 50px;
    font-weight: bold;
    background: linear-gradient(135deg, #ff758c, #ff7eb3);
    -webkit-background-clip: text;
    color: transparent;
  }
`;

export default onboarding;