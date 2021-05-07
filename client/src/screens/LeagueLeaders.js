import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Badge from  'react-bootstrap/Badge';

const LeagueLeaders = () => {
    const [topGoalie, setTopGoalie] = useState([]);
    const [undefeatedGoalie, setUndefeatedGoalie] = useState([]);
    const [mostScore, setMostScore] = useState([]);
    const [alltimeGoalie, setAlltimeGoalie] = useState([]);

    useEffect(() => {
        setTimeout(()  => {
            axios.get('http://localhost:3001/select/goalie/top').then(res => {
                setTopGoalie(res.data)})

            axios.get('http://localhost:3001/select/goalie/undefeated').then(res => {
                setUndefeatedGoalie(res.data)})

            axios.get('http://localhost:3001/select/scorer').then(res => {
                setMostScore(res.data)})

            axios.get('http://localhost:3001/select/goalie/alltime').then(res => {
                setAlltimeGoalie(res.data)})
        }, 1000)
    }, [])

    return(
        <div>
            <h1 style={{textAlign:'center', margin:'5%'}}><Badge variant="dark">LEAGUE LEADERS</Badge></h1>
            <div>
            <div style={{margin: '8%'}}>
                <h3  style={{textAlign:'center'}}>Top 5 All Time Goal Scorers</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Goals</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Number</th>
                            <th>Team</th>
                        </tr>
                    </thead>
                        <tbody>
                            {
                                topGoalie.map(d => 
                                    <tr>
                                        <td>{d.goals}</td>
                                        <td>{d.firstName}</td>
                                        <td>{d.lastName}</td>
                                        <td>{d.uniformNumber}</td>
                                        <td>{d.teamName}</td >
                                    </tr>)
                            }
                        </tbody>
                </Table>
            </div>
            
            <div style={{margin: '8%'}}>
                <h3 style={{textAlign:'center'}}>Most Goals Scored In A Single Game</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Goals</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Number</th>
                            <th>Team</th>
                            <th>Game</th>
                        </tr>
                    </thead>
                        <tbody>
                            {
                                mostScore.map(s =>
                                    <tr>
                                        <td>{s.goals}</td>
                                        <td>{s.firstName}</td>
                                        <td>{s.lastName}</td>
                                        <td>{s.uniformNumber}</td>
                                        <td>{s.teamName}</td>
                                        <td>{s.gameNumber}</td>
                                    </tr>)
                            }
                        </tbody>
                </Table>
            </div>

            <div style={{margin: '8%'}}>
                <h3 style={{textAlign:'center'}}>Top 5 All Time Goalie Wins</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Wins</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Number</th>
                            <th>Team</th>
                        </tr>
                    </thead>
                        <tbody>
                            {
                                alltimeGoalie.map(g => 
                                    <tr>
                                        <td>{g.wins}</td>
                                        <td>{g.firstName}</td>
                                        <td>{g.lastName}</td>
                                        <td>{g.uniformNumber}</td>
                                        <td>{g.teamName}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                </Table>
            </div>

            <div style={{margin: '8%'}}>
                <h3 style={{textAlign:'center'}}>Undefeated Goalies</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Number</th>
                            <th>Team</th>
                        </tr>
                    </thead>
                        <tbody>
                            {
                                undefeatedGoalie.map(g => 
                                    <tr>
                                        <td>{g.firstName}</td>
                                        <td>{g.lastName}</td>
                                        <td>{g.uniformNumber}</td>
                                        <td>{g.teamName}</td>
                                    </tr>)
                            }
                        </tbody>
                </Table>
            </div>
        </div>
    </div>
    );
};

export default LeagueLeaders;