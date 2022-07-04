import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import Config from './pages/Config';
// import logo from './trivia.png';

export default function App() {
  return (
    <div className="bg-purple-800 h-screen">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/game" component={ Game } />
        <Route exact path="/feedback" component={ Feedback } />
        <Route exact path="/ranking" component={ Ranking } />
        <Route exact path="/config" component={ Config } />
      </Switch>
    </div>
  );
}
