const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/userManagement', {useNewUrlParser: true}); // "userManagement" is the db name
const db = mongoose.connection;
const userSchema = new mongoose.Schema({
   name: String,
   role: String,
   age: { type: Number, min: 18, max: 70 },
   createdDate: { type: Date, default: Date.now }
});

const user = mongoose.model('userCollection', userSchema);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('db connected');
  const newUser = new user();
  newUser.name = "Joe Mongoose";
  newUser.role = "Admin";
  newUser.save((err, data) => { // stored to the database
      if (err) {
          return console.error(err);
      }
      console.log(`new user save: ${data}`);
  });
});