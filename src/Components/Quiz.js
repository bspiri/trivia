import React from "react";
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from "axios";
import shuffle from 'shuffle-array';

class Quiz extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            questionObject: null, // don't save to localstorage
            questionPoint: 0, // don't save to localstorage
            questionsAnswered: this.getLocalStorageItemAsInteger('questions_answered'),
            totalScore: this.getLocalStorageItemAsInteger('total_score'),
            highestScore: this.getLocalStorageItemAsInteger('highest_score'),
            lastAnswer: '',
            isNextDisabled: true,
            user: localStorage.getItem('user') || '',
            isFinished: this.getLocalStorageItemAsInteger('is_finished') // check if quiz finished because of wrong answer
        }
    }

    // get localstorage item always as an integer
    getLocalStorageItemAsInteger(key) {
        return parseInt(localStorage.getItem(key) || 0)
    }

    // calculate question point
    calculateQuestionPoint = (difficulty) => {
        let point = 0
        if (difficulty === 'easy') {
            point = 10
        } else if (difficulty === 'medium') {
            point = 20
        } else if (difficulty === "hard") {
            point = 30
        }
        this.setState({ questionPoint: point })
    }

    // check answer and decide where to go
    handleNextQuestion = () => {

        // if question answer is correct
        if (this.state.lastAnswer == this.state.questionObject.correct_answer) {

            // increase number of questions answered
            const questionsAnswered = this.state.questionsAnswered + 1;

            // total score must be calculated before high score check
            const totalScore = this.state.totalScore + this.state.questionPoint;

            // check if current total score is bigger than existing highest score
            let highestScore = this.state.highestScore;
            if (totalScore > highestScore) {
                highestScore = totalScore
            }

            // set state
            this.setState({
                questionsAnswered: questionsAnswered,
                highestScore: highestScore,
                totalScore: totalScore
            });

            // save to localstorage
            localStorage.setItem('questions_answered', questionsAnswered);
            localStorage.setItem('total_score', totalScore);
            localStorage.setItem('highest_score', highestScore);

            // get next question
            this.getQuestion();

        } else {

            // set quiz is finished
            this.setState({ isFinished: 1 });
            localStorage.setItem('is_finished', 1);

            // redirect to result page
            this.props.history.push('/result');
        }
    }

    getQuestion = () => {

        const categoryId = this.props.match.params.categoryId

        axios.get(`https://opentdb.com/api.php?amount=1&type=multiple&category=${categoryId}&encode=url3986`)
            .then(res => {

                const questionObject = res.data.results[0];

                const options = questionObject.incorrect_answers; //array
                options.push(questionObject.correct_answer); // text

                shuffle(options);
                questionObject.options = options

                // url encoding decode
                questionObject.question = decodeURIComponent(questionObject.question)
                questionObject.correct_answer = decodeURIComponent(questionObject.correct_answer)
                questionObject.options = questionObject.options.map(option => decodeURIComponent(option));

                this.setState({ questionObject });
                this.calculateQuestionPoint(questionObject.difficulty)
            })
    }

    // initial question
    componentDidMount() {
        if (this.state.isFinished) {
            // redirect to result page because quiz had finished
            this.props.history.push('/result');
        } else {
            this.getQuestion()
        }
    }

    // set answer
    handleRadio = (e) => {
        this.setState({ lastAnswer: e.target.value, isNextDisabled: false })
    }

    render() {

        // if question not arrived
        if (this.state.questionObject === null) {
            return (<p>Loading...</p>)
        } else {

            return (
                <Row>
                    <Col md={8}>
                        <div>
                            <h3>{this.state.questionObject.question}</h3>
                            {this.state.questionObject.options.map((option, index) => {
                                const isChecked = (this.state.lastAnswer == option);
                                return <InputGroup key={index}>
                                    <InputGroup.Prepend>
                                        <InputGroup.Radio name="group1" value={option} onClick={this.handleRadio} checked={isChecked} />
                                        <span>{option}</span>
                                    </InputGroup.Prepend>
                                </InputGroup>
                            })}
                            <Button disabled={this.state.isNextDisabled} as="input" type="button" value="Next" onClick={this.handleNextQuestion} />
                        </div>
                    </Col>
                    <Col md={4}>
                        <div>
                            <ListGroup className="mb-2">
                                <ListGroup.Item>Welcome <strong>{this.state.user}</strong></ListGroup.Item>
                            </ListGroup>

                            <ListGroup className="mb-2">
                                <ListGroup.Item variant="primary"> <strong>Current Question</strong> </ListGroup.Item>
                                <ListGroup.Item> Point : <strong>{this.state.questionPoint}</strong> </ListGroup.Item>
                                <ListGroup.Item>Difficulty : <strong>{this.state.questionObject.difficulty}</strong></ListGroup.Item>
                            </ListGroup>

                            <ListGroup className="mb-2">
                                <ListGroup.Item variant="primary"> <strong>Stats</strong> </ListGroup.Item>
                                <ListGroup.Item >Answered : <strong>{this.state.questionsAnswered}</strong></ListGroup.Item>
                                <ListGroup.Item >Total Score : <strong>{this.state.totalScore}</strong></ListGroup.Item>
                            </ListGroup>
                            <ListGroup>
                                <ListGroup.Item variant="success">Highest Score : <strong>{this.state.highestScore}</strong></ListGroup.Item>
                            </ListGroup>
                        </div>
                    </Col>
                </Row>

            )
        }

    }

}

export default Quiz;