// src/hooks/useLogout.js
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useLogout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.get("http://localhost:8000/user/logout", {
        withCredentials: true,
      });

      localStorage.removeItem("user");
      localStorage.removeItem("userEmail");

      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return logout;
};

export default useLogout;
