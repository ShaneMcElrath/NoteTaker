//These four constants are required.
const express = require('express');
const path = require('path');
const notes = require('./db/db.json');
const fs = require('fs');
const { json } = require('express');

const PORT = process.env.PORT || 3001;
const app = express();
// End four constants that are required

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

app.use(express.static('public'))



app.get('/api/notes', (req, res) => {
  let results = notes;
  res.json(results);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.post('/api/notes', (req, res) => {

  req.body.id = notes.length + 1;
  let notesArray = notes;
  const note = req.body;

  notesArray.push(note);
  
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify(notesArray , null, 2)
  );

  res.json(note)
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});


app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});

