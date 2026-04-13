import express from "express";
import adopterRoutes from './routes/adopter.routes';

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running, yey");
});

app.use(adopterRoutes);

export default app;