import React from "react";
import { Routes, Route } from "react-router-dom";

import Portfolio from "./Portfolio";
import ProjectDetails from "./ProjectDetails";
import Navbar from "./Navbar";

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route
        path="/"
        element={<Portfolio />}
      />

      <Route
        path="/projects/:slug"
        element={<ProjectDetails />}
      />
    </Routes>
    </>
  );
}

export default App;