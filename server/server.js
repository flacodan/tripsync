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
  console.log("server.getTrip.trip_id: " + trip_id);
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
    const todos = await To_do.findAll({ where: { trip_id: tripId } });
    console.log("server.getTodosForTrip.todolist " + JSON.stringify(todos));
    return todos;
  } catch (error) {
    console.error("Error fetching todos for trip", tripId, error);
  }
}

app.put("/api/todoUpdate/:id", async (req, res) => {
  // const { username, user_id } = req.session.user;
  const { id } = req.params;
  const { to_do_name, to_do_complete } = req.body;
  console.log("server.putTodo id: " + id + " complete? " + to_do_complete);
  await To_do.update(
    {
      to_do_name: to_do_name,
      to_do_complete: to_do_complete,
    },
    { where: { to_do_id: id } }
  );
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
  console.log(todo);
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

// didnt need (evan)
// app.get('/to-do-trip-name', async (req, res) => {
//   const tripName = await Trip.findAll({
//     where: { trip_complete: false}
//   })
//   res.send(tripName);
// })

app.get("/pin-place", async (req, res) => {
  const { trip_id } = req.query 
  console.log('this is my log' + JSON.stringify(trip_id));

  const pins = await Pin.findAll({
    where: { trip_id: trip_id },
  });
  console.log(pins);
  res.send(pins);
});

ViteExpress.listen(app, port, () => {
  console.log(`Server is listening http://localhost:${port}`);
});
