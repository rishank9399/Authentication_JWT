import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import api from "../utils/axiosConfig";
import { ToastContainer, toast } from "react-toastify";

// function getCookie(name) {
//   return document.cookie
//     .split('; ')
//     .find(row => row.startsWith(${encodeURIComponent(name)}=))
//     ?.split('=').slice(1).join('=');
// }

function getCookie(name) {
  return document.cookie
    .split("; ")
    .find(row => row.startsWith(`${encodeURIComponent(name)}=`))
    ?.split("=")
    .slice(1)
    .join("=");
}



const Hero = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const verifyCookie = async () => {
      try {
        const token = getCookie('token');
        console.log('Cookies:', cookies);
        console.log('Token from cookie:', token);
        
        // Check if token exists either in cookies or in document.cookie
        if (!cookies.token && !token) {
          console.log('No token found, redirecting to login');
          navigate("/login");
          return;
        }

        const { data } = await api.post("/verify", {});
        
        const { status, user } = data;
        console.log('Verification response:', { status, user });
        
        if (status && user) {
          setUsername(user);
          toast(`Hello ${user}`, {
            position: "top-right",
          });
        } else {
          console.log('Token verification failed, removing cookie and redirecting');
          removeCookie("token");
          navigate("/login");
        }
      } catch (error) {
        console.error('Error verifying cookie:', error);
        removeCookie("token");
        navigate("/login");
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
  const Logout = async () => {
    try {
      await api.post("/logout");
      removeCookie("token");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if API call fails, clear local cookie and redirect
      removeCookie("token");
      navigate("/login");
    }
  };

  
  return (
    <>
      <div className="home_page">
        <h4>
          {" "}
          Welcome <span>{username}</span>
        </h4>
        <button onClick={Logout}>LOGOUT</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Hero;