import React from "react";
import { Button, styled, TextField } from "@mui/material";

const CssTextField = styled(TextField)({
  "& .MuiInput-underline::before": {
    borderBottomColor: "red",
  },
  "&": {
    backgroundColor: "#ddd",
  },
  "& label.Mui-focused": {
    color: "#6200EE",
  },
  "& .MuiInput-underline::after": {
    borderColor: "#6200EE",
  },
});

const Amount = ({ nextStep }) => {
  const [amount, setAmount] = React.useState(0); 
  const handleChange = (e) => {
      let entry = e.target.value*1;
      if (!isNaN(entry)) {
          setAmount(entry);
      }
  }
  const handleSubmit = () => {
    if (amount) {
      localStorage.setItem('amount', JSON.stringify({amount}))
      nextStep(1);
    }
  }
  return (
    <>
      <p>How much money do you have</p>
      <div className="welcome-card-container">
        <CssTextField
          label="Amount"
          variant="filled"
          autoComplete="off"
          onChange={handleChange}
          value={amount}
        />
        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          disabled={amount? false:true}
          sx={{
            "&": { backgroundColor: "#6200EE" },
            "&:hover": {
              backgroundColor: "#6200EE",
            },
          }}
        >
          Add
        </Button>
      </div>
    </>
  );
}

export default Amount