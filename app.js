const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost/appusers", { useNewUrlParser: true }); // "userManagement" is the db name
const db = mongoose.connection;
const userSchema = new mongoose.Schema({
  name: String,
  role: String,
  age: { type: Number, min: 18, max: 70 },
  createdDate: { type: Date, default: Date.now }
});

const user = mongoose.model("userCollection", userSchema);

//  db.on('error', console.error.bind(console, 'connection error:'));
//  db.once('open', function () {
//      console.log('db connected');
//      const newUser = new user();
//      newUser.name = "Ken Adams";
//      newUser.role = "Student";
//      newUser.age = 20;
//      newUser.save((err, data) => { // stored to the database
//         if (err) {
//             return console.error(err);
//         }
//         console.log(`new user save: ${data}`);
//     });
// });

//Create -- new document

app.post("/newUser", (req, res) => {
  console.log(`POST /newUser: ${JSON.stringify(req.body)}`);
  const newUser = new user();
  newUser.name = req.body.name;
  newUser.role = req.body.role;
  newUser.save((err, data) => {
    if (err) {
      return console.error(err);
    }
    console.log(`new user save: ${data}`);
    res.send(`done ${data}`);
  });
}); //

app.listen(port, err => {
  if (err) console.log(err);
  console.log(`App Server listen on port: ${port}`);
});
