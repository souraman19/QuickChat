import React from "react";

function Empty() {
  return (
    <div style={styles.outerContainer}>
      <div style={styles.glassCard}>
        <div style={styles.iconContainer}>
          <div className="chat-bubble">
            <div className="dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <p style={styles.text}>No conversation selected</p>
        <p style={styles.subtext}>Start chatting with someone now ✨</p>
      </div>

      <style jsx>{`
        .chat-bubble {
          background: linear-gradient(to right, #6dd5ed, #2193b0);
          width: 80px;
          height: 60px;
          border-radius: 25px 25px 25px 5px;
          position: relative;
          animation: float 4s ease-in-out infinite;
        }

        .chat-bubble::after {
          content: "";
          position: absolute;
          bottom: -10px;
          left: 20px;
          width: 20px;
          height: 20px;
          background: linear-gradient(to right, #6dd5ed, #2193b0);
          border-radius: 50%;
        }

        .dots {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          gap: 6px;
        }

        .dots span {
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
          animation: blink 1.4s infinite ease-in-out;
        }

        .dots span:nth-child(2) {
          animation-delay: 0.2s;
        }
        .dots span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes blink {
          0%, 80%, 100% {
            opacity: 0.3;
          }
          40% {
            opacity: 1;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }
      `}</style>
    </div>
  );
}

const styles = {
  outerContainer: {
    height: "100%",
    width: "100%",
    background: "#0e0e10",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
  },
  glassCard: {
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "20px",
    padding: "3rem 2rem",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
    textAlign: "center",
    maxWidth: "400px",
    width: "90%",
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "1.5rem",
  },
  text: {
    fontSize: "1.4rem",
    color: "#f0f0f0",
    fontWeight: 600,
    marginBottom: "0.5rem",
  },
  subtext: {
    fontSize: "1rem",
    color: "#999",
  },
};

export default Empty;
