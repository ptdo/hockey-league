import React, { useState, useEffect } from "react";
import { Button, Table, Form, Row, Col } from "react-bootstrap";
import axios from "axios";

const ScoreSheet = ({
  team1,
  team2,
  winningTeamScore,
  losingTeamScore,
  gameId,
}) => {
  const [players, setPlayers] = useState([]);
  const [goalies, setGoalies] = useState([]);
  const [goals, setGoals] = useState([]);
  const [assists, setAssists] = useState([]);
  const [winningGoalie, setWinningGoalie] = useState("");
  const [losingGoalie, setLosingGoalie] = useState("");

  useEffect(() => {
    setTimeout(() => {
      axios.get("http://localhost:3001/select/skater").then((res) => {
        setPlayers(res.data);
      });
      axios.get("http://localhost:3001/select/goalie").then((res) => {
        setGoalies(res.data);
      });
    }, 1000);
  }, []);

  const submitStats = () => {
    let playerIds = players
      .filter((p) => p.teamName == team1 || p.teamName == team2)
      .map((p) => p.id);
    
    for (let i = 0; i < goals.length; i++) {
      axios.post("http://localhost:3001/insert/skater/stats", {
        game: gameId,
        id: playerIds[i],
        goal: goals[i],
        assist: assists[i],
      });
    }

    let winningGoalieId;
    let losingGoalieId;
    for (let i = 0; i < goalies.length; i++) {
      if (goalies[i].firstName == winningGoalie) {
        winningGoalieId = goalies[i].id;
      }
      if (goalies[i].firstName == losingGoalie) {
        losingGoalieId = goalies[i].id;
      }
    }
    
    axios.post("http://localhost:3001/insert/goalie/win", {
      game: gameId,
      id: winningGoalieId,
    });

    axios.post("http://localhost:3001/insert/goalie/lose", {
      game: gameId,
      id: losingGoalieId,
    });
  };

  return (
    <>
      <h2 style={{margin:'20px'}}>Score Sheet</h2>
      <div style={{margin:'20px'}}>
        <b>Team:</b> {team1} <b>Score:</b> {winningTeamScore}
      </div>
      <Row style={{margin:'30px'}}>
        <Col md='8'>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Skater</th>
                <th>Goals</th>
                <th>Assists</th>
              </tr>
            </thead>
            <tbody>
              {
                players
                  .filter((p) => p.teamName == team1)
                  .map((p) => (
                    <tr>
                      <td>{p.uniformNumber}{' '}{p.firstName}{' '}{p.lastName}</td>
                      <td>
                        <input
                          placeholder="Enter Goals"
                          type="text"
                          onChange={(e) => setGoals((g) => [...g, e.target.value])}
                        />
                      </td>
                      <td>
                        <input
                          placeholder="Enter Assists"
                          type="text"
                          onChange={(e) => setAssists((a) => [...a, e.target.value])}
                        />
                      </td>
                    </tr>
                  ))
              }
            </tbody>
          </Table>
        </Col>
        
        <Col md='4'>
          <div>
            <Form.Control
              as="select"
              className="my-1 mr-sm-2"
              onChange={(e) => setWinningGoalie(e.target.value)}
            >
              <option>Select Goalie</option>
              {
                goalies
                  .filter((g) => g.teamName == team1)
                  .map((g) => (
                  <option>{g.firstName}{' '}{g.lastName}</option>))
              }
            </Form.Control>
          </div>
        </Col>
      </Row>
      
      <div style={{margin:'20px'}}>
        <b>Team:</b> {team2} <b>Score:</b> {losingTeamScore}
      </div>
      <Row style={{margin:'30px'}}>
        <Col md='8'>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Skater</th>
                <th>Goals</th>
                <th>Assists</th>
              </tr>
            </thead>
            <tbody>
              {players
                .filter((p) => p.teamName == team2)
                .map((p) => (
                  <tr>
                    <td>{p.uniformNumber}{' '}{p.firstName}{' '}{p.lastName}</td>
                    <td>
                      <input
                        placeholder="Enter Goals"
                        type="text"
                        onChange={(e) => setGoals((g) => [...g, e.target.value])}
                      />
                    </td>
                    <td>
                      <input
                        placeholder="Enter Assists"
                        type="text"
                        onChange={(e) => setAssists((a) => [...a, e.target.value])}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
          
        <Col md='4'>
          <div>
            <Form.Control
              as="select"
              className="my-1 mr-sm-2"
              onChange={(e) => setLosingGoalie(e.target.value)}
            >
              <option>Select Goalie</option>
              { 
                goalies
                  .filter((g) => g.teamName == team2)
                  .map((g) => (
                    <option>{g.firstName}{' '}{g.lastName}</option>))
              }
            </Form.Control>
          </div>
        </Col>
      </Row>
      
      <Button
        style={{margin:'45%'}} 
        variant="success" 
        className="my-1 mr-sm-2" 
        onClick={submitStats}
      >
        Submit
      </Button>

    </>
  );
};

export default ScoreSheet;
