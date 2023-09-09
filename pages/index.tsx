// pages/index.js

import React from "react";
import Dashboard from "../components/Dashboard";
import Navbar from "../components/Navbar"

const MyApp = () => {
  return (
    <div>
      <Navbar />
      <Dashboard />
    </div>
  );
};

export default MyApp;
