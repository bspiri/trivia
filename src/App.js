import React from 'react';
import Container from "react-bootstrap/Container";
import Home from "./Components/Home";
import Quiz from "./Components/Quiz";
import Category from "./Components/Category";
import User from "./Components/User";
import Result from "./Components/Result";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

/*

  Home Page : Welcome  start the game let the fun begin
  User page: username +...  Game start button
  Category page: Choose category cards
Quiz page: receive questions and display username & score & nr of Qs and wrongs, qustion point, highest score
Result page: Score last 10 scores If pass max score display new record modal
*/

function App() {
  return (
    <Router>
      <Container >
        <Switch>
          <Route path="/category" exact component={Category} />
          <Route path="/user" exact component={User} />
          <Route path="/result" exact component={Result} />
          <Route path="/quiz/:categoryId" exact component={Quiz} />
          <Route path="/" exact component={Home} />
        </Switch>
      </Container>
    </Router>

  );
}

export default App;
