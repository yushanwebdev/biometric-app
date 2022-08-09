import React, {useState, createContext, useContext} from 'react';

const initialValues = {
  user: {isLoggedIn: false, hasSessionExpired: false},
  setUser: () => {},
};

interface IUser {
  isLoggedIn: boolean;
  hasSessionExpired: boolean;
}

export const UserContext = createContext<{
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}>(initialValues);

export const UserContextProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserContextProvider.');
  }

  return context;
};
