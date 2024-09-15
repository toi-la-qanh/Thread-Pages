import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
  // user: null,
  // setUser: () => {},
  // login: () => {},
  // register: () => {},
});

export const AuthProvider = ({ children }) => {
  const [errors, setErrors] = useState([]);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  // csrf token generation for guest methods
  const csrfToken = () =>
    axios.get("http://localhost:8000/sanctum/csrf-cookie", {
      headers: {
        Accept: "application/json",
      },
      withCredentials: true,
      // withXSRFToken:true,
    });

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
        "http://localhost:8000/login",
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
        "http://localhost:8000/api/register",
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
      navigate("/");
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
    checkToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{ token, errors, checkToken, login, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
