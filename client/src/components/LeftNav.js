import React, { useContext } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { LuPanelLeftClose } from "react-icons/lu";
import { FiUser, FiMessageSquare } from "react-icons/fi";
import { SlLogin } from "react-icons/sl";
import { SlLogout } from "react-icons/sl";
import { ContextApp } from "../utils/Context";
import { useNavigate } from "react-router-dom";

function LeftNav() {
  const { setShowSlide, showSlide, handleQuery, theme, sessionList, user } = useContext(ContextApp);
  const navigate = useNavigate();

  return (
    // Top section
    <div
      className={`h-screen w-[300px] border-r hidden lg:flex items-center justify-between p-2 flex-col translate-x-0 
        ${
          showSlide
            ? "hidden"
            : theme === "dark"
            ? "bg-gray-900 border-gray-500 text-white"
            : "bg-gray-100 border-gray-300 text-black"
        }`}
    >
     <div className="flex items-start justify-between w-full">
        {/* Conditionally disable New Chat for guests */}
        <span
          className={`border rounded w-[80%] py-2 text-xs flex gap-1 items-center justify-center 
            ${theme === "dark" ? "border-gray-600" : "border-gray-400"} 
            ${user.guest ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          onClick={() => {
            if (!user.guest) navigate(`/`);
          }}
          title={user.guest ? "Login required for New Chat" : ""}
        >
          <AiOutlinePlus fontSize={18} />
          {user.guest ? "New Chat (Login Required)" : "New Chat"}
        </span>

        <span
          className="border rounded px-3 py-[9px] flex items-center justify-center cursor-pointer"
          title="Close sidebar"
          onClick={() => setShowSlide(!showSlide)}
        >
          <LuPanelLeftClose />
        </span>
      </div>


      {/* Middle section */}
      <div
        className={`h-[80%] w-full p-2 flex flex-col overflow-hidden overflow-y-auto text-sm scroll my-2`}
      >
        {/* Messages */}
        {
          sessionList.map((item) => {
            return (<span
                className={`rounded w-full py-3 px-2 text-xs my-2 flex gap-1 items-center justify-between cursor-pointer hover:transition-all duration-300 overflow-hidden truncate whitespace-nowrap
                  ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-300"}`}
                value={"What is Programming?"}
                onClick={ () => navigate(`/chat/${item?.id}`) }
              >
                <span className="flex gap-2 items-center justify-center text-base">
                  <FiMessageSquare />
                  <span className="text-sm">{item?.title}</span>
                </span>
              </span>)
          })
        }
      </div>

      {/* Bottom section */}
      <div
        className={`w-full border-t flex flex-col gap-2 items-center justify-center p-2 
          ${theme === "dark" ? "border-gray-600" : "border-gray-400"}`}
      >
        <span
          className={`rounded w-full py-2 px-2 text-xs flex gap-1 items-center justify-between cursor-pointer hover:transition-all duration-300
            }`}
        >
          <span className="flex gap-2 items-center justify-center text-sm font-bold">
            <img
              src="/user-profile.png"
              alt="user"
              className="w-8 h-8 object-cover rounded-sm"
            />
            {user.name}
          </span>
            <span onClick={() => navigate(user.guest ? "/login" : "/logout")} className={`btn rounded-md px-1.5 py-0.5 text-xs font-medium uppercase text-gray-500 ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-300"}`}>
              {user.guest &&  <SlLogin />}
              {!user.guest &&  <SlLogout />}
          </span>
          
        </span>
      </div>
    </div>
  );
}

export default LeftNav;
