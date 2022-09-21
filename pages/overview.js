import React from "react";
import { Box } from "@mui/material";
import PageHead from "../src/components/PageHead";
import Header from "../src/components/Header";
import TabsBar from "../src/components/TabsBar";
import IncomeExpenseCard from "../src/components/IncomeExpenseCard";
import EntriesCard from "../src/components/EntriesCard";
import NewUpdateEntryModal from "../src/components/NewUpdateEntryModal";
import { EntriesContext } from "../src/context/EntriesContext";

export default function overview() {
  const [newButton, setNewButton] = React.useState(false);
  const [targetedItem, setTargetedItem] = React.useState(null);
  const [editAction, setEditAction] = React.useState("new");
  const [entryModalOpen, setEntryModalOpen] = React.useState(false);
  const [entryModalType, setEntryModalType] = React.useState(null);

  const { changeEntries } = React.useContext(EntriesContext);

  const handleNewButton = () => setNewButton((state) => !state);

  //! Edit Entry Modal
  const handleEntryModalOpen = () => setEntryModalOpen(true);
  const handleEntryModalClose = (newEntries) => {
    setEntryModalOpen(false);
    setTargetedItem(null)
    setEditAction("new")
    setEntryModalType(null)
    if (newEntries) {
      changeEntries(newEntries);
    }
  };

  const handleNewEntry = (entryType) => {
    setEntryModalType(entryType);
    handleEntryModalOpen();
  };

  return (
    <>
      <PageHead title="Overview" />
      <Box
        className="container"
        sx={{ overflow: newButton ? "hidden" : "scroll" }}
      >
        <Box
          className="add-button-layer"
          sx={{
            backgroundColor: "rgb(255 255 255 / 75%)",
            display: newButton ? "block" : "none",
            width: "500px",
            position: "fixed",
            zIndex: 1,
            minHeight: "100vh",
          }}
        />
        <Header title="Overview" />
        <Box
          sx={{
            width: "100%",
            padding: "16px 20px 50px",
          }}
        >
          <IncomeExpenseCard type="income" title="incomes" />
          <IncomeExpenseCard type="expense" title="expenses" />
          <EntriesCard
            setEditAction={setEditAction}
            setTargetedItem={setTargetedItem}
            handleModalOpen={handleEntryModalOpen}
            targetedItem={targetedItem}
          />
          {entryModalOpen&&
            <NewUpdateEntryModal
              open={entryModalOpen}
              handleModalClose={handleEntryModalClose}
              type={entryModalType}
              action={editAction}
              data={targetedItem}
            />
          }
        </Box>
      </Box>
      <TabsBar
        newButton={newButton}
        handleNewButton={handleNewButton}
        handleNewEntry={handleNewEntry}
      />
    </>
  );
}
