import express from "express";
import cors from "cors";

import adopterRoutes from './routes/adopter.routes';
import birdRoutes from './routes/bird.routes';

const app = express();

app.use(cors({
  origin: "http://localhost:3001"
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running, yey");
});

app.use('/birds', birdRoutes);
app.use(adopterRoutes);

export default app;