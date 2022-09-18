import React from "react";
import { Button, FormControl, Input, InputAdornment } from "@mui/material";
import Router from "next/router";
import * as icons from "@mui/icons-material";
import { CategoriesContext } from "../context/CategoriesContext";

function useIcons(iconName) {
  const Icon = icons[iconName];
  return Icon;
}

const Budgeting = () => {
  const [tempCategories, setTempCategories] = React.useState([]);
  const { chosenCategories,categories, changeCategories } = React.useContext(CategoriesContext);

  React.useEffect(() => {
    setTempCategories(chosenCategories);
  }, [chosenCategories]);

  const handleBudgetChange = (event) => {
    let entry = event.target.value * 1;
    if (!isNaN(entry)) {
      let editedCategories = tempCategories.map((category) => {
        if (category.name === event.target.name) {
          return { ...category, budget: entry };
        }
        return category;
      });
      setTempCategories(editedCategories);
    }
  }

  const handleSubmit = () => {
    let updatedCategories =[]
    categories.forEach((category) => {
        tempCategories.forEach((cat) => {
          if (category.name === cat.name) {
            category = cat
          }
        });
        return updatedCategories.push(category);
    })
    changeCategories(updatedCategories);
    Router.push("/overview");
  };
    
  return (
    <>
      <p>Set how much money you want to spend on each category monthly</p>
      <div className="welcome-card-container">
        <div className="categories">
          {tempCategories &&
            tempCategories.map((category) => {
              const Icon = useIcons(category.icon);
              return (
                <div className="category-input" key={category.id}>
                  <Icon
                    sx={{
                      // color:
                      //   222 > category.budget && type === "expense"
                      //     ? "#B00020"
                      //     : "#000000c4",
                    }}
                  />
                  <FormControl fullWidth sx={{ m: 1, marginLeft: "1rem" }} variant="standard">
                    <Input
                      id="standard-adornment-amount"
                      name={category.name}
                      value={category.budget}
                      onChange={handleBudgetChange}
                      startAdornment={
                        <InputAdornment position="start">
                          {category.name}
                        </InputAdornment>
                      }
                      sx={{
                        input: {
                          textAlign: "end",
                        },
                      }}
                    />
                  </FormControl>
                </div>
              )
            })
          }
        </div>

        <Button
          variant="contained"
          fullWidth
            onClick={handleSubmit}
          sx={{
            "&": { backgroundColor: "#6200EE" },
            "&:hover": {
              backgroundColor: "#6200EE",
            },
          }}
        >
          Complete
        </Button>

      </div>
    </>
  );
};

export default Budgeting;
