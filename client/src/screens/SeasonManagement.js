import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Col, Row, Button, Form } from "react-bootstrap";

const SeasonManagement = () => {
  const [updateYear, setUpdateYear] = useState(0);
  const [deleteYear, setDeleteYear] = useState(0);
  const [addedYear, setAddedYear] =  useState(0);
  const [season, setSeason] = useState([]);
  const [team, setTeam] =  useState([]);
  const [champion, setChampion] = useState('');
  const [runnerUp, setRunnerUp] = useState('');
  const [teamName, setTeamName] = useState('');
  const [primaryColor, setPrimaryColor] = useState('');
  const [secondaryColor, setSecondaryColor] = useState('');
  const [deletedTeam, setDeletedTeam] = useState('');

  useEffect(() => {
    setTimeout(()  => {
        axios.get('http://localhost:3001/select/season').then(res => {
            setSeason(res.data)})
            
        axios.get('http://localhost:3001/select/team').then(res => {
            setTeam(res.data)})
    }, 1000)
  }, [season])

  const updateSeason = () => {
      axios.post('http://localhost:3001/update/season', {
        season:  updateYear,
        champion: champion,
        finalist: runnerUp
      }).then(() => alert("Season Updated"))
  }

  const deleteSeason = () => {
    axios.post('http://localhost:3001/delete/season', {
        season:  deleteYear,
      }).then(() => alert("Season Deleted"))
  }

  const addSeason = () => {
    if (season.find(s => s.year == addedYear) != null) {
      alert(`Season ${addedYear} Exists`)
    }
    else {
      axios.post('http://localhost:3001/insert/season', {
        season:  addedYear,
        champion: null,
        finalist: null
      }).then(() => alert("New Season Added"))
    }
  }

  const addTeam = () => {
    axios.post('http://localhost:3001/insert/team', {
        name:  teamName,
        primaryColor: primaryColor,
        secondaryColor: secondaryColor
      }).then(() => alert("New Team Added"))
  }

  const updateTeam = () => {
    axios.post('http://localhost:3001/update/team', {
        name:  setTeamName,
        primaryColor: primaryColor,
        secondaryColor: secondaryColor
      }).then(() => alert("Edited Successfully"))
  }

  const deleteTeam = () => {
    axios.post('http://localhost:3001/delete/team', {
        name:  deletedTeam
      }).then(() => alert("Deleted Successfully"))
  }

  return (
    <>
      <h2 style={{margin:'10px'}}>Season Management</h2>
      <Row  style={{margin: '10%'}}>
        <Col md="4">
          <div style={{margin:'20px 10px 10px 10px'}}><h4>Create New Season</h4></div>
          <Form>
            <Form.Group>
              <Form.Control type="number" placeholder="Enter Year" onChange={e => setAddedYear(e.target.value)}/>
            </Form.Group>
          </Form>
          <Button style={{alignItem:'center'}}  variant="success" onClick={addSeason}>Create</Button>
        </Col>
        <Col md="4">
          <div style={{margin:'20px 10px 10px 10px'}}><h4>Update Season</h4></div>
          <div>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Control as="select" onClick={e => setUpdateYear(e.target.value)}>
                <option disabled selected hidden>Select Season</option>
                {
                    season.map(s => <option>{s.year}</option>)
                }
              </Form.Control>
            </Form.Group>
          </div>
          <div>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Control as="select" onClick={e => setChampion(e.target.value)}>
                <option disabled selected hidden>Select Champion</option>
                {
                  team.map(t => <option>{t.name}</option>)
                }
              </Form.Control>
            </Form.Group>
          </div>
          <div>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Control as="select" onClick={e => setRunnerUp(e.target.value)}>
                <option disabled selected hidden>Select Runner Up</option>
                {
                  team.filter(t  => t.name !== champion)
                    .map(t => <option>{t.name}</option>)
                }
              </Form.Control>
            </Form.Group>
          </div>
          <Button variant="primary" onClick={updateSeason}>Update</Button>
        </Col>
        <Col md="4">
        <div style={{margin:'20px 10px 10px 10px'}}><h4>Delete Season</h4></div>
          <div>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Control as="select" onClick={e => setDeleteYear(e.target.value)}>
                <option disabled selected hidden>Select Year</option>
                {
                  season.map(s => <option>{s.year}</option>)
                }
              </Form.Control>
            </Form.Group>
          </div>
          <Button variant="danger" onClick={deleteSeason}>Delete</Button></Col>
      </Row>
      <Row style={{margin: '10%'}}>
      <Col md='4'>
        <div style={{margin:'10px'}}><h4>Add Team</h4></div>
          <Form>
            <Form.Group>
              <Form.Control type="text" placeholder="Team Name" onChange={e => setTeamName(e.target.value)}/>
            </Form.Group>

            <Form.Group>
              <Form.Control type="text" placeholder="Primary Color" onChange={e => setPrimaryColor(e.target.value)}/>
            </Form.Group>

            <Form.Group>
              <Form.Control type="text" placeholder="Secondary Color" onChange={e => setSecondaryColor(e.target.value)}/>
            </Form.Group>
          </Form>
          <Button variant="success" onClick={addTeam}>Add</Button>
        </Col>
        <Col md='4'>
        <div style={{margin:'10px'}}><h4>Edit Team</h4></div>
        <Form>
            <Form.Group>
              <Form.Control type="text" placeholder="Team Name" onChange={e => setTeamName(e.target.value)}/>
            </Form.Group>

            <Form.Group>
              <Form.Control type="text" placeholder="Primary Color" onChange={e => setPrimaryColor(e.target.value)}/>
            </Form.Group>

            <Form.Group>
              <Form.Control type="text" placeholder="Secondary Color" onChange={e => setSecondaryColor(e.target.value)}/>
            </Form.Group>

          </Form>
          <Button variant="primary" onClick={updateTeam}>Edit</Button>
        </Col>
        <Col md="4">
          <div style={{margin:'10px'}}><h4>Delete</h4></div>
          <div>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Control as="select" onClick={e => setDeletedTeam(e.target.value)}>
                <option disabled selected hidden>Select Team</option>
                {
                  team.map(t => <option>{t.name}</option>)
                }
              </Form.Control>
            </Form.Group>
          </div>
          <Button variant="danger" onClick={deleteTeam}>Delete</Button>
        </Col>
      </Row>
    </>
  );
};

export default SeasonManagement;
