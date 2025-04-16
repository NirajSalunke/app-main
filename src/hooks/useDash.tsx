// ActiveTabContext.js
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

// Create the context
interface TabContextType {
  activeTab: number;
  setActiveTab: Dispatch<SetStateAction<number>>;
}
const ActiveTabContext = createContext<TabContextType | undefined>(undefined);

interface TabsProps {
  children: ReactNode;
}
export function ActiveTabProvider({ children }: TabsProps) {
  const [activeTab, setActiveTab] = useState<number>(5);

  return (
    <ActiveTabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </ActiveTabContext.Provider>
  );
}
export function useDash() {
  const context = useContext(ActiveTabContext);
  if (!context) {
    throw new Error("useActiveTab must be used within an ActiveTabProvider");
  }
  return context;
}
