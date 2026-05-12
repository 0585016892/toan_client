import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user từ localStorage khi reload
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  // Đăng nhập
  const login = (userData, accessToken) => {
    const userWithToken = {
      ...userData,
      token: accessToken,
    };

    setUser(userWithToken);
    localStorage.setItem("user", JSON.stringify(userWithToken));
  };

  // Đăng xuất
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated: !!user?.token,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Hook dùng cho tiện
export const useUser = () => useContext(UserContext);
