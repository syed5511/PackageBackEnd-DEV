const mongoose = require('mongoose')
require('dotenv').config();



mongoose.connect(process.env.DatabaseIkram, {useNewUrlParser: true});

mongoose.connection
    .once("open", () => console.log("Connected to Database"))
    .on("error", error => {
        console.log("Your Error", error);
    })


    // Add callback function 
    //mongoose.connect(process.env.DatabaseIkram, {useNewUrlParser: true},() => {});

/*







/*

const mongoose = require('mongoose')
require('dotenv').config();

mongoose.Promise =global.Promise;
mongoose.connect(process.env.DatabaseIkram)
  

*/




/*
   
  var mongoose = require('mongoose');
  require('dotenv').config();

  //require chalk module to give colors to console text
  var chalk = require('chalk');
  
  //require database URL from properties file
  //var dbURL = 'mongodb+srv://syed:1234567890@cluster0-18izg.mongodb.net/test?retryWrites=true&w=majority'
  
  var connected = chalk.bold.cyan;
  var error = chalk.bold.yellow;
  var disconnected = chalk.bold.red;
  var termination = chalk.bold.magenta;
  
  //export this function and imported by server.js
     module.exports =function(){
  
      mongoose.connect(process.env.DatabaseIkram);
  
      mongoose.connection.on('connected', function(){
          console.log(connected("Mongoose default connection is open to ", dbURL));
      });
  
      mongoose.connection.on('error', function(err){
          console.log(error("Mongoose default connection has occured "+err+" error"));
      });
  
      mongoose.connection.on('disconnected', function(){
          console.log(disconnected("Mongoose default connection is disconnected"));
      });
  
      process.on('SIGINT', function(){
          mongoose.connection.close(function(){
              console.log(termination("Mongoose default connection is disconnected due to application termination"));
              process.exit(0)
          });
      });
  }

*/