const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();

const port = process.env.PORT || 3000;

const { DATABASE_USER, DATABASE_PASSWORD, DATABASE_ID } = process.env;
const uri = `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_ID}.mongodb.net/test?retryWrites=true`;
const client = new MongoClient(uri, { useNewUrlParser: true });

app.get("*", (req, res) => {
  res.write("connected to database");

  res.end();
});

process.stdout.write("about to call client.connect");
client.connect(err => {
  process.stdout.write("inside client.connect callback");
  if (err) {
    process.stdout.write("[mongo] error");
    console.log("error connecting to database", err);
    return;
  }
  process.stdout.write("[mongo] success");

  app.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready On Server http://localhost:${port}`);
  });
});
