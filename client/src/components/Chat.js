import React, { useContext } from "react";
import { ContextApp } from "../utils/Context";
import TypingLoader from "./TypingLoader";

function Chat() {
  const { conversation, msgEnd, theme, loading } = useContext(ContextApp);


  return (
    <div
      className={`w-full h-[85%] flex items-center justify-center overflow-hidden overflow-y-auto px-2 py-1 scroll ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div className="w-full lg:w-4/5 flex flex-col h-full items-start justify-start">
        {conversation?.map((msg, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 lg:gap-5 my-2 p-3 rounded-md max-w-[80%] ${
              msg.role === "assistant"
                ? theme === "dark"
                  ? "self-start bg-gray-800/80 text-white"
                  : "self-start bg-gray-200 text-black"
                : theme === "dark"
                ? "self-end bg-gray-500/80 text-white"
                : "self-end bg-gray-200 text-black"
            }`}
          >
            <img
              src={msg.role === "assistant" ? "/icon.png" : "/user-profile.png"}
              alt="user"
              className="w-10 h-10 rounded object-cover"
            />
            <p className="text-[15px]">{msg.content}</p>
          </div>
        ))}
        <TypingLoader loading={loading} />
        <div ref={msgEnd} />
      </div>
    </div>
  );
}

export default Chat;
