import React from "react";
import { Route, Routes as BrowserRouter } from "react-router-dom";
import { Register } from "../pages/Register";
import { Login } from "../pages/Login";

export function Routes() {
  return (
    <BrowserRouter>
      <Route path="" element={<div>Home</div>} />
      <Route path="login" element={<Login />} />
      <Route path="registro" element={<Register />} />

      <Route path="*" element={<div>404</div>} />
    </BrowserRouter>
  );
}
