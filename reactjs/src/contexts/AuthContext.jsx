import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RenderRoutes } from "../components/RenderRoutes";

const AuthContext = createContext({
  // token: null,
  // errors: [],
  // checkToken: () => {},
  // login: () => {},
  // register: () => {},
  // logout: () => {},
});

const backendURL = "https://thread-laravel.vercel.app";

export const AuthProvider = () => {
  const [errors, setErrors] = useState([]);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  // csrf token generation for guest methods
  const csrfToken = () =>
    axios.get(`${backendURL}/sanctum/csrf-cookie`, {
      headers: {
        Accept: "application/json",
      },
      withCredentials: true,
    });

  const getUser = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/user`, {
        headers: {
          Accept: "application/json",
        },
        withCredentials: true,
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const checkToken = () => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      setToken(null);
      return false;
    }
    setToken(JSON.parse(storedToken));
    return true;
  };

  const login = async ({ email, password }) => {
    await csrfToken();
    try {
      const result = await axios.post(
        `${backendURL}/login`,
        {
          email,
          password,
        },
        {
          headers: {
            Accept: "application/json",
          },
          withCredentials: true,
          withXSRFToken: true,
        }
      );
      localStorage.setItem("token", JSON.stringify(result.data.token));
      if (checkToken()) {
        navigate("/");
      } else {
        console.log("Cant get token !");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 422) {
          console.log("Unprocessable Content:", error.response);
          setErrors(error.response.data.errors);
        } else {
          console.error("Failed to login:", error.response);
          setErrors(error.response);
        }
      } else {
        console.error("Error:", error.message);
        setErrors(error.message);
      }
    }
  };

  const register = async ({
    display_name,
    email,
    password,
    password_confirmation,
  }) => {
    await csrfToken();
    try {
      const result = await axios.post(
        `${backendURL}/api/register`,
        {
          display_name,
          email,
          password,
          password_confirmation,
        },
        {
          headers: {
            Accept: "application/json",
          },
          withCredentials: true,
          withXSRFToken: true,
        }
      );
      console.log(result);
      localStorage.setItem("token", JSON.stringify(result.data.token));
      if (checkToken()) {
        navigate("/");
      } else {
        console.log("Cant get token !");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 422) {
          console.log("Unprocessable Content:", error.response);
          setErrors(error.response.data.errors);
        } else {
          console.error("Failed to register:", error.response);
          setErrors(error.response);
        }
      } else {
        console.error("Error:", error.message);
        setErrors(error.message);
      }
    }
  };

  // const logout = () => {
  //   localStorage.removeItem('data');
  //   setUser(null);
  //   setIsAuthenticated(false);
  //   navigate('/login');
  // };

  useEffect(() => {
    const intervalId = setInterval(() => {
      checkToken();
      getUser();
    }, 300000); 

    return () => {
      clearInterval(intervalId); 
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ token, user, errors, csrfToken, checkToken, login, register }}
    >
      <RenderRoutes />
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
