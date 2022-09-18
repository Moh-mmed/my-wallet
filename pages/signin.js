import Link from "next/link"
import PageHead from "../src/components/PageHead";
import React from 'react'
import Router from "next/router";
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
import axios from "axios";

export default function signIn() {
  const [values, setValues] = React.useState({
    username: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
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
    if (values.username && values.password) {
      try {
        const response = await axios.get("https://randomuser.me/api/");
        const data = await response.data.results[0];
        localStorage.setItem(
          "thumbnail",
          JSON.stringify({ thumbnail: data.picture.thumbnail })
        );
        Router.push("/overview");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <PageHead title="Sign In"/>
      <div className="signin container">
        <img
          className="hero-logo"
          src="/images/logo.png"
          alt="coin tracker logo"
        />
        <h1 className="welcoming-title">sign in</h1>

        <Box component="form" noValidate autoComplete="off">
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={values.username}
            onChange={handleChange("username")}
            sx={{
              margin: "1rem 0",
              "& label.Mui-focused": {
                color: "#6200EE",
              },
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "#6200EE",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#6200EE",
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
                "&:hover fieldset": {
                  borderColor: "#6200EE",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#6200EE",
                },
              },
            }}
          >
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              label="Password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
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
          </FormControl>
        </Box>

        <Button
          variant="contained"
          onClick={submitForm}
          sx={{
            margin: "2rem 0 0",
            backgroundColor: "#6200EE",
            "&:hover": {
              backgroundColor: "#6200EE",
            },
          }}
        >
          SIGN IN
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
            Don't have an account yet?
          </Typography>
          <Link href="/signup">
            <a className="signup-link">Sign up now, it is free!</a>
          </Link>
        </div>
      </div>
    </>
  );
}