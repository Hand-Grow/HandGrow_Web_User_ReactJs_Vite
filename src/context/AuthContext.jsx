import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userType) => {
    // Simulate a login API call
    let name = 'User';
    if (userType === 'cooperative') name = 'Cooperative Member';
    else if (userType === 'company') name = 'Company Representative';
    else if (userType === 'admin') name = 'Admin User';

    setUser({ type: userType, role: userType, name });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
