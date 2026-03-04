import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const NavigationContext = createContext(null);

export const NavigationProvider = ({ children }) => {
  const { hash } = useLocation();
  const [targetId, setTargetId] = useState(null);

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.replace("#", ""));
      setTargetId(id);
      // Clear after 500ms to allow normal lazy loading to resume
      const timer = setTimeout(() => setTargetId(null), 500);
      return () => clearTimeout(timer);
    }
  }, [hash]);

  return (
    <NavigationContext.Provider value={{ targetId }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within NavigationProvider");
  }
  return context;
};
