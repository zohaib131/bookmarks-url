import { createContext, useContext, useState } from 'react';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to manage authentication state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Sign-Up function to store the user's data
  const signUp = (username, password) => {
    // Store user data in localStorage (in a real app, use a database)
    localStorage.setItem('user', JSON.stringify({ username, password }));
    setUser({ username, password });
  };

  // LogOut function to clear user data
  const logOut = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, signUp, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
