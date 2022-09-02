import { useReducer, createContext, useEffect } from "react";
import absoluteURL from "next-absolute-url";
import axios from "axios";
import Cookies from "js-cookie";

// create context
const UserContext = createContext();

// initial state
const intialState = {
  user: null,
};

// root reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

// context provider
const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialState);

  useEffect(() => {
    const { origin } = absoluteURL();
    const loadUser = async () => {
      try {
        const { data } = await axios.get(`${origin}/api/me`);
        dispatch({ type: "LOGIN", payload: data.user });
        // Cookies.set("user", JSON.stringify(data.user));
      } catch (error) {
        // Cookies.set("user", JSON.stringify(null));
        dispatch({ type: "LOGOUT" });
      }
    };

    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
