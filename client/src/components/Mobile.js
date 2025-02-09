import React, { useContext, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FiUser, FiMessageSquare } from "react-icons/fi";
import { SlOptions } from "react-icons/sl";
import { MdClose } from "react-icons/md";
import { ContextApp } from "../utils/Context";
import { useNavigate } from "react-router-dom";

function Mobile() {
  const { Mobile, setMobile, handleQuery, theme, sessionList, user } = useContext(ContextApp);
  const navigate = useNavigate();
  const bgColor = theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900";
  const borderColor = theme === "dark" ? "border-gray-600" : "border-gray-300";
  const hoverBg = theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-200";

  useEffect(() => {
    setMobile(!Mobile)
  }, [])

  return (
    <div className="absolute left-0 top-0 w-full z-50 bg-black/40 flex justify-between items-start">
      <div className={`h-screen w-[300px] flex flex-col justify-between p-2 translate-x-0 ${bgColor} ${Mobile ? "flex" : "hidden"}`}>
        {/* Top Section */}
        <div className="flex items-start justify-between w-full">
          <span
            className={`border ${borderColor} rounded w-full py-2 text-xs flex gap-1 items-center justify-center cursor-pointer`}
            onClick={() =>  navigate(`/`) }
          >
            <AiOutlinePlus fontSize={18} />
            New Chat
          </span>
        </div>

        {/* Middle Section */}
        <div className="h-[80%] w-full p-2 flex flex-col overflow-y-auto text-sm my-2">
        {sessionList.map((item) => {
            return (
              <span
                key={item?.id}
                className={`rounded w-full py-3 px-2 text-xs my-2 flex gap-1 items-center justify-between cursor-pointer ${hoverBg} transition-all duration-300 truncate`}
                value={item?.title}
                onClick={ () => {
                  navigate(`/chat/${item?.id}`)
                  setMobile(false)
                } }
              >
                <span className="flex gap-2 items-center text-base">
                  <FiMessageSquare />
                  <span className="text-sm">{item?.title}</span>
                </span>
              </span>
            )
        })}
        </div>

        {/* Bottom Section */}
        <div className={`w-full border-t ${borderColor} flex flex-col gap-2 items-center p-2`}>
         
          <span className={`rounded w-full py-2 px-2 text-xs flex gap-1 items-center justify-between cursor-pointer ${hoverBg} transition-all duration-300`}>
            <span className="flex gap-2 items-center text-sm font-bold">
              <img src="/user-profile.png" alt="user" className="w-8 h-8 object-cover rounded-sm" />
              {user.name}
            </span>
            <span className="rounded-md px-1.5 py-0.5 text-xs font-medium uppercase text-gray-500">
              <SlOptions />
            </span>
          </span>
        </div>
      </div>

      {/* Close Button */}
      {Mobile && (
        <span
          className={`border ${borderColor} text-black bg-white m-2 rounded px-3 py-[9px] flex items-center cursor-pointer`}
          title="Close sidebar"
          onClick={() => setMobile(!Mobile)}
        >
          <MdClose />
        </span>
      )}
    </div>
  );
}

export default Mobile;
