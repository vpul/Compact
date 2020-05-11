require('dotenv').config();
const express = require('express');
const cors = require('cors');
const createError = require('http-errors');

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  next(createError(404, 'The page you requested does not exist'));
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error',
  });
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
