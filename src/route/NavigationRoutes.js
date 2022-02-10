import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import * as Page from './redirects';

import Register from "../pages/register/register";
import Login from "../pages/login/login";
import Logout from "../components/Logout/Logout";
import Start from '../pages/start/start';
import NewCampaign from "../pages/newcampaign/newcampaign";
import CampaignSelection from "../pages/campaignselection/campaignselection";
import HeroSelection from "../pages/heroselection/heroselection";
import Prolog from "../pages/prolog/prolog";
import Quest from '../pages/quest/quest';
import Travelmap from "../pages/travelmap/travelmap";
import Testmap from "../pages/testmap/testmap";
import Test from "../pages/test";

const NavigationRoutes = () => (
    <Routes>
        <Route path="/" element={<Login />}>
            <Route path="*" element={<NoMatch />} />
        </Route>
        <Route path={Page.LOGIN} element={<Login />} />
        <Route path={Page.LOGOUT} element={<Logout />} />
        <Route path={Page.REGISTER} element={<Register />} />
        <Route path={Page.START} element={<Start />} />
        <Route path={Page.NEWCAMPAIGN} element={<NewCampaign />} />
        <Route path={Page.CAMPAIGNSELECTION} element={<CampaignSelection />} />
        <Route path={Page.HEROSELECTION} element={<HeroSelection />} />
        <Route path={Page.PROLOG} element={<Prolog />} />
        <Route path={Page.QUEST} element={<Quest />} />
        <Route path={Page.TRAVELMAP} element={<Travelmap />} />
        <Route path="/testmap" element={<Testmap />} />
        <Route path="/test" element={<Test />} />
    </Routes>
);

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

export default NavigationRoutes;

