import React from "react";
import { Box, List, Menu, MenuItem } from "@mui/material";
import EntryListItem from "./EntryListItem";
import ConfirmationModal from "./ConfirmationModal";
import { EntriesContext } from "../context/EntriesContext";

//! Edit NewUpdateEntryModal
const EntriesCard = ({
  setEditAction,
  setTargetedItem,
  handleModalOpen,
  targetedItem,
}) => {
  const [contextMenu, setContextMenu] = React.useState(null);
  const [confirmationModal, setConfirmationModal] = React.useState(false);

  const { entries, changeEntries } = React.useContext(EntriesContext);

  //! Confirmation Modal
  const handleConfirmationModalOpen = () => setConfirmationModal(true);
  const handleConfirmationModalClose = (res) => {
    setConfirmationModal(false);
    setTargetedItem(null)
    if (res) {
      //* Delete
      let newEntries = entries.filter(
        (entry) => entry.id != targetedItem.getAttribute("id")
      );
      changeEntries(newEntries);
    }
  };

  //! Context menu
  //* Open Context Menu
  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null
    );
    setTargetedItem(event.target.closest("li"));
  };

  //* Close context Menu
  const handleContextMenuClose = () => setContextMenu(null);

  //* Generate Context Menu Items
  const menuItem = (title) => {
    let handleAction;
    switch (title.toLowerCase()) {
      case "duplicate": {
        handleAction = duplicateEntry;
        break;
      }
      case "create new": {
        handleAction = createNewEntry;
        break;
      }
      case "delete": {
        handleAction = deleteEntry;
        break;
      }
    }
    return (
      <MenuItem
        onClick={handleAction}
        sx={{
          "&": {
            color: title === "delete" && "#B00020",
            minHeight: "inherit",
            paddingTop: "15px",
            textTransform: "capitalize",
            fontSize: ".86rem",
            lineHeight: 1,
          },
        }}
      >
        {title}
      </MenuItem>
    );
  };

  //* DUPLICATE
  const duplicateEntry = () => {
    setEditAction("new");
    handleContextMenuClose();
    handleModalOpen();
  };

  //* CREATE NEW
  const createNewEntry = () => {
    setTargetedItem(null);
    setEditAction("new");
    handleContextMenuClose();
    handleModalOpen();
  };

  //* UPDATE
  const updateEntry = (event) => {
    setTargetedItem(event.target.closest("li"));
    setEditAction("update");
    handleModalOpen();
  };

  //* DELETE
  const deleteEntry = () => {
    handleContextMenuClose();
    handleConfirmationModalOpen();
  };

  return (
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
        Entries
      </Box>
      <List dense>
        {entries && entries.map((entry) => (
          <EntryListItem
            {...entry}
            key={entry.id}
            handleContextMenu={handleContextMenu}
            handleUpdatingEntry={updateEntry}
          />
        ))}
      </List>
      <Menu
        open={contextMenu !== null}
        onClose={handleContextMenuClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        {menuItem("duplicate")}
        {menuItem("create new")}
        {menuItem("delete")}
      </Menu>
      {confirmationModal && (
        <ConfirmationModal
          open={confirmationModal}
          handleModalClose={handleConfirmationModalClose}
        />
      )}
    </Box>
  );
};

export default EntriesCard;
