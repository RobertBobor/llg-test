const express = require('express');
const bodyParser = require('body-parser');
const blockchainRouter = require('./routes/blockchain.js');

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/blockchain', blockchainRouter);

// health-check
app.get('/', (req, res) => {
  res.send('OK');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});