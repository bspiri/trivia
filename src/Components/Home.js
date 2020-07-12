import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";


class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {


        }
    }


    render() {
        return (
            <div>
                <h1> Welcome to the Coolest Trivia Game!  </h1>
                <p>Let the fun begin </p>
                <Link to="/user"> <Button as="input" type="button" value="Start the game" />{' '}</Link>

            </div>
        )

    }

}

export default Home;