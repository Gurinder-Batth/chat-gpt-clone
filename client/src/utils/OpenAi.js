import { API_BASE_URL } from "../const/Constant";

export const sendMsgToAI = async (sessionId, userMessage) => {
  const API_URL = `${API_BASE_URL}/chat`; // Change to your actual backend URL

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      session_id: sessionId,
      message: userMessage,
    }),
  };

  try {
    const response = await fetch(API_URL, requestOptions);
    const data = await response.json();
    return data.bot_reply;
  } catch (error) {
    console.error("Error communicating with backend:", error);
    throw error;
  }
};
