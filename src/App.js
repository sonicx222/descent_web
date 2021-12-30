import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import axios from 'axios';
import './App.css';
import Start from './pages/start/start';
import Register from "./pages/register/register";
import Login from "./pages/login/login";
import Logout from "./components/Logout/Logout";
import Campaign from "./pages/campaign/campaign";
import RequireAuth from "./components/RequireAuth/RequireAuth"; 
import Test from "./pages/test";

function App() {
  // const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  // const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  // alert('vw: ' + vw + ', vh:' + vh);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Login />}>
          <Route path="*" element={<NoMatch />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/start"
          element={
            <RequireAuth>
              <Start />
            </RequireAuth>
          }
        />
        <Route
          path="/campaign"
          element={
            <RequireAuth>
              <Campaign />
            </RequireAuth>
          }
        />
        <Route path="/test" element={<Test />} />
      </Routes>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the start page</Link>
      </p>
    </div>
  );
}

export default App;
