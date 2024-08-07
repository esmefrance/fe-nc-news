import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([{
    avatar_url:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    username: "cooljmessy",
  }]);

  return (
    <UserContext.Provider value={{user,setUser}}>
        {children}
    </UserContext.Provider>
  )
};