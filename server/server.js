import express from "express";
import ViteExpress from "vite-express";
import { Sequelize, Op } from "sequelize";
import { User, To_do, Pin, Note, Trip } from "../models/model.js";

const port = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
ViteExpress.config({ printViteDevServerHost: true });

app.get("/api/getUsersOpenTrips", async (req, res) => {
  // const { user_id } = req.session.user;
  const user_id = 1; // !!!!!!!!!!!!!!!!!!! Must CHANGE this after login is implemented !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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

app.post("/api/getTrip", async (req, res) => {
  // const { user_id } = req.session.user;
  const { trip_id } = req.body;
  const user_id = 1; // !!!!!!!!!!!!!!!!!!! Must CHANGE this after login is implemented !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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

app.get("/api/trips/:tripId/todos", async (req, res) => {
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

app.post("/api/newTodo/:id", async (req, res) => {
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

app.put("/api/todoUpdate/:id", async (req, res) => {
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

app.get("/open-to-do", async (req, res) => {
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

app.put("/done-task", async (req, res) => {
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

app.delete("/api/deleteTodo/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await To_do.findByPk(id);
    await todo.destroy();
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send("Error deleting todo");
  }
});

app.get("/api/getPastTrips", async (req, res) => {
  try {
    const response = await Trip.findAll({
      where: { trip_complete: true },
    });
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

app.delete("/api/deleteTrip/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const trip = await Trip.findByPk(id);
    await trip.destroy();
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send("Error deleting trip");
  }
});

app.post("/api/trips", async (req, res) => {
  let newTrip = await Trip.create(req.body);
  res.status(200).send(newTrip);
});

app.post("/api/signUp", async (req, res) => {
  // console.log('in server ' + JSON.stringify(req.body))
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
    res.status(200).send(user);
    console.log("Logged in successfully");
  } else {
    // Failed login
    res.send({ success: false });
    console.log("Invalid email or password");
  }
});

app.get("/pin-place", async (req, res) => {
  const { trip_id } = req.query;
  // console.log('this is my log' + JSON.stringify(trip_id));

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
    trip_id: 1,
  });
  const donePin = await Pin.findAll({
    where: { trip_id: 1 },
  });
  res.send(donePin);
});

app.get("/pin-place", async (req, res) => {
  const pins = await Pin.findAll({
    where: { trip_id: 1 },
  });
  res.send(pins);
});

ViteExpress.listen(app, port, () => {
  console.log(`Server cruisin on http://localhost:${port}`);
});
