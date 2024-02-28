import express from "express";
import ViteExpress from "vite-express";
import { Sequelize, Op } from "sequelize";
import { User, To_do, Pin, Note, Trip } from "../models/model.js";
import session from "express-session";

const port = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({ secret: "work plzz", saveUninitialized: true, resave: false })
);

ViteExpress.config({ printViteDevServerHost: true });

function loginRequired(req, res, next) {
  if (!req.session.user_id) {
    res.redirect("/");
    res.status(401).json({ error: "Unauthorized" });
  } else {
    next();
  }
}

app.get("/api/getUser", async (req, res) => {
  const user = req.session;
  // req.session.username = user.username;
  // req.session.user_id = user.user_id;
  console.log("in checkSession endpoint " + JSON.stringify(user));
  res.send(user ? user : false);
});

app.get("/api/getUsersOpenTrips", loginRequired, async (req, res) => {
  const user_id = req.session.user_id;
  const user = await User.findByPk(user_id);
  try {
    const response = await user.getTrips({
      where: {
        trip_complete: false,
      },
    });
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

app.post("/api/addUserToTrip/:trip_code", loginRequired, async (req, res) => {
  const trip_code = req.params.trip_code;
  const user_id = req.session.user_id;
  console.log("user_id", user_id, "trip_code", trip_code);

  try {
    const trip = await Trip.findOne({
      where: { trip_code: trip_code },
    });

    if (trip) {
      await trip.addUser(user_id);
      res.status(200).send(trip);
    } else {
      res.status(404).send({ error: "Trip not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/getTrip", loginRequired, async (req, res) => {
  const user_id = req.session.user_id;
  const { trip_id } = req.body;
  const user = await User.findByPk(user_id);
  try {
    const response = await user.getTrips({
      where: {
        trip_id: trip_id,
      },
    });
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

app.post("/api/addUserToTrip/:trip_code"),
  loginRequired,
  async (req, res) => {
    const trip_code = req.params.trip_code;
    const user_id = req.session.user_id;
    try {
      const trip = await Trip.findOne({
        where: { trip_code: trip_code },
      });
      if (trip) {
        await trip.addUser(user_id);
        res.status(200).send(trip);
      } else {
        res.status(404).send({ error: "Trip not found" });
      }
    } catch (error) {
      res.status(500).send("oops");
    }
  };

app.get("/api/trips/:tripId/todos", loginRequired, async (req, res) => {
  const tripId = req.params.tripId;
  const todos = await getTodosForTrip(tripId);
  res.json(todos);
});

async function getTodosForTrip(tripId) {
  try {
    const todos = await To_do.findAll({
      where: { trip_id: tripId },
      include: [
        {
          model: User,
          attributes: [],
        },
      ],
      attributes: {
        include: [[Sequelize.literal('"user"."username"'), "username"]],
      },
    });
    return todos;
  } catch (error) {
    console.error("Error fetching todos for trip", tripId, error);
  }
}

app.post("/api/newTodo/:id", loginRequired, async (req, res) => {
  const { id } = req.params; // id is the trip_id !!!!
  const { to_do_name, to_do_complete, user_id } = req.body;
  const trip = await Trip.findByPk(id);
  const updateData = {
    to_do_name: to_do_name,
    to_do_complete: to_do_complete,
  };
  if (user_id !== undefined) {
    updateData.user_id = user_id;
  }
  const todo = await trip.createTo_do(updateData);
  res.status(200).send(todo);
});

app.put("/api/todoUpdate/:id", loginRequired, async (req, res) => {
  const { id } = req.params;
  const updateData = {};
  if (req.body.to_do_name !== undefined) {
    updateData.to_do_name = req.body.to_do_name;
  }
  if (req.body.to_do_complete !== undefined) {
    updateData.to_do_complete = req.body.to_do_complete;
  }
  if (req.body.user_id !== undefined) {
    updateData.user_id = req.body.user_id;
  }
  await To_do.update(updateData, { where: { to_do_id: id } });
  res.sendStatus(200);
});

app.get("/open-to-do", loginRequired, async (req, res) => {
  try {
    const userId = req.session.user_id;
    const user = await User.findByPk(userId);
    const incompleteTrips = await user.getTrips({
      where: {
        trip_complete: false,
      },
    });
    const incompleteTodos = await To_do.findAll({
      where: {
        trip_id: incompleteTrips.map((trip) => trip.trip_id),
      },
      include: [Trip],
    });
    res.status(200).send(incompleteTodos);
  } catch (error) {
    console.error("Error fetching incomplete to-do items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/done-task", loginRequired, async (req, res) => {
  console.log(req.body);
  await To_do.update(
    { to_do_complete: true },
    { where: { to_do_id: req.body.todoId } }
  );

  const todo = await To_do.findAll({
    where: { to_do_complete: false },
    include: [
      {
        model: Trip,
        required: true,
        where: { trip_complete: false },
      },
    ],
  });
  res.send(todo);
});

app.delete("/api/deleteTodo/:id", loginRequired, async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await To_do.findByPk(id);
    await todo.destroy();
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send("Error deleting todo");
  }
});

app.get("/api/getPastTrips", loginRequired, async (req, res) => {
  try {
    const response = await Trip.findAll({
      where: {
        trip_complete: true,
      },
    });
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

app.delete("/api/deleteTrip/:id", loginRequired, async (req, res) => {
  const { id } = req.params;
  try {
    const trip = await Trip.findByPk(id);
    await trip.destroy();
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send("Error deleting trip");
  }
});

app.post("/api/trips", loginRequired, async (req, res) => {
  try {
    const userId = req.session.user_id;
    let newTrip = await Trip.create(req.body);
    await newTrip.addUser(userId);
    res.status(200).send(newTrip);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/tripUpdate/:id", loginRequired, async (req, res) => {
  const { id } = req.params; // id is the trip_id !!!!
  const { trip_name, trip_start, trip_complete } = req.body;
  const trip = await Trip.findByPk(id);
  trip.set({
    trip_name: trip_name,
    trip_start: trip_start,
    trip_complete: trip_complete,
  });
  await trip.save();
  res.sendStatus(200);
});

app.post("/api/signUp", async (req, res) => {
  let newUser = await User.create(req.body);
  res.status(200).send(newUser);
});

app.post("/api/signIn", async (req, res) => {
  const { username, password } = req.body;
  console.log("in server " + JSON.stringify(req.body));
  let user = await User.findOne({
    where: { username: username, password: password },
  });
  if (user) {
    // Successful login
    req.session.username = user.username;
    req.session.user_id = user.user_id;
    req.session.save();
    res.status(200).send({ user: user, success: true });
    console.log("Logged in successfully");
  } else {
    // Failed login
    res.send({ success: false });
    console.log("Invalid email or password");
  }
});

app.get("/pin-place", loginRequired, async (req, res) => {
  const { trip_id } = req.query;
  const pins = await Pin.findAll({
    where: { trip_id: trip_id },
  });
  // console.log(pins);
  res.send(pins);
});

app.post("/coord", async (req, res) => {
  const latLong = req.body;
  console.log("this is my log!!!!!!!!!!!!!!!!!!!!!!!!!", latLong);
  const newPin = await Pin.create({
    pin_lat: latLong.newPlace.lat,
    pin_long: latLong.newPlace.long,
    pin_name: latLong.pinName,
    trip_id: latLong.trip_id,
  });
  const donePin = await Pin.findAll({
    where: { trip_id: latLong.trip_id },
  });
  res.send(donePin);
});

app.get("/pin-place", loginRequired, async (req, res) => {
  const pins = await Pin.findAll({
    where: { trip_id: 1 },
  });
  res.send(pins);
});

app.post("/api/logout", async (req, res) => {
  try {
    if (!req.session.user_id) {
      res.status(401).send("Unauthorized");
    } else {
      req.session.destroy((err) => {
        if (err) {
          console.error("Error destroying session:", err);
          res.status(500).send("Internal Server Error");
        } else {
          res.status(200).send("Logged out successfully");
        }
      });
    }
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).send("Internal Server Error");
  }
});

ViteExpress.listen(app, port, () => {
  console.log(`Server cruisin on http://localhost:${port}`);
});
