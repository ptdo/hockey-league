import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  port: "3306",
  password: "",
  database: "HockeyLeague",
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/*  -------------- SELECT DATA ------------------ */

//Select Arena
app.get("/select/arena", (req, res) => {
  db.query("SELECT * FROM Arena", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Select Game
app.get("/select/game", (req, res) => {
  db.query("SELECT * FROM Game", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Select Player
app.get("/select/player", (req, res) => {
  db.query("SELECT * FROM Player", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Select Player id
app.post("/select/player/id", (req, res) => {
  const uniformNumber = req.body.uniformNumber;
  const teamName = req.body.teamName;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  db.query(
    "SELECT id FROM Player "
    + "WHERE uniformNumber = ? AND teamName = ? AND firstName = ? AND lastName = ?",
    [uniformNumber, teamName, firstName, lastName],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Select Goalie
app.get("/select/goalie", (req, res) => {
  db.query(
    "SELECT * FROM Player "
    + "WHERE id IN (SELECT id FROM Goalie)",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Select Top 5 Winningest Goalies All time app		-AGGREGATION W/ GROUP BY
app.get("/select/goalie/alltime", (req, res) => {
  db.query(
    "SELECT COUNT(*) as wins, B.firstName, B.lastName, B.uniformNumber, B.teamName "
    + "FROM GoalieStats A, Player B "
    + "WHERE isWin = 1 AND A.id = B.id "
    + "GROUP BY A.id ORDER BY wins DESC LIMIT 5;",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Select Top 5 scorers all time	-INNER JOIN
app.get("/select/goalie/top", (req, res) => {
  db.query(
    "SELECT SUM(A.goal) as goals, B.firstName, B.lastName, B.uniformNumber, B.teamName "
    + "FROM SkaterStats A "
    + "INNER JOIN Player B ON A.id = B.id "
    + "GROUP BY A.id "
    + "ORDER BY goals DESC LIMIT 5 ",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Select Goalie (Undefeated)	-DIVISION
app.get("/select/goalie/undefeated", (req, res) => {
  db.query(
    "SELECT B.firstName, B.lastName, B.uniformNumber, B.teamName "
    + "FROM GoalieStats A, Player B "
    + "WHERE isWin = 1 AND A.id = B.id "
    + "GROUP BY A.id "
    + "HAVING COUNT(*) = (SELECT COUNT(*) FROM GoalieStats B WHERE B.id = A.id) ORDER BY A.id ASC LIMIT 5",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Select Season
app.get("/select/season", (req, res) => {
  db.query("SELECT * FROM Season", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Select Skater with Most Goals in a Game	-AGGREGATION
app.get("/select/scorer", (req, res) => {
  db.query(
    "SELECT A.goal as goals, B.firstName, B.lastName, B.uniformNumber, B.teamName, A.gameNumber "
    + "FROM SkaterStats A "
    + "INNER JOIN Player B ON A.id = B.id "
    + "WHERE A.goal = (SELECT MAX(B.goal) FROM SkaterStats B) "
    + "LIMIT 1",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Select Skater/Player Info	-EQUIJOIN
app.get("/select/skater", (req, res) => {
  db.query(
    "SELECT * FROM Player P, Skater S "
    + "WHERE P.id = S.id",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Select Staff
app.get("/select/staff", (req, res) => {
  db.query("SELECT * FROM Staff", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Select Team
app.get("/select/team", (req, res) => {
  db.query("SELECT * FROM Team", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

/*--------------------  INSERT DATA  ---------------------------*/

// Insert Game
app.post("/insert/game", (req, res) => {
  const insert =
    "INSERT INTO Game (arenaName, date, time, isPlayoff, year, winTeam, winTeamScore, loseTeam, loseTeamScore)" +
    "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  //const gameNumber = req.body.gameNumber;
  const arenaName = req.body.arenaName;
  const date = req.body.date;
  const time = req.body.time;
  const isPlayoff = req.body.isPlayoff;
  const year = req.body.year;
  const winTeam = req.body.winTeam;
  const winTeamScore = req.body.winTeamScore;
  const loseTeam = req.body.loseTeam;
  const loseTeamScore = req.body.loseTeamScore;

  db.query(
    insert,
    [
      //gameNumber,
      arenaName,
      date,
      time,
      isPlayoff,
      year,
      winTeam,
      winTeamScore,
      loseTeam,
      loseTeamScore,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Insert Goalie
app.post("/insert/goalie", (req, res) => {
  const insert = "INSERT INTO Goalie VALUES (?)";
  const id = req.body.id;

  db.query(insert, [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Insert GoalieStats (winning)
app.post("/insert/goalie/win", (req, res) => {
  const insert = "INSERT INTO GoalieStats VALUES (?, ?, 1)";

  const game = req.body.game;
  const id = req.body.id;

  db.query(insert, [game, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Insert GoalieStats (losing)
app.post("/insert/goalie/lose", (req, res) => {
  const insert = "INSERT INTO GoalieStats VALUES (?, ?, 0)";

  const game = req.body.game;
  const id = req.body.id;

  db.query(insert, [game, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Insert Player
app.post("/insert/player", (req, res) => {
  const insert =
    "INSERT INTO Player (teamName, uniformNumber, dateOfBirth, firstName, lastName, phone, email) VALUES (?, ?, ?, ?, ?, ?, ?)";

  const teamName = req.body.teamName;
  const uniformNumber = req.body.uniformNumber;
  const dateOfBirth = req.body.dateOfBirth;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const phone = req.body.phone;
  const email = req.body.email;

  db.query(
    insert,
    [teamName, uniformNumber, dateOfBirth, firstName, lastName, phone, email],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Insert Season
app.post("/insert/season", (req, res) => {
  const insert = "INSERT INTO Season VALUES(?, ?, ?)";
  const champion = req.body.champion;
  const runnerUp = req.body.finalist;
  const year = req.body.season;

  db.query(insert, [year, champion, runnerUp], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Insert Skater
app.post("/insert/skater", (req, res) => {
  const insert = "INSERT INTO Skater VALUES (?, ?)";

  const id = req.body.id;
  const position = req.body.position;

  db.query(insert, [id, position], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Insert Staff
app.post("/insert/staff", (req, res) => {
  const insert = "INSERT INTO Staff VALUES (?, ?, ?, ?, ?)";

  const name = req.body.name;
  const team = req.body.team;
  const role = req.body.role;
  const email = req.body.email;
  const phone = req.body.phone;

  db.query(insert, [name, team, role, email, phone], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Insert SkaterStats
app.post("/insert/skater/stats", (req, res) => {
  const insert = "INSERT INTO SkaterStats VALUES (?, ?, ?, ?)";

  const game = req.body.game;
  const id = req.body.id;
  const goal = req.body.goal;
  const assist = req.body.assist;

  db.query(insert, [game, id, goal, assist], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Insert Team
app.post("/insert/team", (req, res) => {
  const insert = "INSERT INTO Team VALUES (?, ?, ?)";

  const name = req.body.name;
  const pColor = req.body.primaryColor;
  const sColor = req.body.secondaryColor;

  db.query(insert, [name, pColor, sColor], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

/* -------------------- UPDATE DATA ------------------------------ */

// Update Game 		-UPDATE
app.post("/update/game", (req, res) => {
  const update =
    "UPDATE Game "
    + "SET winTeam = ?, loseTeam = ?, winTeamScore = ?, loseTeamScore = ? "
    + "WHERE gameNumber = ?";

  const winTeam = req.body.winTeam;
  const winTeamScore = req.body.winTeamScore;
  const loseTeam = req.body.loseTeam;
  const loseTeamScore = req.body.loseTeamScore;
  const gameNumber = req.body.gameNumber;

  db.query(
    update,
    [winTeam, loseTeam, winTeamScore, loseTeamScore, gameNumber],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Update Season	- UPDATE
app.post("/update/season", (req, res) => {
  const update = "UPDATE Season SET champion = ?, finalist = ? WHERE year = ?";
  const champion = req.body.champion;
  const runnerUp = req.body.finalist;
  const year = req.body.season;

  db.query(update, [champion, runnerUp, year], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Update Team
app.post("/update/team", (req, res) => {
  const update =
    "Update Team SET primaryColor = ?, secondaryColor = ? WHERE name = ?";

  const name = req.body.name;
  const pColor = req.body.primaryColor;
  const sColor = req.body.secondaryColor;

  db.query(update, [pColor, sColor, name], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

/* -------------------- DELETE DATA ------------------------------- */

// Delete Player
app.post("/delete/player", (req, res) => {
  const remove = "DELETE FROM Player WHERE id = ?";

  const id = req.body.id;

  db.query(remove, [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Delete Season	- DELETE W/ CASCADE
app.post("/delete/season", (req, res) => {
  const year = req.body.season;

  db.query("DELETE FROM Season WHERE year = ?", [year], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Delete Staff
app.post("/delete/staff", (req, res) => {
  const remove = "DELETE FROM Staff WHERE teamName = ? AND name = ?;";

  const name = req.body.name;
  const team = req.body.team;

  db.query(remove, [team, name], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Delete Team
app.post("/delete/team", (req, res) => {
  const remove = "DELETE FROM Team WHERE name = ?";

  const name = req.body.name;

  db.query(remove, [name], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("On port 3001");
});
