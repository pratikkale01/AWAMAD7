const express = require("express"); // importing expresss
const fs = require("fs"); // fs for file read operation
const path = require("path");
// creating app object and using json middleware provided by express
const app = express();
app.use(express.json());

// variables for http server connection
const HOST = "localhost";
const PORT = 4000;

// base get route
app.get("/", (req, res) => {
  res.send('<h1 style="color:orange ; font-size:100px;" > Practical No:7. </h1>');
});
var myBatch = {};
app.get(
  "/class/batch/:id",
  (req, res, next) => {
    const data = JSON.parse(fs.readFileSync("./class.json"));

    data.subjects.map((batch) => {
      if (batch.id == req.params.id) myBatch = batch;
    });
    console.log(myBatch);
    next();
  },
  (req, res) => {
    res.json(myBatch);
  }
);
var resultArray = [];
app.get(
  "/getstudents",
  (req, res, next) => {
    resultArray = JSON.parse(fs.readFileSync("./student.json"));
    console.log(" data is:");
    resultArray.student.map((student) =>
      console.log(`ID: ${student.id} Name: ${student.name} rollnumber: ${student.rollnumber}`)
    );
    next();
  },
  (req, res) => {
    res.send(resultArray.student);
  }
);
var result = [];
const getBatches = (req, res, next) => {
  const data = JSON.parse(fs.readFileSync("./class.json"));
  data.subjects.map((batch) => result.push(batch));
  console.log("Result: ");
  console.log(result);
  next();
};
const getstudents = (req, res, next) => {
  const data = JSON.parse(fs.readFileSync("./students.json"));
  data.marks.map((student) => result.push(student));
  console.log("Result: ");
  console.log(result);
  next();
};
const sendData = (req, res) => {
  res.send(result);
};
app.get("/getresult", [getBatches, getstudents, sendData]);

// Make server listen on given HOST and PORT
app.listen(PORT, HOST, () => console.log(`Listening on ${HOST}:${PORT}`));
