const express = require("express");
const fs = require("fs");
const path = require('path');
 
const app = express();
// const publicDirectoryPath = path.join(__dirname, './public');


// app.use(express.static(publicDirectoryPath));

app.use(express.static(__dirname + "/public"));

// app.use(function(request, response, next){
//     let now = new Date();
//     let hour = now.getHours();
//     let minutes = now.getMinutes();
//     let seconds = now.getSeconds();
//     let data = `${hour}:${minutes}:${seconds} ${request.method} ${request.url} ${request.get("user-agent")}`;
//     console.log(data);
//     fs.appendFile("server.log", data + "\n", function(){});
//     next();
// });

app.get("/", function(request, response){

    response.send("<h2>Hello Express fff</h2>");
});

app.listen(3000);