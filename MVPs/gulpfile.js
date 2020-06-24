"use strict";

const gulp = require("gulp");
const HubRegistry = require("gulp-hub");

// Load files into registry
const hub = new HubRegistry(["tasks/*.js"]);

// Tell gulp to use the loaded tasks
gulp.registry(hub);

//const gulp = require("gulp");
//const purgecss = require("gulp-purgecss");
//var autoprefixer = require("gulp-autoprefixer");
//const cleanCSS = require("gulp-clean-css");
//const concat = require("gulp-concat");

// Remove unused CSS
// gulp.task("removeUnusedCSS", function () {
//   return gulp
//     .src("home/**/*.css")
//     .pipe(
//       purgecss({
//         content: ["home/**/*.html"],
//       })
//     )
//     .pipe(gulp.dest("home/dist/"));
// });

// Minify and concatenate CSS
// gulp.task("minifyCSS", function () {
//   return gulp
//     .src([
//       "home/dist/css/bootstrap.css",
//       "home/dist/css/fonts.css",
//       "home/dist/fonts/fontawesome/css/all.css",
//       "home/dist/css/mvp_style.css",
//     ])
//     .pipe(cleanCSS({ level: { 1: { specialComments: 0 } } }))
//     .pipe(concat("style.min.css"))
//     .pipe(gulp.dest("home/dist/css"));
// });
