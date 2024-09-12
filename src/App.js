import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import Index from "./pages/Index";
import ExplorePage from "./pages/ExplorePage";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import CommentPage from "./pages/CommentPage";
import About from "./pages/About";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" exact element={<Index />} />
          <Route path="/explore" exact element={<ExplorePage />} />
          <Route path="/profile/:id" exact element={<ProfilePage />} />
          <Route path="/profile/edit/:id" exact element={<EditProfilePage />} />
          <Route path="/comment/01" exact element={<CommentPage />} />
          <Route path="/about" exact element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
