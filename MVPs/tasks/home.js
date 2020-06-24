const gulp = require("gulp");
const purgecss = require("gulp-purgecss");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");

// Remove Unused CSS
gulp.task("removeUnusedCSS-1", function () {
  return gulp
    .src("home/src/**/*.css")
    .pipe(
      purgecss({
        content: ["home/src/**/*.html"],
      })
    )
    .pipe(gulp.dest("home/src/clean-css"));
});

// Minify and concatenate CSS
gulp.task("minifyCSS-1", function () {
  return gulp
    .src([
      "home/src/clean-css/css/bootstrap.css",
      "home/src/clean-css/fonts/fonts.css",
      "home/src/clean-css/fonts/fontawesome/css/all.css",
      "home/src/clean-css/css/style.css",
    ])
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 99 versions"],
        cascade: false,
      })
    )
    .pipe(cleanCSS({ level: { 1: { specialComments: 0 } } }))
    .pipe(concat("style.min.css"))
    .pipe(gulp.dest("home/dist/css"));
});

//Minify and concatenate JavaScript
gulp.task("minifyJS-1", function () {
  return gulp
    .src(["home/src/js/jquery.js", "home/src/js/scroll.js"])
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(gulp.dest("home/dist/js"));
});
