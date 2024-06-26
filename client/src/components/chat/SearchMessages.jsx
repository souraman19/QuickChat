import React, { useEffect, useRef, useState } from "react";
import { FaArrowDown, FaArrowUp, FaTimes } from "react-icons/fa";
import { useStateProvider } from "@/context/Statecontext";
import { reducerCases } from "@/context/Constants";

function SearchMessages({ messageRefs, searchText, setSearchText, setSearchedMessages, setSearchedMessageIndex, searchedMessageIndex, searchedMessages}) {
  const [{ messages }, dispatch] = useStateProvider();


  // useEffect(() => {
  //   setSearchedMessages(
  //     messages.filter((singlemessage) => {
  //       return singlemessage.type === "text" && singlemessage.message.toLowerCase().includes(searchText.toLowerCase());
  //     })
  //   );
  //   setSearchedMessageIndex(0);
  // }, [searchText, messages]);

  useEffect(() => {
    if (searchedMessages.length > 0) {
      const currentMessageRef = messageRefs.current[searchedMessages[searchedMessageIndex].index];
      if (currentMessageRef) {
        currentMessageRef.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [searchedMessageIndex, searchedMessages]);

  const handleUpArrowClick = () => {
    if (searchedMessageIndex > 0) {
      setSearchedMessageIndex(searchedMessageIndex - 1);
    }
  };

  const handleDownArrowClick = () => {
    if (searchedMessageIndex < searchedMessages.length - 1) {
      setSearchedMessageIndex(searchedMessageIndex + 1);
    }
  };

  const handleSearchClose = () => {
    dispatch({ type: reducerCases.SET_MESSAGE_SEARCH, payload: false });
    setSearchText("");
    setSearchedMessages([]);
    setSearchedMessageIndex(0);
  };

  return (
    <div className="search-messages-container">
      <input
        type="text"
        value={searchText}
        placeholder="Search messages"
        className="search-input"
        onChange={(e) => setSearchText(e.target.value)}
      />
      {searchedMessages.length > 0 &&  searchText !== "" && (
        <span>
          {searchedMessageIndex + 1} of {searchedMessages.length}
        </span>
      )}
      <div className="search-icons">
        <FaArrowUp className="search-icon" onClick={handleUpArrowClick} />
        <FaArrowDown className="search-icon" onClick={handleDownArrowClick} />
        <FaTimes className="search-icon close-icon" onClick={handleSearchClose} />
      </div>
      <style jsx>{`
        .search-messages-container {
          display: flex;
          align-items: center;
          padding: 10px 15px;
          background-color: #e8f0fe;
          border-radius: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          margin: 20px auto;
          width: 500px;
          transition: background-color 0.3s ease;
        }
        .search-messages-container:hover {
          background-color: #d4e1fc;
        }
        .search-input {
          flex: 4;
          padding: 12px 15px;
          border: none;
          border-radius: 10px;
          outline: none;
          font-size: 16px;
          margin-right: 10px;
          background-color: #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .search-icons {
          flex: 1.2;
          display: flex;
          justify-content: space-around;
        }
        .search-icon {
          font-size: 1.2rem;
          cursor: pointer;
          color: #5f6368;
          transition: color 0.3s ease;
        }
        .search-icon:hover {
          color: #202124;
        }
        .close-icon {
          font-size: 1.5rem;
          color: #ea4335;
        }
      `}</style>
    </div>
  );
}

export default SearchMessages;
