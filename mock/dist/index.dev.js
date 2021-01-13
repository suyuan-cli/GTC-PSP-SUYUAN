"use strict";

var express = require("express");

var app = express();

require('./login')(app);

app.listen(3001, function () {
  console.log('app listen at 3001');
});