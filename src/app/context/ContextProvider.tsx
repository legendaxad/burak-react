import React, { ReactNode, useState } from "react";
import Cookies from "universal-cookie";
import { GlobalContext } from "../hooks/useGlobal";
import { Member } from "../../lib/types/member";
const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const cookies = new Cookies(); // Create an instance of the Cookies class
  if (!cookies.get("accessToken")) localStorage.removeItem("memberData"); // Remove memberData from localStorage if accessToken cookie is not present
  const [authMember, setAuthMember] = useState<Member | null>(
    localStorage.getItem("memberData")
      ? JSON.parse(localStorage.getItem("memberData") as string)
      : null,
  ); // Initialize authMember state with memberData from localStorage if available, otherwise set it to null
  console.log("ContextProvider authMember:", authMember);
  return (
    <GlobalContext.Provider value={{ authMember, setAuthMember }}>
      {children}
    </GlobalContext.Provider> // Provide the authMember and setAuthMember state to the children components through the GlobalContext
  );
};

export default ContextProvider;
