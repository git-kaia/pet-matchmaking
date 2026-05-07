// app.ts

import express from "express";
import cors from "cors";

import adopterRoutes from './routes/adopter.routes';
import petRoutes from './routes/pet.routes';
import matchRoutes from './routes/match.routes';

const app = express();

app.use(cors({
  origin: "http://localhost:3001"
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running, yey");
});

// register route groups
app.use('/adopters', adopterRoutes);
app.use('/pets', petRoutes);
app.use('/adopters', matchRoutes); 

export default app;