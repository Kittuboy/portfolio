import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Portfolio from "./Portfolio";
import ProjectDetails from "./ProjectDetails";
import Navbar from "./Navbar";
import { api } from "./services/api";

function App() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/profile");
        setProfile(response.data);
      } catch (error) {
        console.error("Profile fetch error:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <>
      <Navbar profile={profile} />

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
