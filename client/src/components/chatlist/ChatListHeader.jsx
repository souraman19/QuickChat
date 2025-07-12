import React from "react";
import { useStateProvider } from "@/context/Statecontext";
import { FaEnvelope, FaImages } from "react-icons/fa";
import { reducerCases } from "@/context/Constants";

function ChatListHeader() {
  const [{ userInfo, contactSearch }, dispatch] = useStateProvider();

  const handleNewChatContactPage = () => {
    dispatch({ type: reducerCases.SET_ALL_CONTACTS_PAGE });
  };

  return (
    <div style={styles.outermostContainer}>
      <div style={styles.leftContainer}>
        <FaEnvelope
          title="New Chat"
          style={styles.icon}
          onClick={handleNewChatContactPage}
        />
      </div>

      <div style={styles.middleContainer}>
        <input
          style={styles.searchBox}
          type="text"
          placeholder="Search..."
          value={contactSearch}
          onChange={(e) =>
            dispatch({
              type: reducerCases.SET_CONTACT_SEARCH,
              contactSearch: e.target.value,
            })
          }
        />
      </div>

      <div style={styles.rightContainer}>
        <FaImages title="Gallery" style={styles.icon} />
      </div>
    </div>
  );
}

const styles = {
  outermostContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 4fr 1fr",
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.1)",
    padding: "0.4rem 0.6rem",
    alignItems: "center",
    margin: "0.5rem 0.5rem",
    height: "3.2rem",
    boxShadow: "0 0 8px rgba(255,255,255,0.1)",
  },
  leftContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  middleContainer: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 1rem",
  },
  rightContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  searchBox: {
    width: "100%",
    height: "2.2rem",
    padding: "0 1rem",
    borderRadius: "999px",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    background: "rgba(255, 255, 255, 0.07)",
    color: "#fff",
    fontSize: "0.95rem",
    outline: "none",
    transition: "0.3s ease",
    boxShadow: "0 0 8px rgba(0,0,0,0.4)",
  },
  icon: {
    color: "#fff",
    fontSize: "1.3rem",
    cursor: "pointer",
    transition: "transform 0.2s ease, color 0.3s ease",
  },
};

export default ChatListHeader;
