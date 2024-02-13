import { User, Trip, To_do, Pin, Note, db } from "../models/model.js";
import tripData from "./tripData.json" assert { type: "json" };
import todoData from "./todoData.json" assert { type: "json" };
import pinData from "./pinData.json" assert { type: "json" };
import noteData from "./noteData.json" assert { type: "json" };

console.log("Syncing database...");
await db.sync({ force: true });

console.log("Seeding database...");

const usersToCreate = [];
for (let i = 0; i < 10; i++) {
  const username = `user${i}@test.com`;
  usersToCreate.push(User.create({ username: username, password: "test" }));
}

const usersInDB = await Promise.all(usersToCreate);

const tripsInDB = await Promise.all(
  tripData.map((trip) => {
    // Not every record has dates and can't pass null to Date.parse, so we check here
    const trip_start = trip.trip_start
      ? new Date(Date.parse(trip.trip_start))
      : null;

    const { trip_name, trip_code, trip_complete } = trip;

    const newTrip = Trip.create({
      trip_name,
      trip_start,
      trip_code,
      trip_complete,
    });

    return newTrip;
  })
);

const todosInDB = await Promise.all(
  todoData.map((todo) => {
    const { to_do_name, to_do_complete, user_id, trip_id } = todo;

    const newTodo = To_do.create({
      to_do_name,
      to_do_complete,
      user_id,
      trip_id,
    });

    return newTodo;
  })
);

const pinInDB = await Promise.all(
  pinData.map((pin) => {
    const { pin_name, pin_coords, is_pin_note, trip_id } = pin;

    const newPin = Pin.create({
      pin_name,
      pin_coords,
      is_pin_note,
      trip_id,
    });

    return newPin;
  })
);

const notesInDB = await Promise.all(
  noteData.map((note) => {
    const { note_text, pin_id, trip_id } = note;

    const newNote = Note.create({
      note_text,
      pin_id,
      trip_id,
    });

    return newNote;
  })
);

// Create Association table associations :)
const aTrip = await Trip.findByPk(1);
await aTrip.addUser(1);
await aTrip.addUser(2);

const bTrip = await Trip.findByPk(1);
await bTrip.addUser(1);

await db.close();

console.log("Finished seeding database!");
