import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Autocomplete,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Stack,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { EntriesContext } from "../context/EntriesContext";
import { CategoriesContext } from "../context/CategoriesContext";

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

export default function NewUpdateEntryModal({
  open,
  handleModalClose,
  data = null,
  type = null,
  action,
}) {
  const [currentEntry, setCurrentEntry] = React.useState(null);
  const [editedCategories, setEditedCategories] = React.useState([]);
  const [categoryType, setCategoryType] = React.useState("income");
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [amount, setAmount] = React.useState(0);
  const [description, setDescription] = React.useState("");
  const [date, setDate] = React.useState(new Date());

  const { entries } = React.useContext(EntriesContext);
  const { chosenCategories } = React.useContext(CategoriesContext);

  //* Filter Categories depending on the selected type
  React.useEffect(() => {
    const labels = [];
    chosenCategories.forEach((category) => {
      if (category.type === categoryType) {
        labels.push({ label: category.name, id: category.id });
      }
    });
    setEditedCategories(labels);
    setSelectedCategory(null);
  }, [categoryType, chosenCategories]);

  //! Prepare The form
  React.useEffect(() => {
    if (data) {
      const currEntry = entries.find(
        (entry) => data.getAttribute("id") == entry.id
      );
      setCurrentEntry(currEntry);
      // Fill the form fields
      setCategoryType(currEntry.type);
      setAmount(currEntry.amount);
      setDate(new Date(currEntry.date));
      setDescription(currEntry.description || "");
    }
  }, [data]);

  React.useEffect(() => {
    if (type) {
      setCategoryType(type);
    }
  }, [type])

  React.useEffect(() => {
    if (currentEntry) {
      let categoryName = currentEntry.category;
      const arr = categoryName.split(" ");

      for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
      }
      categoryName = arr.join(" ");
      setSelectedCategory(categoryName);
    }
  }, [currentEntry]);

  //! Submit or Cancel buttons
  const handleSubmit = (approved) => {
    if (approved) {
      let cat = chosenCategories.find(
        (category) => category.name === selectedCategory
      );

      if (categoryType && cat && amount && date) {
        let id =
          action === "update"
            ? currentEntry["id"]
            : entries.length > 0
            ? parseInt(entries[entries.length - 1]["id"]) + 1
            : 0;

        let entry = {
          id: id,
          category: cat.name,
          type: categoryType,
          amount: amount,
          icon: cat.icon,
          date: date,
          description: description,
        };
        if (action === "update") {
          //* Update
          const newEntries = entries.map((item) => {
            if (item.id === currentEntry.id) {
              return entry;
            }
            return item;
          });
          handleModalClose(newEntries);
          return;
        }
        //* new
        entries.push(entry);
        handleModalClose(entries);
      }
    } else {
      handleModalClose(null);
    }
  };

  let formTitle = action === "new" ? "Add New Entry" : "Update Entry";
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
            value={categoryType || null}
            onChange={(event) => setCategoryType(event.target.value)}
            sx={{ color: "#00000099" }}
          >
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </Select>
        </FormControl>

        <Autocomplete
          disablePortal
          options={editedCategories}
          value={selectedCategory}
          onChange={(event, newValue) =>
            newValue && setSelectedCategory(newValue.label)
          }
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Category"
              sx={{ "& .MuiAutocomplete-input": { color: "#00000099" } }}
            />
          )}
          sx={{ mb: 3 }}
        />

        <TextField
          placeholder="Amount"
          value={amount || ""}
          type="number"
          onChange={(event) => setAmount(parseInt(event.target.value))}
          fullWidth
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              color: "#00000099",
            },
          }}
        />
        <Stack sx={{ mb: 3 }}>
          <DesktopDatePicker
            inputFormat="dd.MM.yyyy"
            value={date}
            onChange={(event) => setDate(event)}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>

        <TextField
          placeholder="Description (optional)"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          fullWidth
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              color: "#00000099",
            },
          }}
        />

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
