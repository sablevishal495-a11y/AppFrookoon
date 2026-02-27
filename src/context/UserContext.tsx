import React, { createContext, useContext, useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface UserContextType {
  userName: string;
  userEmail: string;
  saveUser: (name: string, email: string) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────
const UserContext = createContext<UserContextType>({
  userName: '',
  userEmail: '',
  saveUser: () => {},
});

// ─── Provider — wrap this around your whole app in App.tsx ───────────────────
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userName, setUserName]   = useState('');
  const [userEmail, setUserEmail] = useState('');

  const saveUser = (name: string, email: string) => {
    setUserName(name);
    setUserEmail(email);
  };

  return (
    <UserContext.Provider value={{ userName, userEmail, saveUser }}>
      {children}
    </UserContext.Provider>
  );
};

// ─── Hook — use this on any screen ───────────────────────────────────────────
export const useUser = () => useContext(UserContext);