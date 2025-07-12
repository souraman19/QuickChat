import { useStateProvider } from "@/context/Statecontext"; 
import React, { useEffect, useState } from "react";
import Input from "@/components/common/Input";
import Avatar from "@/components/common/Avatar";
import { ONBOARD_USER_ROUTE } from "@/utils/ApiRoutes";
import { reducerCases } from "@/context/Constants";
import { useRouter } from "next/router";
import axios from "axios";

function Onboarding() {
  const [{ userInfo, newUser }, dispatch] = useStateProvider();
  const [name, setName] = useState(userInfo?.name || "");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState("/default_avatar.png");
  const [isContextVisible, setIsContextVisible] = useState(false);
  const router = useRouter();

  const valiDateName = () => {
    if (name.length < 3) {
      alert("Name must be at least 3 characters long");
      return false;
    }
    return true;
  };

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
    <div style={styles.page}>
      <div className="stars" />
      <div style={styles.card}>
        <div className="heading">QuickChat</div>
        <p style={{ marginTop: "1rem", fontSize: "1.1rem", color: "#ccc" }}>Complete your Profile</p>

        <div style={{ margin: "2rem 0" }}>
          <Avatar
            image={image}
            setImage={setImage}
            type="md"
            changeOption={true}
            isContextVisible={isContextVisible}
            setIsContextVisible={setIsContextVisible}
          />
        </div>

        <div style={styles.formContainer}>
          <input
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
          <textarea
            placeholder="About"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            rows={3}
            style={{ ...styles.input, resize: "none", height: "80px" }}
          />

          <button style={styles.button} onClick={onboardingHandler}>
            Create
          </button>
        </div>
      </div>

      <style jsx global>{`
        .heading {
          font-size: 48px;
          font-weight: 800;
          background: linear-gradient(90deg, #6dd5ed, #2193b0, #6dd5ed);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: textflow 5s ease infinite;
          text-align: center;
        }

        @keyframes textflow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .stars {
          position: absolute;
          width: 200%;
          height: 200%;
          background: transparent url("https://raw.githubusercontent.com/CodeExplainedRepo/star-animation/master/stars.png") repeat top center;
          animation: moveStars 90s linear infinite;
          opacity: 0.1;
          z-index: 0;
        }

        @keyframes moveStars {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-100%);
          }
        }

        button:hover {
          transform: scale(1.07);
          box-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    width: "100vw",
    background: "#0e0e10",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    fontFamily: "Segoe UI, sans-serif",
    color: "#fff",
    padding: "2rem",
  },
  card: {
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "24px",
    padding: "40px 35px",
    boxShadow: "0 0 30px rgba(0, 0, 0, 0.8)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 1,
    width: "100%",
    maxWidth: "420px",
  },
  formContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    marginTop: "1rem",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.05)",
    color: "#fff",
    fontSize: "1rem",
    outline: "none",
    transition: "border 0.2s ease, box-shadow 0.2s ease",
  },
  button: {
    background: "linear-gradient(to right, #1cb5e0, #000851)",
    color: "#fff",
    fontWeight: 600,
    fontSize: "1rem",
    padding: "12px 24px",
    border: "none",
    borderRadius: "999px",
    cursor: "pointer",
    boxShadow: "0 0 20px #1cb5e088",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
};

export default Onboarding;
