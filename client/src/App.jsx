import { Sidebar } from "./components/Sidebar";
import { Landing } from "./pages/Landing";
import { Content } from "./pages/Content";
import { Users } from "./pages/Users";
import { About } from "./pages/About";
import { HTTP404 } from "./pages/HTTP404";
import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router";

import "./App.css";

export function App() {
  const [users, setUsers] = useState([]);
  const iHatePrettier = async () => {
    const url = import.meta.env.VITE_SERVER_URL + "readUsers";
    setUsers(await (await fetch(url)).json());
  };
  useEffect(() => {
    iHatePrettier();
  }, []); // Factor code out else prettier makes it unreadable

  return (
    <div id="page-layout">
      <Sidebar id="sidebar" />
      <div>
        <nav id="navbar">
          <Link to="">Home</Link>
          <Link to="comments">Comments</Link>
          <Link to="users">Users</Link>
          <Link to="about">About Us</Link>
        </nav>
        <Routes>
          <Route index element={<Landing />} />
          <Route path="comments" element={<Content users={users} />} />
          <Route path="users" element={<Users users={users} />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<HTTP404 />} />
          {/*<Route
          path="profiles/:username"
          element={<UserProfile users={users} />}
        >
          <Route path="orders" element={<UserOrders />} />
          {/* Make sure the nested route only has the relevant params in it
        </Route> */}
        </Routes>
      </div>
    </div>
  );
}
