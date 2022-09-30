const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config();

const { DB_HOST } = process.env;

const app = require('./app');

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log('Server running. Use our API on port: 3000');
});

mongoose
  .connect(DB_HOST)
  .then(() => console.log('database connected'))
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
