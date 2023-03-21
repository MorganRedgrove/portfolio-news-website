import { useState, createContext, useEffect } from "react";
import { getUsers } from "../utils/ApiCalls";

// voting
export const VotingContext = createContext();

export const VotingProvider = ({ children }) => {
  const [voteHistory, setVoteHistory] = useState({});

  return (
    <VotingContext.Provider value={{ voteHistory, setVoteHistory }}>
      {children}
    </VotingContext.Provider>
  );
};

// user
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: "Guest",
    avatar_url:
      "https://static.vecteezy.com/system/resources/previews/000/440/213/original/question-mark-vector-icon.jpg",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// users

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

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
