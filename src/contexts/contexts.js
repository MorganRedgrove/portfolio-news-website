import { useState, createContext, useEffect } from "react";
import { getUsers } from "../utils/ApiCalls";

// user context
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: "guest",
    name: "Guest",
    avatar_url: require("../assets/user-avatar-placeholder.webp"),
    permission: true,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// users context
export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users);
    });
  }, []);

  return (
    <UsersContext.Provider value={{ users, setUsers }}>
      {children}
    </UsersContext.Provider>
  );
};

// users context
export const OffCanvasContext = createContext();

export const OffCanvasProvider = ({ children }) => {
  const [offCanvas, setOffCanvas] = useState({ show: false, content: null });

  return (
    <OffCanvasContext.Provider value={{ offCanvas, setOffCanvas }}>
      {children}
    </OffCanvasContext.Provider>
  );
};
