import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../const/Constant";

function Session() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSessionId = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Retrieve token from local storage
        const response = await fetch(`${API_BASE_URL}/session-id`, {
          method: "GET",
          headers: {
            "Authorization": token ? `Bearer ${token}` : "", // Attach token if available
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        if (data.session_id) {
          navigate(`/chat/${data.session_id}`, { replace: true });
        } else {
          console.error("Failed to get session ID");
        }
      } catch (error) {
        console.error("Error fetching session ID:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionId();
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      {loading ? <p>Loading session...</p> : <p>Redirecting...</p>}
    </div>
  );
}

export default Session;
