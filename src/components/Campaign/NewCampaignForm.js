import * as React from 'react';
import { Link, Navigate } from 'react-router-dom';
import Notification from 'cogo-toast';

import { newCampaign } from '../../services/Campaignservice';

import './NewCampaignForm.css';

export default class NewCampaignForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campaignname: "",
      errors: "",
      redirect: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    console.log("Create new campaign");
    let { hide } = Notification.loading("Waiting for Cloud service...", { hideAfter: 0 });
    newCampaign(
      {
        name: this.state.campaignname
      })
      .then(response => {
        if (response.data) {
          hide();
          console.log("Response ", response.data);
          this.setState({ redirect: "/heroselection" });
        }
      })
      .catch(error => {
        hide();
        console.log("error: ", error);
        if (error.response) {
          console.log("error.response: ", error.response);
        }
        if (error.response.data) {
          console.log("error.response.data: ", error.response.data);
          Notification.error(error.response.data.errorMessage);
        }
      })

    event.preventDefault();
    this.setState({
        campaignname: ""
    });
  }

  render() {
    if (this.state.redirect) {
      return <Navigate replace to={this.state.redirect} />
    }

    return (
      <div className="box">
        <form className="newcampaignform" onSubmit={this.handleSubmit}>
          <input className="input"
            type="text"
            name="campaignname"
            placeholder="Campaign name"
            value={this.state.campaignname}
            onChange={this.handleChange}
            required
          />
          <div className="nav">
          <button type="submit" className="newcampaignbutton">Create Campaign</button>
          </div>
        </form>
        <Link to={"/start"} >
          <div className="label-back">Back to Start</div>
        </Link>
      </div>
    );
  }
}