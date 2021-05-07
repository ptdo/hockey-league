import React from "react";
import { Button } from "react-bootstrap";

const HomeScreen = () => {
  
  return (
    <>
      <div style={{ margin: "10px" }}></div>
      <div style={{ margin: "0% 10px 10px 10px" }}>
        <Button
          style={{ margin: "20px" }}
          variant="secondary"
          href="/season"
          block
        >
          Season Management
        </Button>
        <Button
          style={{ margin: "20px" }}
          variant="secondary"
          href="/game"
          block
        >
          Game Management
        </Button>
        <Button
          style={{ margin: "20px" }}
          variant="secondary"
          href="/team"
          block
        >
          Team Management
        </Button>
        <Button
          style={{ margin: "20px" }}
          variant="secondary"
          href="/team-info"
          block
        >
          Team Information
        </Button>
        <Button
          style={{ margin: "20px" }}
          variant="secondary"
          href="/league-leaders"
          block
        >
          View League Leaders
        </Button>
        <Button
          style={{ margin: "20px" }}
          variant="secondary"
          href="/game-results"
          block
        >
          View Game Results
        </Button>
      </div>
    </>
  );
};
export default HomeScreen;
