"use strict";

const gulp = require("gulp");
const HubRegistry = require("gulp-hub");

// Load files into registry
const hub = new HubRegistry(["tasks/*.js"]);

// Tell gulp to use the loaded tasks
gulp.registry(hub);
