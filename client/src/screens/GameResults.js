import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Form } from 'react-bootstrap';

const GameResults = () => {
    const [year, setYear] = useState(0);
    const [season, setSeason] = useState([]);
    const [game, setGame] = useState([]);

    useEffect(() => {
        setTimeout(()  => {
            axios.get('http://localhost:3001/select/season').then(res => {
                setSeason(res.data)})

            axios.get('http://localhost:3001/select/game').then(res => {
                setGame(res.data)})
        }, 1000)
    }, [])

    return (
        <div>
            <div style={{margin: '6%', textAlign:'center', display: 'flex'}}>
                <h3>Game Result</h3>
                <Form.Control as="select" style={{ width: 'auto', margin:'0.25% 0 0 2%'}}  onClick={e => setYear(e.target.value)}>
                    <option disabled selected hidden>Select Season</option>
                    {
                        season.map(s => <option key={s.year}>{s.year}</option>)
                    }
                </Form.Control>
            </div>
            <div style={{margin:'10px'}}>
                <Table >
                    <thead>
                        <tr>
                            <th>Game Number</th>
                            <th>Winning Team</th>
                            <th>Score</th>
                            <th>Losing Team</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                        <tbody>
                            {
                                game.filter(g => g.year == year).map(g =>
                                    <tr>
                                        <td>{g.gameNumber}</td>
                                        <td>{g.winTeam}</td>
                                        <td>{g.winTeamScore}</td>
                                        <td>{g.loseTeam}</td>
                                        <td>{g.loseTeamScore}</td>
                                    </tr>)
                            }
                        </tbody>
                </Table>
            </div>
        </div>
    );
}

export default GameResults;