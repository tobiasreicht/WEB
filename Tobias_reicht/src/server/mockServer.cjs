const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = 3000;

const lights = [
  { id: 'A1', state: 'red' },
  { id: 'A2', state: 'red' },
  { id: 'A3', state: 'red' },
  { id: 'A4', state: 'red' },
];

const sequence = ['red', 'green', 'yellow'];
let idx = 0;
const durations = { red: 5000, green: 5000, yellow: 2000 };

function tick() {
  const state = sequence[idx];
  lights.forEach((l) => (l.state = state));
  idx = (idx + 1) % sequence.length;
  setTimeout(tick, durations[state]);
}

tick();

app.get('/api/traffic-lights', (_req, res) => {
  res.json({ lights });
});

app.listen(PORT, () => {
  console.log(`Mock Traffic-Light API running on http://localhost:${PORT}`);
});
