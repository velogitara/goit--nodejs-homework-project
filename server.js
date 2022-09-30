const mongoose = require('mongoose');

const app = require('./app');

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log('Server running. Use our API on port: 3000');
});

const DB_HOST =
  'mongodb+srv://velogitara:axe25paKUyxgJyWL@cluster0.fi04lrd.mongodb.net/phoneBook?retryWrites=true&w=majority';

mongoose
  .connect(DB_HOST)
  .then(() => console.log('database connected'))
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
