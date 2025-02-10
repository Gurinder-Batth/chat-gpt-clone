import React, { useContext } from "react";
import { ContextApp } from "../utils/Context";
import TypingLoader from "./TypingLoader";

function Chat() {
  const { conversation, msgEnd, theme, loading } = useContext(ContextApp);

  const formatMessageContent = (content) => {
    // Split the content by new lines and return as an array of JSX elements
    return content.split("\n").map((line, index) => (
      <p key={index} className="text-[15px]">
        {line}
      </p>
    ));
  };

  return (
    <div
      className={`w-full h-[85%] flex items-center justify-center overflow-hidden overflow-y-auto px-2 py-1 scroll ${
        theme === "dark" ? "bg-gray-900" : ""
      }`}
    >
      <div className="w-full lg:w-4/5 flex flex-col h-full items-start justify-start">
        {conversation?.map((msg, i) => (
          <div
            key={i}
            className={`flex items-center  gap-2 lg:gap-5 my-2 p-3 rounded-md max-w-[80%] ${
              msg.role === "assistant"
                ? theme === "dark"
                  ? "self-start bg-gray-800/80 text-white"
                  : "self-start bg-gray-200 text-black"
                : theme === "dark"
                ? "self-end bg-gray-500/80 text-white"
                : "self-end bg-gray-200 text-black"
            }`}
          >
            {
              !msg.content.includes("\n") &&
              <img
                src={msg.role === "assistant" ? "/icon.png" : "/user-profile.png"}
                alt="user"
                className="w-10 h-10 rounded object-cover"
              />
            }
            <div>{formatMessageContent(msg.content)}</div>
          </div>
        ))}
        <TypingLoader loading={loading} />
        <div ref={msgEnd} />
      </div>
    </div>
  );
}

export default Chat;
