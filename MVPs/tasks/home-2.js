const gulp = require("gulp");
const purgecss = require("gulp-purgecss");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");

// Remove Unused CSS
gulp.task("removeUnusedCSS-2", function () {
  return gulp
    .src("home2/src/**/*.css")
    .pipe(
      purgecss({
        content: ["home2/src/**/*.html"],
      })
    )
    .pipe(gulp.dest("home2/src/clean-css"));
});

// Minify and concatenate CSS
gulp.task("minifyCSS-2", function () {
  return gulp
    .src([
      "home2/src/clean-css/css/bootstrap.css",
      "home2/src/clean-css/fonts/fonts.css",
      "home2/src/clean-css/fonts/fontawesome/css/all.css",
      "home2/src/clean-css/css/style.css",
    ])
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 99 versions"],
        cascade: false,
      })
    )
    .pipe(cleanCSS({ level: { 1: { specialComments: 0 } } }))
    .pipe(concat("style.min.css"))
    .pipe(gulp.dest("home2/dist/css"));
});

//Minify and concatenate JavaScript
gulp.task("minifyJS-2", function () {
  return gulp
    .src(["home2/src/js/jquery.js", "home2/src/js/scroll.js"])
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(gulp.dest("home2/dist/js"));
});
