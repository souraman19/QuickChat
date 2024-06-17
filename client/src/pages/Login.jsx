import React from 'react';
import { firebaseAuth } from '@/utils/FirebaseConfig';
import { GoogleAuthProvider } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';
import { FaGoogle, FaPhone } from 'react-icons/fa';

function Login() {
    const handleLogin = async () => {
        
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
          <FaPhone style={styles.icon} />
          Login with Phone Number
        </button>
      </div>
      <style>{keyframes}</style>
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
