import React from "react";

export const EntriesContext = React.createContext([]);
export function EntriesProvider({ children }) {
  const [entries, setEntries] = React.useState([]);

  const changeEntries = (newEntries) => {
    localStorage.setItem("entries", JSON.stringify(newEntries));
    setEntries(newEntries);
  };

  React.useEffect(() => {
    let data = JSON.parse(localStorage.getItem("entries")) || [];
    setEntries(data);
  }, []);

  return (
    <EntriesContext.Provider value={{ entries, changeEntries }}>
      {children}
    </EntriesContext.Provider>
  );
}
