import * as React from "react";
import { Link } from "react-router-dom";
import './Menulink.css';

class Menulink extends React.Component {

    render() {
        return (
            <Link to={this.props.route} >
                <div className="menulink">{this.props.label}</div>
            </Link>
        );
    }
}

export default Menulink;