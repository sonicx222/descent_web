import * as React from "react";
import Menulink from "../Menulink/Menulink";
import './Startmenu.css'

class Startmenu extends React.Component {
  render() {
    return (
      <div className="startmenu background">
        <Menulink route="/campaign" label="New Campaign" />
        <Menulink route="/campaign" label="Join Campaign" />
        <Menulink route="/settings" label="Settings" />
        <Menulink route="/logout" label="Logout" />
      </div>
    );
  }
}

export default Startmenu;