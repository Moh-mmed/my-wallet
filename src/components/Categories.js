import React, { useContext } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  ListItemIcon,
} from "@mui/material";
import * as icons from "@mui/icons-material";
import { CategoriesContext } from "../context/CategoriesContext";

function useIcons(iconName) {
 let Icon = icons["Favorite"];
 if (iconName !== "") {
   Icon = icons[iconName];
 }
 return Icon;
}

const Categories = ({ nextStep, categories }) => {
  const [listedCategories, setListedCategories] = React.useState([]);
  const [chosenCategories, setChosenCategories] = React.useState([]);
  const { changeCategories } = useContext(CategoriesContext);

  React.useEffect(() => {
    setListedCategories(categories);
  }, []);
  
  React.useEffect(() => {
    let enabledCategories = [];
    listedCategories.forEach((category) => {
      if (category.isEnabled) {
        enabledCategories.push(category);
      }
    });
    setChosenCategories(enabledCategories);
  }, [listedCategories]);

  const handleCheckChange = (event) => {
    let newCategories = listedCategories.map((category) => {
      if (category.name === event.target.name) {
        return { ...category, isEnabled: event.target.checked };
      }
      return category;
    });
    setListedCategories(newCategories);
  };

  const handleSubmit = () => {
    if (chosenCategories.length > 0) {
      changeCategories(listedCategories);
      localStorage.setItem("entries", JSON.stringify([]));
      nextStep(2);
    }
  };
  return (
    <>
      <p>Choose what you spend money on</p>
      <div className="welcome-card-container">
        <div className="categories">
          {listedCategories &&
            listedCategories.map((category) => {
              const Icon = useIcons(category.icon);
              return (
                <div className="checkbox" key={category.id}>
                  <ListItemIcon>
                    <Icon sx={{ color: "#000000c4" }} />
                  </ListItemIcon>
                  <FormControlLabel
                    onChange={handleCheckChange}
                    control={
                      <Checkbox
                        name={category.name}
                        value={category.name}
                        checked={category.isEnabled ? true : false}
                        sx={{
                          color: "#111",
                          "&.Mui-checked": {
                            color: "#111",
                          },
                        }}
                      />
                    }
                    label={category.name}
                    labelPlacement="start"
                    sx={{
                      flexGrow: "1",
                      justifyContent: "space-between",
                      ".MuiFormControlLabel-label": {
                        fontWeight: "600",
                        color: "#111",
                      },
                    }}
                  />
                </div>
              );
            })}
        </div>
        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          disabled={chosenCategories.length > 0 ? false : true}
          sx={{
            "&": { backgroundColor: "#6200EE" },
            "&:hover": {
              backgroundColor: "#6200EE",
            },
          }}
        >
          Done
        </Button>
      </div>
    </>
  );
};

export default Categories;
