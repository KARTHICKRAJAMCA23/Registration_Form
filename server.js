const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/registration_form', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});

// Define a schema for your data
const registrationSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: String
});

// Create a model based on the schema
const Registration = mongoose.model('Registration', registrationSchema);

// Handle form submission
app.post('/submit-form', (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  // Create a new registration document
  const newRegistration = new Registration({
    first_name,
    last_name,
    email,
    password
  });

  // Save the document to the database
  newRegistration.save().then(() => {
    console.log('Form data saved successfully');
    res.send('Form data saved successfully');
  }).catch(err => {
    console.error('Error saving form data', err);
    res.status(500).send('Error saving form data');
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});