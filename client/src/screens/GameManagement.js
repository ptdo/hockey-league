import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Row, Col, Form, Button } from "react-bootstrap";

const GameManagement = ({ setTeams, setScores, setId }) => {
  const [team, setTeam] = useState([]);
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [arenaData, setArenaData] = useState([]);
  const [game, setGame] = useState([]);
  const [gameId, setGameId] = useState(0);
  const [arenaName, setArenaName] = useState("");
  const [date, setDate] = useState(Date);
  const [time, setTime] = useState(0);
  const [isPlayoff, setIsPlayoff] = useState(0);
  const [winTeam, setWinTeam] = useState("");
  const [winTeamScore, setWinTeamScore] = useState(0);
  const [loseTeam, setLoseTeam] = useState("");
  const [loseTeamScore, setLoseTeamScore] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      axios.get("http://localhost:3001/select/team").then((res) => {
        setTeam(res.data);
      });

      axios.get("http://localhost:3001/select/arena").then((res) => {
        setArenaData(res.data);
      });

      axios.get("http://localhost:3001/select/game").then((res) => {
        setGame(res.data);
      });
    }, 1000);
  }, []);

  const setAppTeams = () => {
    setTeams(winTeam, loseTeam);
    setScores(winTeamScore, loseTeamScore);
    setId(gameId);

    if (winTeamScore > loseTeamScore) {
      axios.post("http://localhost:3001/update/game", {
        winTeam: winTeam,
        winTeamScore: winTeamScore,
        loseTeam: loseTeam,
        loseTeamScore: loseTeamScore,
        gameNumber: gameId,
      });
    }
    else {
      alert('Update Failed. Winning team score must be greater than losing team score');
    }
  };

  const scheduleGame = () => {
    
    var d = new Date();

    axios
      .post("http://localhost:3001/insert/game", {
        arenaName: arenaName,
        date: date,
        time: time,
        isPlayoff: isPlayoff,
        year: d.getFullYear(),
        winTeam: team1,
        winTeamScore: null,
        loseTeam: team2,
        loseTeamScore: null,
      })
      .then((res) =>
        alert(`Game successfuly scheduled. Your game Id is ${res.data.insertId}`)
      );
  };
  
  return (
    <>
      <h2 style={{ margin: "10px" }}>Game Management</h2>
      <Row>
        <Col md="6">
          <h4 style={{ margin: "20px 10px  10px 10px" }}>Game Scheduler</h4>
          <Form>
            <Form.Group>
              <Form.Control
                as="select"
                onChange={(e) => setArenaName(e.target.value)}
              >
                <option disabled selected hidden>
                  Select Arena
                </option>
                {arenaData.map((a) => (
                  <option>{a.name}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="date"
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>
          </Form>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Control as="select" onChange={(e) => setTime(e.target.value)}>
              <option>Time</option>
              <option>09:00</option>
              <option>12:00</option>
              <option>15:00</option>
              <option>18:00</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Control
              as="select"
              onChange={(e) => {
                setTeam1(e.target.value);
              }}
            >
              <option disabled selected hidden>
                Team 1
              </option>
              {team.map((t) => (
                <option>{t.name}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Control
              as="select"
              onChange={(e) => setTeam2(e.target.value)}
            >
              <option disabled selected hidden>
                Team 2
              </option>
              {team
                .filter((t) => t.name !== team1)
                .map((t) => (
                  <option>{t.name}</option>
                ))}
            </Form.Control>
          </Form.Group>
          <div>
            <input
              type="checkbox"
              id="game"
              name="game"
              style={{ margin: "5px" }}
            />
            <label for="game" onClick={() => setIsPlayoff(1)}>
              Playoff game
            </label>
          </div>
          <Button
            variant="success"
            style={{ margin: "10px" }}
            onClick={scheduleGame}
          >
            Schedule Game
          </Button>
        </Col>
        <Col md="6">
          <h4 style={{ margin: "20px 10px 10px 10px" }}>Record Game Score</h4>
          <div>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Control
                as="select"
                onChange={(e) => {
                  setGameId(e.target.value);
                }}
              >
                <option disabled selected hidden>
                  Game ID
                </option>
                {game.map((g) => (
                  <option>{g.gameNumber}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </div>
          <div>
            <Form inline controlId="exampleForm.ControlSelect1">
              <Form.Control
                as="select"
                className="my-1 mr-sm-2"
                onChange={(e) => setWinTeam(e.target.value)}
              >
                <option disabled selected hidden>
                  Winning Team
                </option>
                { 
                  game
                    .filter((g) => g.gameNumber == gameId)
                    .map((g) => (
                      <option>{g.winTeam}</option>))
                }
                { 
                  game
                    .filter((g) => g.gameNumber == gameId)
                    .map((g) => (
                      <option>{g.loseTeam}</option>))
                }
              </Form.Control>
              <Form.Control
                as="select"
                className="my-1 mr-sm-2"
                type="numeric"
                onChange={(e) => setWinTeamScore(e.target.value)}
              >
                <option disabled selected hidden>
                  Goals Scored
                </option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
              </Form.Control>
            </Form>
          </div>
          <div>
            <Form inline controlId="exampleForm.ControlSelect1">
              <Form.Control
                as="select"
                className="my-1 mr-sm-2"
                onChange={(e) => setLoseTeam(e.target.value)}
              >
                <option disabled selected hidden>
                  Losing Team
                </option>
                {
                  game
                    .filter((g) => g.gameNumber == gameId)
                    .map((g) => (
                        (g.winTeam === winTeam) ? <option>{g.loseTeam}</option> 
                          :  <option>{g.winTeam}</option>
                    ))
                }
              </Form.Control>
              <Form.Control
                as="select"
                className="my-1 mr-sm-2"
                onChange={(e) => setLoseTeamScore(e.target.value)}
              >
                <option disabled selected hidden>
                  Goals Scored
                </option>
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
              </Form.Control>
            </Form>
          </div>
          <Link to="/scoresheet">
            <Button
              variant="success"
              style={{ marginTop: "10px" }}
              onClick={setAppTeams}
            >
              Update Game Record
            </Button>
          </Link>
        </Col>
      </Row>
    </>
  );
};

export default GameManagement;
