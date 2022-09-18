import React from "react";
import * as icons from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  FormControl,
  MenuItem,
  Select,
  TextField,
  Stack,
  Checkbox,
  FormControlLabel,
  ListItemIcon,
  InputLabel,
} from "@mui/material";
import iconsList from "../iconsList"
import { CategoriesContext } from "../context/CategoriesContext";

function useIcons(iconName) {
  const Icon = icons[iconName];
  return Icon;
}

// str.split('_').map(str=>str.charAt(0).toUpperCase()+str.slice(1)).join('')

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  borderRadius: "8px",
  bgcolor: "background.paper",
  boxShadow:
    "0px 2px 8px 4px #dedcdc, 1px 1px 4px 0px #e9e9e9, -3px 2px 4px 0px #e9e9e9",
  p: 4,
};

export default function NewUpdateCategoryModal({
  open,
  handleModalClose,
  data = null,
  action,
}) {
  const [currentCategory, setCurrentCategory] = React.useState(null);
  const [categoryType, setCategoryType] = React.useState("income");
  const [name, setName] = React.useState("");
  const [icon, setIcon] = React.useState("");
  const [budget, setBudget] = React.useState(0);
  const [isEnabled, setIsEnabled] = React.useState(true);

  const { categories } = React.useContext(CategoriesContext);

 
  //! Prepare The form
  React.useEffect(() => {
    if (data) {
      const currCategory = categories.find(
        (cat) => data.getAttribute("id") == cat.id
      );
      setCurrentCategory(currCategory);
      // Fill the form fields
      setCategoryType(currCategory.type);
      setName(currCategory.name);
      setIcon(currCategory.icon);
      setBudget(currCategory.budget);
    }
  }, [data]);

  //! Submit or Cancel buttons
  
  const handleSubmit = (approved) => {
    if (approved) {
      let newCategories = [...categories];
      if (categoryType && name !== "") {
        let id =
          action === "update"
            ? currentCategory["id"]
            : categories.length > 0
            ? parseInt(categories[categories.length - 1]["id"]) + 1
            : 0;

        let newCategory = {
          id: id,
          name: name,
          type: categoryType,
          budget: budget,
          icon: icon,
          isEnabled: isEnabled
        };
        if (action === "update") {
          //* Update
          newCategories = newCategories.map((cat) => {
            if (cat.id === currentCategory.id) {
              return newCategory;
            }
            return cat;
          });
          handleModalClose(newCategories);
          return;
        }
        //* new
        newCategories.push(newCategory);
        handleModalClose(newCategories);
      }
    } else {
      handleModalClose(null);
    }
  };

  let formTitle = action === "new" ? "Add New Category" : "Update Category";
  let submitButtonName = action === "new" ? "Add" : "Update";

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ padding: "2rem" }}
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="subtitle1"
          component="h2"
          sx={{ textTransform: "capitalize", mb: 3 }}
        >
          {formTitle}
        </Typography>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Select
            id="demo-simple-select"
            value={categoryType}
            onChange={(event) => setCategoryType(event.target.value)}
            sx={{ color: "#00000099" }}
          >
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </Select>
        </FormControl>

        <TextField
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          fullWidth
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              color: "#00000099",
            },
          }}
        />

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="demo-select-small">Icon</InputLabel>
          <Select
            id="demo-simple-select"
            value={icon}
            label="Icon"
            onChange={(event) => setIcon(event.target.value)}
            sx={{ color: "#00000099" }}
          >
            {iconsList.map((item, index) => {
              const Icon = icons[item];
              return (
                <MenuItem value={item} key={index}>
                  <ListItemIcon>
                    <Icon sx={{ color: "#000000c4" }} />
                  </ListItemIcon>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <TextField
          placeholder="Budget"
          value={budget > 0 && budget}
          type="number"
          onChange={(event) =>
            event.target.value
              ? setBudget(parseInt(event.target.value))
              : setBudget(0)
          }
          fullWidth
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              color: "#00000099",
            },
          }}
        />

        <Box sx={{ mb: 3 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isEnabled}
                onChange={(event) => setIsEnabled(event.target.checked)}
                sx={{
                  p: 0,
                  "&.Mui-checked": {
                    color: "#00000099",
                  },
                }}
              />
            }
            label="Enabled"
            labelPlacement="start"
            sx={{
              m: 0,
              p: "15px",
              display: "flex",
              justifyContent: "space-between",
              border: "1px solid rgba(0, 0, 0, 0.23)",
              borderRadius: "5px",
              "& .MuiTypography-root": {
                color: "#00000099",
              },
            }}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button
            onClick={() => handleSubmit(false)}
            sx={{
              color: "#6200EE",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleSubmit(true)}
            sx={{
              "&:hover": {
                backgroundColor: "#6200EE",
              },
              m: 1,
              backgroundColor: "#6200EE",
              color: "#fff",
              borderRadius: "5px",
            }}
          >
            {submitButtonName.toUpperCase()}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}