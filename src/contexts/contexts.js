import { useState, createContext, useEffect } from 'react';
import { getUsers } from '../ApiCalls';

// loading
export const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

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
  const [user, setUser] = useState({username: "Guest", avatar_url:"https://static.vecteezy.com/system/resources/previews/000/440/213/original/question-mark-vector-icon.jpg"});

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
    getUsers()
    .then((users) => {
        setUsers(users)
      })
  })

  return (
    <UsersContext.Provider value={{ users, setUsers }}>
      {children}
    </UsersContext.Provider>
  );
};

// persmisions

export const PermissionsContext = createContext();

export const PermissionsProvider = ({ children }) => {
  const [permissions, setpermissions] = useState({Guest: false});

  useEffect(() => {
    getUsers()
    .then((users) => {
      users.forEach(({username}) => {
        permissions[username] = true
        setpermissions(permissions)
      });
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])

  return (
    <PermissionsContext.Provider value={{ permissions, setpermissions }}>
      {children}
    </PermissionsContext.Provider>
  );
};