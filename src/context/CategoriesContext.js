import React from "react";

export const CategoriesContext = React.createContext([]);

export function CategoriesProvider({ children }) {
  const [categories, setCategories] = React.useState([]);
  const [chosenCategories, setChosenCategories] = React.useState([]);

  const changeChoseCategories = (newCategories) => {
    let enabledCategories = [];
    newCategories.forEach((category) => {
      if (category.isEnabled) {
        enabledCategories.push(category);
      }
    });
    setChosenCategories(enabledCategories);
  };

  const changeCategories = (newCategories) => {
    localStorage.setItem("categories", JSON.stringify(newCategories));
    setCategories(newCategories);
  };

  React.useEffect(() => {
    let data = JSON.parse(localStorage.getItem("categories")) || null;
    setCategories(data);
  }, []);

  React.useEffect(() => {
    categories && changeChoseCategories(categories);
  }, [categories]);
  

 

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        changeCategories,
        chosenCategories,
        setChosenCategories,
        changeChoseCategories,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}
