import React, { useEffect } from "react";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FaGoogle, FaMicrosoft } from "react-icons/fa";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import { useRouter } from "next/router";
import { useStateProvider } from "@/context/Statecontext";
import { reducerCases } from "@/context/Constants";

function Login() {
  const router = useRouter();
  const [{ userInfo, newUser }, dispatch] = useStateProvider();



  //not working currently
  useEffect(() => {
    if (userInfo?.id && !newUser) router.push("/");
  }, [userInfo, newUser]);



// ✅ You’re using Firebase Auth
// 👉 with GoogleAuthProvider,
// ✔️ which is built on top of Google OAuth

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName: name, email, photoURL: profilePic },
    } = await signInWithPopup(firebaseAuth, provider);

    try {
      if (email) {
        const { data } = await axios.post(CHECK_USER_ROUTE, { email });

        if (!data.status) {
          dispatch({ type: reducerCases.SET_NEW_USER, newUser: true });
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: { name, email, profilePic, status: "" },
          });
          router.push("/onboarding");
        } else {
          const { id, name, email, profilePic, status } = data.data;
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: { id, name, email, profilePic, status },
          });
          router.push("/");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.page}>
      <div className="stars" />
      <div style={styles.card}>
        <div className="heading">QuickChat</div>

        <div style={styles.buttonGroup}>
          <button style={styles.google} onClick={handleLogin}>
            <FaGoogle style={styles.icon} />
            Login with Google
          </button>
          <button style={styles.microsoft}>
            <FaMicrosoft style={styles.icon} />
            Login with Microsoft
          </button>
        </div>
      </div>

      <style jsx global>{`
        .heading {
          font-size: 64px;
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

        button:hover {
          transform: scale(1.07);
          box-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
        }

        .stars {
          position: absolute;
          width: 200%;
          height: 200%;
          background: transparent
            url("https://raw.githubusercontent.com/CodeExplainedRepo/star-animation/master/stars.png")
            repeat top center;
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
  },
  card: {
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "24px",
    padding: "60px 50px",
    boxShadow: "0 0 30px rgba(0, 0, 0, 0.8)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 1,
    minWidth: "360px",
  },
  buttonGroup: {
    marginTop: "50px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "100%",
  },
  google: {
    background: "linear-gradient(to right, #1cb5e0, #000851)",
    color: "#fff",
    fontWeight: 600,
    fontSize: "1rem",
    padding: "14px 24px",
    border: "none",
    borderRadius: "999px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 0 20px #1cb5e088",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  microsoft: {
    background: "linear-gradient(to right, #8e2de2, #4a00e0)",
    color: "#fff",
    fontWeight: 600,
    fontSize: "1rem",
    padding: "14px 24px",
    border: "none",
    borderRadius: "999px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 0 20px #8e2de277",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  icon: {
    marginRight: "12px",
    fontSize: "20px",
  },
};

export default Login;
