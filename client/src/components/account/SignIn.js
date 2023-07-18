import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";

export default function SignIn({ theme }) {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/Dashboard");
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ mb: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          component='h1'
          variant='h5'
        >
          Zaloguj się do UCP
        </Typography>
        <Box
          component='form'
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin='normal'
            required
            fullWidth
            id='username'
            label='Nazwa użytkownika'
            name='username'
            autoComplete='username'
            autoFocus
            onChange={handleChange}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Hasło'
            type='password'
            id='password'
            autoComplete='current-password'
            onChange={handleChange}
          />
          {err && err}
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Zaloguj się
          </Button>
        </Box>
      </Box>
      <Typography
        variant='body2'
        color='text.secondary'
        align='center'
      >
        Konto możesz założyć w grze
      </Typography>
    </ThemeProvider>
  );
}
