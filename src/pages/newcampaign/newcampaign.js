import * as React from "react";
import { Navigate } from "react-router-dom";
import { isSessionActive } from '../../services/Sessionservice';
import './newcampaign.css';

export default class NewCampaign extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: ""
        }
    }

    componentDidMount() {
        // if (!isSessionActive) {
        //     this.setState({
        //         redirect: "/login"
        //     });
        // }
    }

    render() {
        if (this.state.redirect) {
            console.log("redirect to: ", this.state.redirect);
            return <Navigate replace to={this.state.redirect} />
        }

        return (
            <div className="newcampaignpage">
                <div className="newcampaigncover">
                    
                </div>
            </div>
        );
    }
}