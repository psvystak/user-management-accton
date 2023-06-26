const express = require('express');

const app = express();
const path = require('path');
const cors = require('cors');

const port = 3000;

app.use(cors());

app.get('/api/data', (req, res) => {
  const jsonData = require('./api/data.json');
  res.json(jsonData);
});

app.listen(port, () => {
  /* eslint-disable-next-line */
  console.log(`Backend start at http://localhost:${port}`);
});

app.use(express.static(path.join(__dirname, '../dist')));
