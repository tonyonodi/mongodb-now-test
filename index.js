const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();

const port = process.env.PORT || 3000;

const uri = `mongodb+srv://public:public@cluster0-c6p6b.mongodb.net/admin`;
const client = new MongoClient(uri, { useNewUrlParser: true });

app.get("*", (req, res) => {
  res.write("connected to database");

  res.end();
});

process.stdout.write("\nabout to call client.connect");
client.connect(err => {
  process.stdout.write("\ninside client.connect callback");
  if (err) {
    process.stdout.write("\n[mongo] error");
    console.log("error connecting to database", err);
    return;
  }
  process.stdout.write("\n[mongo] success");

  app.listen(port, err => {
    if (err) throw err;
    process.stdout.write(`\n> Ready On Server http://localhost:${port}`);
  });
});
