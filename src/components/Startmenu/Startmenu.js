import * as React from "react";
import * as Page from '../../route/redirects';
import Menulink from "../Menulink/Menulink";

import './Startmenu.css'

class Startmenu extends React.Component {
  render() {
    return (
      <div className="startmenu background">
        <Menulink route={Page.NEWCAMPAIGN} label="New Campaign" />
        <Menulink route={Page.CAMPAIGNSELECTION} label="Join Campaign" />
        <Menulink route={Page.SETTINGS} label="Settings" />
        <Menulink route={Page.LOGOUT} label="Logout" />
      </div>
    );
  }
}

export default Startmenu;