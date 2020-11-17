const express = require("express");
const bodyParser   = require('body-parser');
const app = express();
let dbo = null;
const path = require('path');

const VERBOSE = true;

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));


let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/splittheroom";

MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
  if (err) throw err;

  dbo = db.db("splittheroom");
  if(VERBOSE)console.log("Database created!");

  dbo.createCollection("messages", function(err, res) {
    if (err) throw err;
    if(VERBOSE)console.log("Collection tasks created!");
  });
});

let insertDocument = function(db, collectionName, data, callback) {
  db.collection(collectionName).insertOne( data, function(err, result) {
    if(VERBOSE)console.log("insertDocument: Inserted a document into the "+collectionName+" collection. : " + data._id);
    if(callback)callback(data);
  });
};

let insertMultiple = function(db, collectionName, data, callback) {
  db.collection(collectionName).insertMany( data, function(err, result) {
    if(VERBOSE)console.log("insertDocument: Inserted multiple documents into the "+collectionName+" collection. : " + data._id);
    if(callback)callback(data);
  });
};

let deleteAllDocuments = function(db, collectionName, callback) {
  db.collection(collectionName).deleteMany({}, function(err, result) {
    if(VERBOSE)console.log("deleteAllDocuments: deleted all documents from "+collectionName);
    if(callback)callback();
  })
}

// let updateOneDocument = function(db, collectionName, query, newvalues, callback) {
//   if(VERBOSE)console.log("updateOneDocument: query:" + JSON.stringify(query));
//   if(VERBOSE)console.log("updateOneDocument: newValue:" + JSON.stringify(newvalues));
//   db.collection(collectionName).updateOne(query,{ $set: newvalues }, function(err, res) {
//     if (err) {
//       throw err;
//     }
//     if(VERBOSE)console.log("updateOneDocument: Updated a document in "+collectionName+" collection. ");

//     if(callback)callback();
//   });
// };

//https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
let writeOKResponse = function(res, message, data){
  let obj = {
    status: "OK",
    message: message,
    data: data
  };
  if(VERBOSE)console.log("writeOKResponse:" + message);

  res.writeHead(200, {'Content-type': 'application/json'});
  res.end(JSON.stringify(obj));
}

let writeBadRequestResponse = function(res, message){
  if(VERBOSE)console.log("writeBadRequestResponse:" + message);
  res.writeHead(400, {'Content-type': 'text/plain'});
  res.end(message);
}

let retreiveAllMessagesList = function(db ){
  let cursor;
  try {
    cursor = db.collection('messages').find({});
  } catch (err) {
    if(VERBOSE)console.log("retreiveAllMessagesList: retreiveAllMessagesList Error\n" + err);
  }
  return cursor;
};

let retreiveAllFinancesList = function(db ){
  let cursor;
  try {
    cursor = db.collection('finances').find({});
  } catch (err) {
    if(VERBOSE)console.log("retreiveAllFinancesList: retreiveAllFinancesList Error\n" + err);
  }
  return cursor;
};

let retreiveAllChoresList = function(db ){
  let cursor;
  try {
    cursor = db.collection('chores').find({});
  } catch (err) {
    if(VERBOSE)console.log("retreiveAllChoresList: retreiveAllChoresList Error\n" + err);
  }
  return cursor;
};

app.get('/fetchmessages', function (req, res) {
  if(VERBOSE)console.log("/fetchmessages request");
  let list = retreiveAllMessagesList(dbo);
  list.toArray(function(err, docs){
    if(err){
      writeBadRequestResponse(res, "fetchmessages: Error in fetching data: " + err);
    }
    else{
      writeOKResponse(res, "fetchmessages: Succesfully Fetched Messsage Data ", docs);
    }
  });
});

app.get('/fetchfinances', function (req, res) {
  if(VERBOSE)console.log("/fetchfinances request");
  let list = retreiveAllFinancesList(dbo);
  list.toArray(function(err, docs){
    if(err){
      writeBadRequestResponse(res, "fetchfinances: Error in fetching data: " + err);
    }
    else{
      writeOKResponse(res, "fetchfinances: Succesfully Fetched Finance Data ", docs);
    }
  });
});


app.get('/fetchchores', function(req, res) {
  if(VERBOSE)console.log("/fetchchores requirest");
  let list = retreiveAllChoresList(dbo);
  list.toArray(function(err, docs) {
    if(err) {
      writeBadRequestResponse(res, "fetchchores: Error in fetching data: " + err);
    }
    else {
      writeOKResponse(res, "fetchchores: Successfully Fetched Chore Data ", docs);
    }
  })
})


app.post('/deleteallmessages', function (req, res) {
  if(VERBOSE)console.log("/deleteallmessages request");

  deleteAllDocuments(dbo, "messages", function(err){
    if(err){
      writeBadRequestResponse(res, "deletemessages: Delete Document Failed" + err);
      return;
    }
    writeOKResponse(res, "deletemessages: Task deleted Successfully");
  });
});

app.post('/newmessage', function (req, res) {
  let message = req.body;

  // if(typeof(message.author)!="string"){
  //   writeBadRequestResponse(res, "newmessage: No title is defined.");
  //   return;
  // }

  insertDocument(dbo, "messages", message, function(data){
    writeOKResponse(res, "newmessage: Created Successfully", {_id: data._id});
  });
});

app.post('/newcharges', function(req, res) {
  let charges = req.body; 
  insertMultiple(dbo, "finances", charges, function(data) {
    writeOKResponse(res, "newcharges: Created Successfully", {_id: data._id});
  })

})

app.post('/newchore', function (req, res) {
  let chore = req.body;

  // if(typeof(message.author)!="string"){
  //   writeBadRequestResponse(res, "newmessage: No title is defined.");
  //   return;
  // }

  insertDocument(dbo, "chores", chore, function(data){
    writeOKResponse(res, "newmessage: Created Successfully", {_id: data._id});
  });
});

let server = app.listen(8080, function(){
    let port = server.address().port;
    if(VERBOSE)console.log("Hello! Server started at http://localhost:%s", port);
});
