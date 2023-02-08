import { useState, createContext } from 'react';

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
  const [voteHistory, setVoteHistory] = useState({Guest: {34:false}});

  return (
    <VotingContext.Provider value={{ voteHistory, setVoteHistory }}>
      {children}
    </VotingContext.Provider>
  );
};

// user

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({username: "Guest"});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};