import { useState, useEffect } from "react";

const TypingLoader = ({ loading }) => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 6 ? prev + "." : ""));
    }, 500);

    return () => clearInterval(interval);
  }, [loading]);

  return <h4 style={{fontSize: "25px"}}>{loading && `${dots}`}</h4>;
};

export default TypingLoader;
