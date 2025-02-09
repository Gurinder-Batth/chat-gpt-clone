import React, { useContext, useEffect } from "react";
import { ContextApp } from "../utils/Context";
import { LuPanelLeftOpen } from "react-icons/lu";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { RiSendPlane2Fill } from "react-icons/ri";
import { MdOutlineLightMode, MdDarkMode } from "react-icons/md"; // Light/Dark icons
import Chat from "./Chat";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../const/Constant";

function ChatContainer() {
  const {
    theme,
    toggleTheme,
    chatValue,
    setChatValue,
    handleSend,
    handleKeyPress,
    conversation,
    setMobile,
    Mobile,
    setSessionId,
    setSessionList,
    setConversation,
    setUser
  } = useContext(ContextApp);



  const params = useParams()

  useEffect(() => {
    const _session_id = params?.sessionId
    if (_session_id) {
      setSessionId(_session_id);
      
      setConversation([
        {
          role: "assistant",
          content: "Fetching your previous chat... Hang tight! 🚀"
        }
      ]);
      
      

      // Fetch chat data
      fetch(`${API_BASE_URL}/chats/${_session_id}`)
        .then((res) => res.json())
        .then((data) => {
          setConversation(data || []);
        })
        .catch((error) => console.error("Error fetching chat:", error));
    }
  }, [params?.sessionId]);

  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Retrieve token from local storage
  
    fetch(`${API_BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        "Authorization": token ? `Bearer ${token}` : "", // Attach token if available
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser({
          name: data?.user?.name || "Guest",
          guest: data?.user?.name ? false : true,
        })
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        console.log("Guest");
      });
  }, []);
  

  useEffect(() => {
    const fetchSessions = async () => {
      const token = localStorage.getItem("authToken"); // Retrieve token from local storage
      try {
        const response = await fetch(`${API_BASE_URL}/session/list`,{
          method: "GET",
          headers: {
            "Authorization": token ? `Bearer ${token}` : "", // Attach token if available
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch sessions");
        }
        const data = await response.json();
        setSessionList(data.list); // Assuming API returns an array of sessions
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    fetchSessions();
  }, [params?.sessionId]); // Re-fetch when sessionId changes



  return (
    <div
      className={`h-screen w-full lg:w-[calc(100%-300px)] ${
        theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
      } flex items-start justify-between flex-col p-2 transition-all duration-300`}
    >
      {/* Theme Toggle Button */}
      <button
        className="absolute top-4 right-4 p-2 rounded-full shadow-md hover:bg-gray-400"
        onClick={toggleTheme}
      >
        {theme === "dark" ? (
          <MdOutlineLightMode className="text-yellow-500 text-2xl" />
        ) : (
          <MdDarkMode className="text-gray-900 text-2xl" />
        )}
      </button>

      <span
        className="rounded px-3 py-[9px] hidden lg:flex items-center justify-center cursor-pointer m-1 hover:bg-gray-600 duration-200"
        title="Open sidebar"
      >
        <LuPanelLeftOpen />
      </span>

      <span
        className="rounded px-3 py-[9px] lg:hidden flex items-center justify-center cursor-pointer text-white mt-0 mb-3 border border-gray-600"
        title="Open sidebar"
        onClick={() => setMobile(!Mobile)}
      >
        {theme === "dark" ? (
          <HiOutlineMenuAlt2 fontSize={20}  className="text-yellow-500 text-2xl" />
        ) : (
          <HiOutlineMenuAlt2 fontSize={20}  className="text-gray-900 text-2xl" />
        )}
      </span>

      {/* Chat Component */}
      <Chat conversation={conversation} />

      {/* Chat Input */}
      <div className="w-full flex items-center justify-center flex-col gap-3 my-4">
      <div
        className={`flex gap-2 items-center px-3 py-2 w-[95%] lg:w-2/5 xl:w-1/2 rounded-lg shadow-lg transition-all duration-300 ${
          theme === "dark" ? "bg-gray-700 text-white" : "bg-white-200  border-gray-200 border-2 text-black"
        }`}
      >
        <input
          placeholder="Type your message..."
          className={`w-full px-4 py-3 text-base border-none outline-none resize-none overflow-hidden rounded-lg bg-transparent transition-all duration-300 ${
            theme === "dark" ? "placeholder-gray-400 text-white" : "placeholder-gray-600 text-black"
          }`}
          rows="1"
          value={chatValue}
          onChange={(e) => {
            setChatValue(e.target.value);
            e.target.style.height = "auto"; // Reset height
            e.target.style.height = `${e.target.scrollHeight}px`; // Expand dynamically
          }}
          onKeyUp={handleKeyPress}
        />
        <RiSendPlane2Fill
          style={{ fontSize: "40px" }}
          title="Send message"
          className={`mx-2 text-2xl p-2 rounded-lg transition-all duration-200 ease-in-out ${
            chatValue.length > 0
              ? "bg-green-500 text-white cursor-pointer hover:scale-110 active:scale-95 shadow-md"
              : "text-gray-400 cursor-auto"
          }`}
          onClick={handleSend}
        />
      </div>
    </div>



    </div>
  );
}

export default ChatContainer;
