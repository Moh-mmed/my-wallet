import Link from "next/link";
import React from "react";
import axios from "axios";
import Router from "next/router";
import PageHead from "../src/components/PageHead";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FormHelperText } from "@mui/material";



const emailValidator = (email) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
     return null
  };
  return "Email is not valid"
};

const passwordValidator = (pass) => {
  const specialChar = ["!", "@", "#", "$", "%", "^", "&", "*"].some(
    (char) => {
      return pass.includes(char);
    }
  );
  let errs = []
  if (pass.length > 32) {
    errs.push("Password must be less than 32 characters");
  }
  if (pass.length < 8) {
    errs.push("Password must be at least 8 characters");
  }
  if (!specialChar) {
    errs.push("Password must contain at least one of this characters (!@#$%^&*)");
  }
  return errs.length < 1 ? null : errs;
};

export default function signUp() {
  const [values, setValues] = React.useState({
    username: "",
    password: "",
    showPassword: false,
  });

  const [usernameError, setUsernameError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState([]);

  const handleChange = (prop) => (event) => {
    if (prop === "username") {
      setUsernameError(emailValidator(event.target.value));
    } else if (prop === "password") {
      setPasswordError(passwordValidator(event.target.value));
    }
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const submitForm = async () => {
    setUsernameError(emailValidator(values.username));
    setPasswordError(passwordValidator(values.password));
    if (!emailValidator(values.username) && !passwordValidator(values.password)) {
      try {
       const response = await axios.get("https://randomuser.me/api/");
       const data = await response.data.results[0];
       localStorage.setItem(
         "thumbnail",
         JSON.stringify({ thumbnail: data.picture.thumbnail })
       );
        Router.push("/welcome-wizard");
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <>
      <PageHead title="Sign Up" />
      <div className="signup container">
        <img
          className="hero-logo"
          src="/images/logo.png"
          alt="coin tracker logo"
        />
        <h1 className="welcoming-title">sign up</h1>

        <Box component="form" noValidate autoComplete="off">
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={values.username}
            onChange={handleChange("username")}
            error={usernameError ? true : false}
            helperText={usernameError}
            sx={{
              margin: "1rem 0",
              "& label.Mui-focused": {
                color: "#6200EE",
              },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#6200EE",
                },
              },
              "& .Mui-error": {
                color: "#f44336",
              },
              "& label.Mui-error": {
                color: "#f44336",
              },
              "& .MuiOutlinedInput-root.Mui-error": {
                "&.Mui-focused fieldset": {
                  borderColor: "#f44336",
                },
              },
            }}
          />
          <FormControl
            fullWidth
            sx={{
              margin: "1rem 0",
              "& label.Mui-focused": {
                color: "#6200EE",
              },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#6200EE",
                },
              },
              "& .Mui-error": {
                color: "#f44336",
              },
              "& .MuiOutlinedInput-root.Mui-error": {
                "&.Mui-focused fieldset": {
                  borderColor: "#f44336",
                },
              },
            }}
          >
            <InputLabel
              htmlFor="password"
              sx={{
                root: {
                  color: "red",
                },
              }}
            >
              Password
            </InputLabel>
            <OutlinedInput
              id="password"
              label="Password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              error={passwordError && passwordError.length > 0 ? true : false}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {passwordError &&
              passwordError.length > 0 &&
              passwordError.map((err, ind) => (
                <FormHelperText error key={ind}>
                  {err}
                </FormHelperText>
              ))}
          </FormControl>
        </Box>

        <Button
          variant="contained"
          disabled={usernameError || passwordError ? true : false}
          onClick={submitForm}
          sx={{
            margin: "2rem 0 0",
            fontWeight: "600",
            backgroundColor: "#6200EE",
            "&:hover": {
              backgroundColor: "#6200EE",
            },
            "&:disabled": {
              color: "#8b8b8b",
              backgroundColor: "transparent",
            },
          }}
        >
          SIGN UP
        </Button>

        <div className="sing-redirect">
          <Typography
            variant="caption"
            display="block"
            sx={{
              margin: ".5rem 0 0",
              color: "#8b8b8b",
            }}
          >
            Already have an account?
          </Typography>
          <Link href="/signin">
            <a className="signin-link">Sign in please.</a>
          </Link>
        </div>
      </div>
    </>
  );
}
