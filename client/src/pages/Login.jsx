import React from 'react';
import { firebaseAuth } from '@/utils/FirebaseConfig'; 
import { GoogleAuthProvider } from 'firebase/auth'; 
import { signInWithPopup } from 'firebase/auth'; //firebase method to sign in with popup
import { FaGoogle, FaMicrosoft, FaPhone } from 'react-icons/fa';
import { CHECK_USER_ROUTE } from '@/utils/ApiRoutes';
import axios from 'axios'; //axios for making http requests to the server
import { useRouter } from 'next/router'; //Hook from Next.js for navigating between pages.
import { useStateProvider } from '@/context/Statecontext'; //Custom hook for accessing the global state
import { reducerCases } from '@/context/Constants'; 
import { useEffect } from 'react'; 

function Login() {
    const router = useRouter();

    const [{userInfo, newUser}, dispatch] = useStateProvider(); // ?? => 


    useEffect(() => {
      if(userInfo?.id && !newUser) router.push("/"); //not working right now as when we explicitely going to /login then newuser value is not saved and changed to intial as false
    }, [userInfo, newUser]);


    const handleLogin = async () => {
        const provider = new GoogleAuthProvider(); 
        const {user:{ 
            displayName: name,
            email,
            photoURL: profilePic,
        }} = await signInWithPopup(firebaseAuth, provider); //signInWithPopup: Method that opens a popup for Google sign-in. It returns a user object which is destructured to get displayName, email, and photoURL.
        // console.log(user);
        try{
            if(email){
                const {data} = await axios.post(CHECK_USER_ROUTE, {email}); 
                // console.log(data);
                if(!data.status){ //If the user is not found in the database, set newUser to true and navigate to the onboarding page.

                  //dispatch: Sends actions to the reducer to update the global state
                    dispatch({ //Dispatch an action to set the newUser state to true.
                        type: reducerCases.SET_NEW_USER, 
                        newUser: true
                    })
                    dispatch({
                        type: reducerCases.SET_USER_INFO, // Action to set user information in the state.
                        userInfo:{ 
                            name, 
                            email,
                            profilePic,
                            status:"",
                        }
                    })
                    router.push("/onboarding"); //Navigate to the onboarding page.
                } else {
                  const {id, name, email, profilePic: profilePic, status} = data.data;
                  // console.log(data.data);
                  dispatch({
                    type: reducerCases.SET_USER_INFO,
                    userInfo:{id, name, email, profilePic, status}
                  })
                  router.push("/"); //Navigate to the home page.
                }
            }
        }catch(err){
            console.log(err);
        }
    }



    
  return (
    <div style={styles.loginContainer}>

      <div style={styles.animationWrapper}>
        <div className="animation">QuickChat</div>
      </div>

      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={handleLogin}>
          <FaGoogle style={styles.icon} />
          Login with Google
        </button>
        <button style={styles.button}>
          <FaMicrosoft style={styles.icon} />
          Login with Microsoft
        </button>
      </div>

      <style>{keyframes}</style> 
      {/* //Inject the keyframes into the component */}
      {/* //embedding CSS keyframes animation directly into the JSX code */}

    </div>
  );
}

const styles = {
  loginContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(to bottom right, #c9d6ff, #e2e2e2)',
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
  animationWrapper: {
    marginBottom: '50px',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    fontWeight: 'medium',
    padding: '15px 30px',
    margin: '10px',
    width: '350px', // Set a fixed width for both buttons
    color: '#fff',
    backgroundColor: '#4CAF50',
    border: 'none',
    borderRadius: '8px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
  },
  icon: {
    marginRight: '10px',
  },
};

const keyframes = `
  @keyframes fadeIn {
    0% { opacity: 0; }
    50% { opacity: 1; }
    100% { opacity: 0; }
  }

  .animation {
    font-size: 74px;
    font-weight: bold;
    animation: fadeIn 2s ease-in-out infinite;
    background: linear-gradient(135deg, #ff758c, #ff7eb3);
    -webkit-background-clip: text;
    color: transparent;
  }
`;

export default Login;
