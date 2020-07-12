import React from 'react';
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

class Result extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <Container >
                <Row>
                    <Col>
                        <h3>Congratulations {localStorage.getItem('user')} ! </h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3>You have answered {localStorage.getItem('questions_answered')} correct questions!</h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3>Your total score is: {localStorage.getItem('total_score')}</h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3>The highest score is: {localStorage.getItem('highest_score')} </h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Link to="/category"> <Button as="input" type="button" value="Try again" />{' '}</Link>
                    </Col>
                </Row>
            </Container>
        )

    }
}

export default Result;