import { LoadingButton } from "@mui/lab";
import {
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function Form(props: any) {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const submit = async (data: any) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsLoading(false);
    navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit(submit)} {...props}>
      <TextField
        id="email"
        disabled={isLoading}
        type="email"
        label="Email"
        fullWidth
        required
        sx={{ mt: 2 }}
        {...register("email")}
      />

      <TextField
        id="password"
        disabled={isLoading}
        type={showPassword ? "text" : "password"}
        label="Senha"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                tabIndex={-1}
                size="small"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        required
        fullWidth
        sx={{ mt: 2 }}
        {...register("password")}
      />

      <LoadingButton
        fullWidth
        color="primary"
        variant="contained"
        type="submit"
        sx={{ mt: 2 }}
        loading={isLoading}
      >
        Login
      </LoadingButton>

      <Typography
        color="#4a4a4a"
        fontWeight="light"
        sx={{
          mt: 2,
          fontSize: 13,
          fontWeight: "normal",
          textAlign: "center",
        }}
      >
        É novo por aqui?
        <Typography
          onClick={() => navigate("/registro")}
          component="span"
          color="primary"
          fontWeight="bold"
          sx={{
            ml: 0.5,
            fontSize: 13,
            fontWeight: "bold",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          Registre-se
        </Typography>
      </Typography>
    </form>
  );
}