import express from "express";
import { lights, startSimulation } from "./simulation";
import cors from "cors";

const app = express();
app.use(cors());
const PORT = 3000;

// 🔹 Hier starten wir die Simulation einmal, beim Serverstart
startSimulation();

app.get("/api/traffic-lights", (_req, res) => {
  res.json({ lights });
});

app.listen(PORT, () => {
  console.log(`🚦 Traffic-Light API läuft auf http://localhost:${PORT}`);
});
