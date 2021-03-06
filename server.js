const {ObjectId} = require('mongodb');
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
    if(VERBOSE)console.log("Collection messages created!");
  });

  dbo.createCollection("finances", function(err, res) {
    if (err) throw err;
    if(VERBOSE)console.log("Collection finances created!");
  });

  dbo.createCollection("chores", function(err, res) {
    if (err) throw err;
    if(VERBOSE)console.log("Collection chores created!");
  });

  dbo.createCollection("completechores", function(err, res) {
    if (err) throw err;
    if(VERBOSE)console.log("Collection completechores created!");
  });

  dbo.createCollection("notifications", function(err, res) {
    if (err) throw err;
    if(VERBOSE)console.log("Collection notifications created!");
  });
});

let insertDocument = function(db, collectionName, data, callback) {
  db.collection(collectionName).insertOne( data, function(err, result) {
    if(VERBOSE)console.log("insertDocument: Inserted a document into the "+collectionName+" collection. : " + data._id);
    if(callback)callback(data);
  });
};

let deleteAllDocuments = function(db, collectionName, callback) {
  db.collection(collectionName).deleteMany({}, function(err, result) {
    if(VERBOSE)console.log("deleteAllDocuments: deleted all documents from "+collectionName);
    if(callback)callback();
  })
}

let updateOneDocument = function(db, collectionName, query, newvalues, callback) {
  if(VERBOSE)console.log("updateOneDocument: query:" + JSON.stringify(query));
  if(VERBOSE)console.log("updateOneDocument: newValue:" + JSON.stringify(newvalues));
  db.collection(collectionName).updateOne(query,{ $set: newvalues }, function(err, res) {
    if (err) {
      throw err;
    }
    if(VERBOSE)console.log("updateOneDocument: Updated a document in "+collectionName+" collection. ");

    if(callback)callback();
  });
};

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

let retreiveCollection = function(db, collection ){
  let cursor;
  try {
    cursor = db.collection(collection).find({});
  } catch (err) {
    if(VERBOSE)console.log("retrieveCollection: retrieve "+collection+" Error\n" + err);
  }
  return cursor;
};

app.get('/fetchmessages', function (req, res) {
  if(VERBOSE)console.log("/fetchmessages request");
  let list = retreiveCollection(dbo, 'messages');
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
  let list = retreiveCollection(dbo, 'finances');
  list.toArray(function(err, docs){
    if(err){
      writeBadRequestResponse(res, "fetchfinances: Error in fetching data: " + err);
    }
    else{
      writeOKResponse(res, "fetchfinances: Succesfully Fetched Finance Data ", docs);
    }
  });
});

app.get('/fetchnotifications', function (req, res) {
  if(VERBOSE)console.log("/fetchnotifications request");
  let list = retreiveCollection(dbo, 'notifications');
  list.toArray(function(err, docs){
    if(err){
      writeBadRequestResponse(res, "fetchnotifications: Error in fetching data: " + err);
    }
    else{
      writeOKResponse(res, "fetchnotifications: Succesfully Fetched Notification Data ", docs);
    }
  });
});


app.get('/fetchchores', function(req, res) {
  if(VERBOSE)console.log("/fetchchores request");
  let list = retreiveCollection(dbo, 'chores');
  list.toArray(function(err, docs) {
    if(err) {
      writeBadRequestResponse(res, "fetchchores: Error in fetching data: " + err);
    }
    else {
      writeOKResponse(res, "fetchchores: Successfully Fetched Chore Data ", docs);
    }
  })
})

app.get('/fetchcompletechores', function(req, res) {
  if(VERBOSE)console.log("/fetchcompletechores request");
  let list = retreiveCollection(dbo, 'completechores');
  list.toArray(function(err, docs) {
    if(err) {
      writeBadRequestResponse(res, "completechores: Error in fecthing data: " + err);
    }
    else {
      writeOKResponse(res, "fetchcompletechores: Successfully Fetched Complete Chore Data ", docs);
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

app.post('/deleteallfinances', function (req, res) {
  if(VERBOSE)console.log("/deleteallfinances request");

  deleteAllDocuments(dbo, "finances", function(err){
    if(err){
      writeBadRequestResponse(res, "deletefinances: Delete Document Failed" + err);
      return;
    }
    writeOKResponse(res, "deletefinances: Task deleted Successfully");
  });
});

app.post('/deletecompletechores', function (req, res) {
  if(VERBOSE)console.log("/deletecompletechores request");

  deleteAllDocuments(dbo, "completechores", function(err){
    if(err){
      writeBadRequestResponse(res, "completechores: Delete Document Failed" + err);
      return;
    }
    writeOKResponse(res, "completechores: Task deleted Successfully");
  });
});

app.post('/deletenotifications', function (req, res) {
  if(VERBOSE)console.log("/deleteallmessages request");

  deleteAllDocuments(dbo, "notifications", function(err){
    if(err){
      writeBadRequestResponse(res, "deletemessages: Delete Document Failed" + err);
      return;
    }
    writeOKResponse(res, "deletemessages: Task deleted Successfully");
  });
});


app.post('/deletenotification', function (req, res) {
  if(VERBOSE)console.log("/deletenotification request");

  let task_id = req.body._id;
  if(task_id == null){
    writeBadRequestResponse(res, "deletenotification: _id not defined." + req.body);
    return;
  }

  if(task_id.length<12){
    writeBadRequestResponse(res, "deletenotification: _id must be  must be a single String of 12 bytes or a string of 24 hex characters." + req.body);
    return;
  }

  updateOneDocument(dbo, "notifications",   {_id:ObjectId(task_id)}, {deleted:true}, function(err){
    if(err){
      writeBadRequestResponse(res, "deletenotification: Delete Document Failed" + err);
      return;
    }
    writeOKResponse(res, "deletenotification: Task deleted Successfully", {_id: task_id});
  });
});

app.post('/newmessage', function (req, res) {
  let message = req.body;

  insertDocument(dbo, "messages", message, function(data){
    writeOKResponse(res, "newmessage: Created Successfully", {_id: data._id});
  });
});

app.post('/newcharges', function(req, res) {
  let charges = req.body; 
  insertDocument(dbo, "finances", charges, function(data) {
    writeOKResponse(res, "newcharges: Created Successfully", {_id: data._id});
  })
});

app.post('/newnotification', function(req, res) {
  let charges = req.body; 
  insertDocument(dbo, "notifications", charges, function(data) {
    writeOKResponse(res, "newnotification: Created Successfully", {_id: data._id});
  })
});

app.post('/newchore', function (req, res) {
  let chore = req.body;

  insertDocument(dbo, "chores", chore, function(data){
    writeOKResponse(res, "newchore: Created Successfully", {_id: data._id});
  });
});

app.post('/newcompletechore', function (req, res) {
  let chore = req.body;

  insertDocument(dbo, "completechores", chore, function(data){
    writeOKResponse(res, "newcompletechore: Created Successfully", {_id: data._id});
  });
});

app.post('/updatechore', function (req, res) {
  if(VERBOSE)console.log("/updatechore request");

  let task_id = req.body._id;
  if(task_id == null){
    writeBadRequestResponse(res, "updatechore: _id not defined." + req.body);
    return;
  }

  if(task_id.length<12){
    writeBadRequestResponse(res, "updatechore: _id must be  must be a single String of 12 bytes or a string of 24 hex characters." + req.body);
    return;
  }

  updateOneDocument(dbo, "chores",   {_id:ObjectId(task_id)}, {lastCompleted:req.body.lastCompleted}, function(err){
    if(err){
      writeBadRequestResponse(res, "updatechore: Update Document Failed" + err);
      return;
    }
    writeOKResponse(res, "updatechore: Chore updated Successfully", {_id: task_id});
  });
});

app.post('/newcompletechore', function(req, res) {
  let chore = req.body;

  insertDocument(dbo, "completechores", chore, function(data){
    writeOKResponse(res, "newcompletechore: Created Successfully", {_id: data._id});
  });
});

app.post('/updatecompletechore', function (req, res) {
  if(VERBOSE)console.log("/updatecompletechore request");

  let task_id = req.body._id;
  if(task_id == null){
    writeBadRequestResponse(res, "updatechore: _id not defined." + req.body);
    return;
  }

  if(task_id.length<12){
    writeBadRequestResponse(res, "updatechore: _id must be  must be a single String of 12 bytes or a string of 24 hex characters." + req.body);
    return;
  }

  updateOneDocument(dbo, "completechores",   {_id:ObjectId(task_id)}, {isDeleted:req.body.isDeleted}, function(err){
    if(err){
      writeBadRequestResponse(res, "updatechore: Update Document Failed" + err);
      return;
    }
    writeOKResponse(res, "updatechore: Chore updated Successfully", {_id: task_id});
  });
});

let server = app.listen(8080, function(){
    let port = server.address().port;
    if(VERBOSE)console.log("Hello! Server started at http://localhost:%s", port);
});
