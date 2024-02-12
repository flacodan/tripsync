import express from "express";
import ViteExpress from "vite-express";
import { Sequelize, Op } from "sequelize";
import { Notes, Trip } from "../models/model.js";

const port = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
ViteExpress.config({ printViteDevServerHost: true });

// SPECIES ENDPOINTS
app.get("/api/getAllSpecies", async (req, res) => {
  try {
    const response = await Species.findAll();
    res.status(200).send(response);
  } catch (error) {
    console.error("Error retrieving species:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/getSpeciesByCategory", async (req, res) => {
  const { category } = req.query;
  const response = await Species.findAll({
    where: { category_id: +category },
  });
  res.status(200).send(response);
});

app.post("/api/addSpecies", async (req, res) => {
  const { name, category_id, length, color, url } = req.body;
  const species = await createSpecies({
    name: name,
    length: length,
    category_id: category_id,
    length: length,
    color: color,
    url: url,
  });
  res.status(200).send(species);
});

// CATEGORY ENDPOINTS
app.get("/api/categoryList", async (req, res) => {
  try {
    const response = await Category.findAll();
    res.status(200).send(response);
    // console.log("server.js categoryList = " + response);
  } catch (error) {
    console.error("Error retrieving categories:", error);
    res.status(500).send("Internal Server Error");
  }
});

ViteExpress.listen(app, port, () => {
  console.log(`Server is listening http://localhost:${port}`);
});
