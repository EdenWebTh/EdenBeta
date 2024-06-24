import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./login";
import SignUp from "./register";
import MainPage from "./main";
import Blog from "./blog";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./profile";
import { useState } from "react";
import { auth } from "./firebase-config";

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });
  return (
    <Router>
      <div className="App">
        <div className="">
          <div className="">
            <Routes>
              <Route
                path="/"
                element={user ? <Navigate to="/main" /> : <MainPage />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/main" element={<MainPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/blog" element={<Blog />} />
            </Routes>
            <ToastContainer />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
