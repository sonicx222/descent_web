import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import './AvailableHeroes.css';


export default class AvailableHeroes extends React.Component {
    constructor(props) {
        super(props);
        console.log('props', props);
        this.state = {
            herotemplates: this.props.heroes,
            selectedHero: {},
            listItems: [],
            redirect: ""
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        console.log(event.target.name);
        console.log(event.target.value);
        this.setState({
            selectedHero: event.target.value
        });
    }

    componentDidMount() {
        console.log("availableheroes:componentDidMount()");
        this.createSelectItems();
        console.log("this.state.listItems2: ", this.state.listItems);
    }

    createSelectItems() {
        console.log("Calling createSelectItems()...");
        let items = [];
        console.log("this.state.herotemplates.length", this.state.herotemplates.length);
        if (this.state.herotemplates.length > 0) {
            for (let i = 0; i < this.state.herotemplates.length; i++) {
                items.push(
                    <ListGroup.Item action onClick={this.handleClick}
                        name={this.state.herotemplates[i].imageName}
                        value={JSON.stringify(this.state.herotemplates[i])}>
                        {this.state.herotemplates[i].name}
                    </ListGroup.Item>
                );
            }
        }

        this.setState({ listItems: items });
        console.log("this.state.listItems1: ", this.state.listItems);
    }


    render() {
        console.log("Calling render()...");
        console.log("this.state.selectedHero: ", this.state.selectedHero);

        if (this.state.redirect) {
            return <Navigate replace to={this.state.redirect} />
        }


        return (
            <div id="heroselection-region">
                <ListGroup>
                    {this.state.listItems}
                </ListGroup>
                {/* <ListGroup>
                    {this.state.herotemplates.map(item => (
                        <ListGroup.Item action >{item.name}</ListGroup.Item>
                    ))}
                </ListGroup> */}
            </div>
        );


    }
}