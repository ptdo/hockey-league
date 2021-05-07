import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import TeamManagement from "./screens/TeamManagement";
import GameManagement from "./screens/GameManagement";
import HomeScreen from "./screens/HomeScreen";
import SeasonManagement from "./screens/SeasonManagement";
import ScoreSheet from "./screens/ScoreSheet";
import TeamInfo from "./screens/TeamInfo";
import LeagueLeaders from "./screens/LeagueLeaders";
import GameResults from "./screens/GameResults";

function App() {
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [winningTeamScore, setWinningTeamScore] = useState("");
  const [losingTeamScore, setLosingTeamScore] = useState("");
  const [gameId, setGameId] = useState(0);

  const setTeams = (team1, team2) => {
    setTeam1(team1);
    setTeam2(team2);
  };

  const setScores = (team1Score, team2Score) => {
    setWinningTeamScore(team1Score);
    setLosingTeamScore(team2Score);
  };

  const setId = (id) => {
    setGameId(id);
  };

  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/team" component={TeamManagement} />
          <Route
            path="/game"
            render={() => (
              <GameManagement
                setTeams={setTeams}
                setScores={setScores}
                setId={setId}
              />
            )}
          />
          <Route path="/season" component={SeasonManagement} />
          <Route
            path="/scoresheet"
            render={() => (
              <ScoreSheet
                team1={team1}
                team2={team2}
                winningTeamScore={winningTeamScore}
                losingTeamScore={losingTeamScore}
                gameId={gameId}
              />
            )}
          />
          <Route exact path="/team-info" component={TeamInfo} />
          <Route exact path="/league-leaders" component={LeagueLeaders} />
          <Route exact path="/game-results" component={GameResults} />
        </Container>
      </main>
    </Router>
  );
}

export default App;
