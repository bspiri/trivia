import React from "react";
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import Tilt from 'react-tilt'
import { Link } from "react-router-dom";
import axios from "axios";

class Category extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            categories: [],

        }
    }

    resetQuizData = () => {
        localStorage.setItem('is_finished', 0);
        localStorage.setItem('total_score', 0);
        localStorage.setItem('questions_answered', 0);
    }

    componentDidMount() {

        // clear previous quiz data
        this.resetQuizData();

        // get categories
        axios.get(`https://opentdb.com/api_category.php`)
            .then(res => {
                const categories = res.data.trivia_categories;

                this.setState({ categories });
            })
    }

    render() {

        return (
            <div>
                <h2>Choose one category</h2>
                <CardColumns>
                    {this.state.categories.map((category) => {
                        return (
                            <Tilt key={category.id}
                                className="Tilt"
                                options={{ max: 20, speed: 500, transition: true }}
                            >
                                <Link to={`/quiz/${category.id}`} ><Card>
                                    <Card.Img variant="top" src="" />
                                    <Card.Body>
                                        <Card.Title>{category.name}</Card.Title>
                                    </Card.Body>
                                </Card>
                                </Link>
                            </Tilt>
                        )
                    })}
                </CardColumns>
            </div>
        )

    }

}


export default Category;
