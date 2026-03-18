import React, { createContext, useContext, useState } from 'react';

// ─── Types ─────────────────────────────
interface UserContextType {
  userName: string;
  userEmail: string;
  userPhone: string;
  saveUser: (name?: string, email?: string, phone?: string) => void;
}

// ─── Context ───────────────────────────
const UserContext = createContext<UserContextType>({
  userName: '',
  userEmail: '',
  userPhone: '',
  saveUser: () => {},
});

// ─── Provider ──────────────────────────
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');

  const saveUser = (name?: string, email?: string, phone?: string) => {
    if (name !== undefined) setUserName(name);
    if (email !== undefined) setUserEmail(email);
    if (phone !== undefined) setUserPhone(phone);
  };

  return (
    <UserContext.Provider value={{ userName, userEmail, userPhone, saveUser }}>
      {children}
    </UserContext.Provider>
  );
};

// ─── Hook ──────────────────────────────
export const useUser = () => useContext(UserContext);