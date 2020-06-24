const gulp = require("gulp");
const purgecss = require("gulp-purgecss");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const terser = require("gulp-terser");

// Remove Unused CSS
gulp.task("removeUnusedCSS-5", function (done) {
  gulp
    .src("home5/src/**/*.css")
    .pipe(
      purgecss({
        content: ["home5/src/**/*.html"],
      })
    )
    .pipe(gulp.dest("home5/src/clean-css"));
  done();
});

// Minify and concatenate CSS
gulp.task("minifyCSS-5", function (done) {
  gulp
    .src([
      "home5/src/clean-css/css/bootstrap.css",
      "home5/src/clean-css/fonts/fonts.css",
      "home5/src/clean-css/fonts/fontawesome/css/all.css",
      "home5/src/clean-css/css/style.css",
    ])
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 99 versions"],
        cascade: false,
      })
    )
    .pipe(cleanCSS({ level: { 1: { specialComments: 0 } } }))
    .pipe(concat("style.min.css"))
    .pipe(gulp.dest("home5/dist/css"));
  done();
});

// Minify and concatenate JavaScript for the index page
gulp.task("minifyJSMain-5", function (done) {
  gulp
    .src(["home5/src/js/jquery.js", "home5/src/js/scroll.js"])
    .pipe(concat("main.js"))
    .pipe(terser())
    .pipe(gulp.dest("home5/dist/js"));
  done();
});

// Minify image.js
gulp.task("minifyJSImages-5", function (done) {
  gulp
    .src("home5/src/js/images.js")
    .pipe(terser())
    .pipe(gulp.dest("home5/dist/js"));
  done();
});
