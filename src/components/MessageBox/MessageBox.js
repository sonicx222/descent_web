import * as React from 'react';
import { ListGroup } from 'react-bootstrap';
import Notification from 'cogo-toast';

import { getCampaignMessages, newPlayerMessage } from '../../services/MessageService';

import './MessageBox.css';

export default class MessageBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            messageItems: [],
            messageToSend: "",
            isLoading: true
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        // start to preload data for components

        // load messages to populate list items
        getCampaignMessages()
            .then(response => {
                if (response.data) {
                    console.log("Response", response.data);
                    this.setState({
                        messages: response.data,
                        messageToSend: "",
                        isLoading: false
                    });
                    this.createMessageItems();
                }
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.data) {
                        console.log(error.response.data.errorMessage);
                    } else {
                        console.log(error.response);
                    }
                } else {
                    console.log(error);
                }
            })

    }

    createMessageItems() {
        let items = [];

        if (this.state.messages.length > 0) {
            let message = null;
            let messageTime = null;
            let messageText = null;

            let cssStyle = null;

            for (let i = 0; i < this.state.messages.length; i++) {
                message = this.state.messages[i];
                messageTime = new Date(message.createdOn.seconds * 1000).toLocaleString();

                if (message.type === 'PLAYER') {
                    messageText = messageTime + ' ' + message.username + ': ' + message.text;
                } else if (message.type === 'GAME') {
                    messageText = message.text;
                    // cssStyle = { color: red };
                } else {
                    // SYSTEM

                }

                items.push(
                    <div className="message-item" key={this.state.messages[i].id}>
                        <ListGroup.Item key={this.state.messages[i].id}>
                            {messageText}
                        </ListGroup.Item>
                    </div>
                );
            }
            this.setState({
                messageItems: items
            });
        }
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        console.log("MessageBox submit()");
        if (this.state.messageToSend) {
            let { hide } = Notification.loading("Waiting for Cloud service...", { hideAfter: 0 });
            newPlayerMessage(this.state.messageToSend)
                .then(response => {
                    if (response.data) {
                        hide();
                        this.fetchData();
                    }
                })
                .catch(error => {
                    hide();
                    console.log(error.response.data);
                    Notification.error(error.response.data.errorMessage);
                })
            event.preventDefault();
        }
    }

    render() {
        if (this.state.isLoading) {
            return null;
        }

        return (
            <div className="box-wrapper">
                {this.state.messages.length > 0 &&
                    <div className="messages-wrapper">
                        <div className="messages">
                            <ListGroup variant="flush">
                                {this.state.messageItems}
                            </ListGroup>
                        </div>
                    </div>
                }
                <div className="message-input-wrapper">
                    {/* <form onSubmit={this.handleSubmit}> */}
                    <input className="input"
                        type="text"
                        name="messageToSend"
                        placeholder="Message"
                        value={this.state.messageToSend}
                        onChange={this.handleChange}
                        required
                    />
                    <button onClick={this.handleSubmit} className="loginbutton">Send</button>
                    {/* </form> */}
                </div>
            </div>
        );
    }
}