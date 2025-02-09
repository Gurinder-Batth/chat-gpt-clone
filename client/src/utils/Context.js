import { createContext, useEffect, useRef, useState } from "react";
import { sendMsgToAI } from "./OpenAi";

export const ContextApp = createContext();

const AppContext = ({ children }) => {
  const [sessionId, setSessionId] = useState(null); // Store session_id
  const [loading, setLoading] = useState(false); // Store session_id
  const [user, setUser] = useState({guest: true, name: "Guest"}); // Store session_id
  const [sessionList, setSessionList] = useState([])
  const [conversation, setConversation] = useState([
    {
      role: "assistant",
      content:
        "Hi, I'm ChatGPT. Please feel free to ask me anything or let me know how I can assist you today!",
    },
  ]);

  const [chatValue, setChatValue] = useState("");
  const [theme, setTheme] = useState("light"); // Default is dark mode
  const msgEnd = useRef(null);
  const [Mobile, setMobile] = useState(true);


  useEffect(() => {
    if (msgEnd.current) {
      msgEnd.current.scrollIntoView();
    }
  }, [conversation]);

  // Button Click function
  const handleSend = async () => {
    if (chatValue.trim().length == 0) return  ""
    const userMessage = { role: "user", content: chatValue };
    setChatValue("");
    const newConversation = [...conversation, userMessage];
    setConversation(newConversation);
    setLoading(true)
    const assistantResponse = await sendMsgToAI(sessionId, chatValue);
    setLoading(false)
    setConversation([
      ...newConversation,
      { role: "assistant", content: assistantResponse },
    ]);
  };

  // Enter Key function
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevents adding a new line in the textarea
      handleSend();
    }
  };
  
  // Toggle Theme Function
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const setShowSlide = () => {

  }
  
  // Query Click function (if you have preset queries)
  const handleQuery = async (e) => {
    const userMessage = { role: "user", content: e.target.innerText };
    const newConversation = [...conversation, userMessage];
    setConversation(newConversation);
    setLoading(true)
    const assistantResponse = await sendMsgToAI(sessionId, userMessage);
    setLoading(false)
    setConversation([
      ...newConversation,
      { role: "assistant", content: assistantResponse },
    ]);
  };

  return (
    <ContextApp.Provider
      value={{
        chatValue,
        setChatValue,
        handleSend,
        conversation,
        msgEnd,
        handleKeyPress,
        handleQuery,
        setShowSlide,
        theme,
        toggleTheme,
        setMobile,
        Mobile,
        sessionId,
        setSessionId,
        loading,
        setSessionList,
        sessionList,
        setConversation,
        setUser,
        user
      }}
    >
      {children}
    </ContextApp.Provider>
  );
};

export default AppContext;
