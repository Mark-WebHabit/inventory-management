import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages
import MainLayout from "./layout/MainLayout";
import Dashboard from "./views/Dashboard";

import AuthLayout from "./layout/AuthLayout";
import Login from "./views/Login";
import Register from "./views/Register";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/app" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
