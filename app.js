const express = require('express');
const bodyParser = require('body-parser')
// const fs = require("fs");
const { MongoClient } = require('mongodb');

const mongoDB = require("./Database/database");
const userController = require("./controllers/userController");
// const auth = require("./middleware/auth");


/**
 * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
 * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
 */
const uri = "mongodb+srv://test_user:test_user@cluster1.oidqv.mongodb.net/house_test?retryWrites=true&w=majority"

let app = express();
app.use(bodyParser.json());

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


let client = mongoDB.initiate(uri);

app.get('/getUserId', userController.getUserById)//todo
app.get('/getUsers', userController.getUsers)
app.get('/deleteUsers', userController.deleteUsers)
app.post('/user/createUser', userController.createUser)


let server = app.listen(process.env.PORT || 3000, function () { 
  let host = server.address().address
  let port = server.address().port
  console.log("BackEnd running at http://%s:%s", host, port)
})
