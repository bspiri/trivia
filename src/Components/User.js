import React from "react";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

class User extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user: localStorage.getItem("user")
        }
    }

    handleInput = (e) => {
        const inputValue = e.target.value
        localStorage.setItem("user", inputValue)
        this.setState({
            user: inputValue
        })
    }

    render() {
        return (
            <div>
                <h1> Select your username  </h1>
                <InputGroup size="lg">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-lg">Username</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl onChange={this.handleInput} aria-label="Username" value={this.state.user || ''} aria-describedby="inputGroup-sizing-sm" />
                </InputGroup>
                <p>Let the fun begin </p>
                <Link to="/category"> <Button as="input" type="button" value="Start the game" />{' '}</Link>

            </div>
        )

    }

}

export default User;