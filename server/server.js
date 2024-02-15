import express from "express";
import ViteExpress from "vite-express";
import { Sequelize, Op } from "sequelize";
import { User, To_do, Pin, Note, Trip } from "../models/model.js";

const port = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
ViteExpress.config({ printViteDevServerHost: true });

app.get('/open-to-do', async (req, res) => {
  const todo = await To_do.findAll({
    where: { to_do_complete: false },
    include: [{
      model: Trip,
      required: true,
      where: { trip_complete: false }
    }]
  });
  console.log(todo);
  res.send(todo);
});

app.put('/done-task', async (req, res) => {
  console.log(req.body)
  await To_do.update(
    { to_do_complete: true },
    { where: { to_do_id: req.body.todoId } }
  );

  const todo = await To_do.findAll({
    where: { to_do_complete: false },
    include: [{
      model: Trip,
      required: true,
      where: { trip_complete: false }
    }]
  });

  res.send(todo);

})

// didnt need (evan)
// app.get('/to-do-trip-name', async (req, res) => {
//   const tripName = await Trip.findAll({
//     where: { trip_complete: false}
//   })
//   res.send(tripName);
// })

ViteExpress.listen(app, port, () => {
  console.log(`Server is listening http://localhost:${port}`);
});
