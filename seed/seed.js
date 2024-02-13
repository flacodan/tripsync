import { User, Goal, Preferences, db } from "../models/model.js";
import sampleData from "../data/sampleData.json" assert { type: "json" };

console.log("Syncing database...");
await db.sync({ force: true });

console.log("Seeding database...");

const usersToCreate = [];
for (let i = 0; i < 10; i++) {
  const username = `user${i}@test.com`;
  usersToCreate.push(User.create({ username: username, password: "test" }));
}

const usersInDB = await Promise.all(usersToCreate);

const goalsInDB = await Promise.all(
  sampleData.map((goal) => {
    // Not every record has dates and can't pass null to Date.parse, so we check here
    const due_date = goal.due_date ? new Date(Date.parse(goal.due_date)) : null;
    const complete_date = goal.complete_date
      ? new Date(Date.parse(goal.complete_date))
      : null;

    const {
      title,
      description,
      category,
      percent,
      time_est,
      complete,
      priority,
      user_id,
    } = goal;

    const newGoal = Goal.create({
      title,
      description,
      category,
      percent,
      time_est,
      due_date,
      complete,
      complete_date,
      priority,
      user_id, //usersInDB[0].userID,
    });

    return newGoal;
  })
);

await db.close();
console.log("Finished seeding database!");
