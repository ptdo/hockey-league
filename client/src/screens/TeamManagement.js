import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";

const TeamManagement = () => {
  const [teamData, setTeamData] = useState([]);
  const [teamSelect, setTeamSelect] = useState('');
  const [player, setPlayer]  = useState([]);
  const [playerDelete, setPlayerDelete] = useState([]);
  const [fName, setFName]  = useState('');
  const [lName, setLName]  = useState('');
  const [position, setPosition] = useState('');
  const [playerPhone, setPlayerPhone]  = useState(0);
  const [playerEmail, setPlayerEmail]  = useState('');
  const [uniformNumber, setUniformNumber] = useState('');
  const [dob, setDob] = useState(Date);
  const [staff, setStaff] = useState([]);
  const [staffDelete, setStaffDelete] = useState('');
  const [staffName, setStaffName] = useState('');
  const [staffEmail, setStaffEmail] = useState('');
  const [staffPhone, setStaffPhone] = useState(0);
  const [role, setRole]  = useState('');

  useEffect(() => {
    setTimeout(()  => {
        axios.get('http://localhost:3001/select/team').then(res => {
            setTeamData(res.data)})

        axios.get('http://localhost:3001/select/staff').then(res => {
            setStaff(res.data)})

        axios.get('http://localhost:3001/select/player').then(res => {
            setPlayer(res.data)})
    }, 1000)
  }, [staff])

  function checkEmail (email) {
    var validEmail = new RegExp(/^([A-Za-z0-9])+@+([a-z])+(\b\.com\b)$/);
    return validEmail.test(email);
  }

  const addPlayer  = () => {
    if (checkEmail(playerEmail)) {
      axios.post('http://localhost:3001/insert/player', {
        teamName: teamSelect, 
        uniformNumber: uniformNumber, 
        dateOfBirth: dob, 
        firstName:  fName, 
        lastName: lName, 
        phone: playerPhone, 
        email: playerEmail
      }).then((res)  => {
        alert('New Player Added');

        if (position === 'G') {
          axios.post('http://localhost:3001/insert/goalie', {
            id: res.data.insertId
          }).then(() => alert('New Goalie Added'))
        }
        else {
          axios.post('http://localhost:3001/insert/skater', {
            id: res.data.insertId,
            position: position
          }).then(() => alert('New Skater Added'))
        }
      })
    }
    else {
      alert('Invalid email');
    }
  }

  const addStaff = () =>  {
    if (checkEmail(staffEmail)) {
      axios.post('http://localhost:3001/insert/staff', {
          team:  teamSelect,
          name: staffName,
          role:  role,
          phone: staffPhone,
          email: staffEmail
      }).then(()  => alert('New Staff Added'))
    }
    else {
      alert('Invalid email');
    }
      
  }

  const removeStaff = () =>  {
     axios.post('http://localhost:3001/delete/staff', {
        team:  teamSelect,
        name: staffDelete,
    }).then(()  => alert('Staff Deleted'));
  }

  const removePlayer = () => {
    var info = playerDelete.split(' ');

    axios.post('http://localhost:3001/select/player/id', {
          teamName:  teamSelect,
          uniformNumber: info[0],
          firstName: info[1],
          lastName: info[2]
      }).then(res => {
          axios.post('http://localhost:3001/delete/player', {
            id: res.data[0].id
         }).then(()  => alert('Player Deleted'))
      })
  }

  return (
    <>
      <div style={{width:"70%", margin:'20px', display:'flex'}}>
      <h2>Team Management</h2>
        <Form.Group controlId="exampleForm.ControlSelect1" style={{margin: '0 0 0 20px'}}>
          <Form.Control as="select"  onClick={e => setTeamSelect(e.target.value)}>
            <option disabled selected hidden>Select Team</option>
            {
              teamData.map(t => <option>{t.name}</option>)
            }
          </Form.Control>
        </Form.Group>
      </div>

      <Row style={{margin:'10%'}}>
        <Col md="6">
          <div style={{margin:'10px'}}><h4>Add Player</h4></div>
          <div >
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Control type="text" placeholder="Uniform Number (1-99)" onChange={e => setUniformNumber(e.target.value)} />
            </Form.Group>
          </div>
          <Form>
            <Form.Group>
              <Form.Control as='select' onClick={e => setPosition(e.target.value)}>
                <option disabled selected hidden>Position</option>
                <option>G</option>
                <option>C</option>
                <option>RW</option>
                <option>LW</option>
                <option>D</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Control type="text" placeholder="First Name" onChange={e => setFName(e.target.value)}/>
            </Form.Group>

            <Form.Group>
              <Form.Control type="text" placeholder="Last Name" onChange={e => setLName(e.target.value)}/>
            </Form.Group>

            <Form.Group>
              <Form.Control type="date" onChange={e => setDob(e.target.value)}/>
            </Form.Group>

            <Form.Group>
              <Form.Control type="text" placeholder="Phone Number" onChange={e => setPlayerPhone(e.target.value)}/>
            </Form.Group>

            <Form.Group>
              <Form.Control type="text" placeholder="Email Address" onChange={e => setPlayerEmail(e.target.value)}/>
            </Form.Group>


          </Form>
          <Button variant="success" onClick={addPlayer}>Add Player</Button>
        </Col>
        <Col md="5">
        <div style={{margin:'20px 10px 10px 10px'}}><h4>Remove Player</h4></div>
          <div>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Control as="select" onChange={e => setPlayerDelete(e.target.value)}>
                <option disabled selected hidden>Select Player</option>
                {
                  player.filter(p  => p.teamName  === teamSelect).map(p  =>
                    <option>{p.uniformNumber}{'\t'}{p.firstName}{' '}{p.lastName}</option>)
                }
              </Form.Control>
            </Form.Group>
          </div>
          <Button variant="danger" onClick={removePlayer}>Remove</Button>
        </Col>
      </Row>
      
      <Row style={{margin:'10%'}}>
      <Col md="6">
          <div style={{margin:'10px'}}><h4>Add Staff</h4></div>
          <Form>
            <Form.Group>
              <Form.Control type="text" placeholder="Full Name" onChange={e => setStaffName(e.target.value)}/>
            </Form.Group>

            <Form.Group>
              <Form.Control type="text" placeholder="Role" onChange={e => setRole(e.target.value)}/>
            </Form.Group>

            <Form.Group>
              <Form.Control type="text" placeholder="Phone Number" onChange={e => setStaffPhone(e.target.value)}/>
            </Form.Group>

            <Form.Group>
              <Form.Control type="text" placeholder="Email" onChange={e => setStaffEmail(e.target.value)}/>
            </Form.Group>
          </Form>
          <Button variant="success" onClick={addStaff}>Add Staff</Button>
        </Col>

        <Col md="5">
        <div style={{margin:'10px'}}><h4>Remove Staff</h4></div>
          <div>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Control as="select" onClick={e => setStaffDelete(e.target.value)}>
                <option disabled selected hidden>Select Staff</option>
                {
                  staff.filter(s  => s.teamName  === teamSelect).map(s  =>
                    <option>{s.name}</option>)
                }
              </Form.Control>
            </Form.Group>
          </div>
          <Button variant="danger" onClick={removeStaff}>Remove</Button></Col>
      </Row>
    </>
  );
};

export default TeamManagement;
