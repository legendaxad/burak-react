import { createContext, useContext } from "react";
import { Member } from "../../lib/types/member";

interface GlobalInterface {
  authMember: Member | null;
  setAuthMember: (member: Member | null) => void;
}
export const GlobalContext = createContext<GlobalInterface | undefined>(
  undefined,
); // Create a context for global state management, specifically for authentication-related data. The context is initialized with an undefined value, which will be provided later by a context provider component.
export const useGlobals = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) throw new Error("useGlobal withit Provider");
  return context;
}; // Custom hook to access the global context. It uses the useContext hook to retrieve the context value. If the context is undefined (i.e., not provided by a context provider), it throws an error. Otherwise, it returns the context value, allowing components to access and manipulate the global state related to authentication.
