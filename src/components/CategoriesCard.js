import React from "react";
import { Box, List, ListItem, ListItemIcon, Typography} from "@mui/material";
import CategoryListItem from "./CategoryListItem";
import AddIcon from "@mui/icons-material/Add";
import { CategoriesContext } from "../context/CategoriesContext";
import NewUpdateCategoryModal from "../components/NewUpdateCategoryModal";

//! Edit NewUpdateEntryModal
const CategoriesCard = () => {
  const [targetedItem, setTargetedItem] = React.useState(null);
  const [editAction, setEditAction] = React.useState("new");
  const [categoryModalOpen, setCategoryModalOpen] = React.useState(false);
  const {categories, changeCategories} = React.useContext(CategoriesContext)


  //! Edit Category Modal
  const handleCategoryModalOpen = () => setCategoryModalOpen(true);
  const handleCategoryModalClose = (newCategories) => {
    setCategoryModalOpen(false);
    setTargetedItem(null)
    setEditAction("new")
    if (newCategories) {
      changeCategories(newCategories);
    }
  };

  const updateCategory = (event) => {
    setTargetedItem(event.target.closest("li"));
    setEditAction("update");
    handleCategoryModalOpen();
  };

  return (
    <>
      <Box
        sx={{
          borderTopLeftRadius: "7px",
          borderTopRightRadius: "7px",
          marginBottom: "2rem",
          boxShadow:
            "0px 2px 8px 4px #dedcdc, 1px 1px 4px 0px #e9e9e9, -3px 2px 4px 0px #e9e9e9",
        }}
      >
        <Box
          sx={{
            padding: "10px",
            backgroundColor: "#ececec",
            color: "#7d7d7d",
            fontSize: ".95rem",
            textTransform: "capitalize",
            fontWeight: 600,
          }}
        >
          Categories
        </Box>
        <List>
          <ListItem
            onClick={() => handleCategoryModalOpen(true)}
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <ListItemIcon>
              <AddIcon sx={{ color: "#000000c4" }} />
            </ListItemIcon>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexGrow: 1,
                borderBottom: "2px solid #dcdcdc",
                height: "40px",
              }}
            >
              <Typography
                variant="body1"
                sx={{ textAlign: "start", textTransform: "capitalize" }}
              >
                Add New Category
              </Typography>
            </Box>
          </ListItem>
          {categories &&
            categories.map((category, ind) => (
              <CategoryListItem
                {...category}
                handleUpdatingCategory={updateCategory}
                key={ind}
              />
            ))}
        </List>
      </Box>
      {categoryModalOpen && (
        <NewUpdateCategoryModal
          open={categoryModalOpen}
          handleModalClose={handleCategoryModalClose}
          action={editAction}
          data={targetedItem}
        />
      )}
    </>
  );
};

export default CategoriesCard;
