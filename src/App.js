import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import axios from 'axios';
import './App.css';
import Register from "./pages/register/register";
import Login from "./pages/login/login";
import Logout from "./components/Logout/Logout";
import RequireAuth from "./components/RequireAuth/RequireAuth"; 
import Start from './pages/start/start';
import NewCampaign from "./pages/newcampaign/newcampaign";
import CampaignSelection from "./pages/campaignselection/campaignselection";
import HeroSelection from "./pages/heroselection/heroselection";
import Testmap from "./pages/testmap/testmap";
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
        <Route path="/newcampaign" element={<NewCampaign />} />
        <Route
          path="/campaigns"
          element={
            <RequireAuth>
              <CampaignSelection />
            </RequireAuth>
          }
        />
        <Route path="/heroselection" element={<HeroSelection />} />
        <Route path="/testmap" element={<Testmap />} />
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
