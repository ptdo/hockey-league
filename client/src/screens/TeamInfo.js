import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Moment from 'moment';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table'

const TeamInfo = () => {
    const [team, setTeam] = useState('');
    const [teamData, setTeamData] = useState([]);
    const [skater, setSkater] = useState([]);
    const [staff, setStaff] = useState([]);
    const [goalie, setGoalie] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            axios.get('http://localhost:3001/select/team').then(res => {
                setTeamData(res.data)})

            axios.get('http://localhost:3001/select/skater').then(res => {
                  setSkater(res.data)})

            axios.get('http://localhost:3001/select/goalie').then(res => {
                setGoalie(res.data)})

            axios.get('http://localhost:3001/select/staff').then(res => {
                setStaff(res.data)})
        }, 1000)
    }, [])

    return(
    <div>
        <div style={{margin: '5%', width: '50%', height:'auto', display: 'flex'}} >
            <h2 style={{width: '70%'}}>Team Information</h2>
            <Form.Control as='select' style={{margin: '5px', width: '30%'}} placeholder='Select Team' onChange={e => setTeam(e.target.value)}>
                <option disabled selected hidden>Select Team</option>
                {
                    teamData.map(d => <option key={d.name}>{d.name}</option>)
                }
            </Form.Control>
        </div>
        
        <div> 
            <div style={{margin: '10px'}}>
                <h3>Skaters</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Number</th>
                            <th>DOB</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Position</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            skater.filter(s => s.teamName === team).map(s => 
                                <tr key={s.id}>
                                    <td>{s.firstName}</td>
                                    <td>{s.lastName}</td>
                                    <td>{s.uniformNumber}</td>
                                    <td>{Moment(s.dateOfBirth).format('MM-DD-YYYY')}</td>
                                    <td>{s.phone}</td>
                                    <td>{s.email}</td>
                                    <td>{s.position}</td>
                                </tr>
                                )
                            }
                    </tbody>
                </Table>
            </div>
            
            <div style={{margin: '10px'}}>
                <h3>Goalies</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Number</th>
                            <th>DOB</th>
                            <th>Phone</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                        <tbody>
                        {
                            goalie.filter(g => g.teamName === team).map(g => 
                                <tr key={g.id}>
                                    <td>{g.firstName}</td>
                                    <td>{g.lastName}</td>
                                    <td>{g.uniformNumber}</td>
                                    <td>{Moment(g.dateOfBirth).format('MM-DD-YYYY')}</td>
                                    <td>{g.phone}</td>
                                    <td>{g.email}</td>
                                </tr>
                                )
                            }
                        </tbody>
                </Table>
            </div>

            <div style={{margin:'10px'}}>
                <h3>Staff</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Phone</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                        <tbody>
                            {
                                staff.filter(s => s.teamName === team).map(s =>
                                    <tr>
                                        <td>{s.name}</td>
                                        <td>{s.role}</td>
                                        <td>{s.phone}</td>
                                        <td>{s.email}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                </Table>
            </div>
        </div>
    </div>
    );
}

export default TeamInfo;