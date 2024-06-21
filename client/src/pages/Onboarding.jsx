import { useStateProvider } from "@/context/Statecontext"; 
import React, { useEffect } from "react";
import Input from "@/components/common/Input";
import { useState } from "react";
import Avatar from "@/components/common/Avatar";
import { ONBOARD_USER_ROUTE } from "@/utils/ApiRoutes";
import reducer from "@/context/StateReducers";
import { reducerCases } from "@/context/Constants";
import { useRouter } from "next/router";
import axios from "axios";

function onboarding() {
    const [{ userInfo, newUser }, dispatch] = useStateProvider(); 
    const [name, setName] = useState(userInfo?.name || ""); 
    const [about, setAbout] = useState(""); 
    const [image, setImage] = useState("/default_avatar.png"); 
    const [isContextVisible, setIsContextVisible] = useState(false); 
    const router = useRouter();

    useEffect   (() => {
      if(!newUser && !userInfo?.email) router.push("/login"); //If the user is not new and the email is not present in the userInfo, navigate to the login page.
      if(!newUser && userInfo?.email) router.push("/"); //If the user is not new and the email is present in the userInfo, navigate to the home page.
    }, [newUser, userInfo, router])

    function valiDateName(){
      if(name.length < 3){
        alert("Name   must be at least 3 characters long");
        return false;
      } else {
        return true;
      }
    }

    const onboardingHandler = async () => {
      if(valiDateName()){
        try{
          const { data } = await axios.post(ONBOARD_USER_ROUTE, {
            email: userInfo.email,
            name,
            about, 
            image
          });
          if(data.status){
            dispatch({type: reducerCases.SET_NEW_USER, newUser: false});
            dispatch({type: reducerCases.SET_USER_INFO, 
              userInfo: {
                id: data.user.id,
                name,
                email: userInfo.email,
                profilePic: image,
                about
              } 
            });
            router.push("/");
          }
        }catch(error){
          console.log(error);
        }
      }
    }

    return (
    <div  style={{...styles.loginContainer}}>
        <div style={styles.animationWrapper}>
            <div className="animation">QuickChat</div>
        </div>
        <div>Complete your Profile</div>

        <Avatar 
        image = {image} 
        setImage={setImage} type= "md" 
        changeOption = {true}
        isContextVisible ={isContextVisible}
        setIsContextVisible = {setIsContextVisible}
        />
        
        <div style={{display:"flex", flexDirection:"column", gap: "1rem"}}>
            <Input name="Username" state={name} setState={setName} label={true}/>
            <Input name="About" state={about} setState={setAbout} label={true}/>
            <div style={{display:"flex", justifyContent:"center"}}>
            <button
            onClick={onboardingHandler}
              style={{cursor: "pointer", width: "6rem", height: "2rem", backgroundColor: "pink", color: "white", borderRadius: "5px"}}
            > Create </button>
            </div>
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