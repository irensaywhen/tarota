const gulp = require("gulp");
const purgecss = require("gulp-purgecss");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const terser = require("gulp-terser");

// Remove Unused CSS
gulp.task("removeUnusedCSS-6", function (done) {
  gulp
    .src("home6/src/**/*.css")
    .pipe(
      purgecss({
        content: ["home6/src/**/*.html"],
      })
    )
    .pipe(gulp.dest("home6/src/clean-css"));
  done();
});

// Minify and concatenate CSS
gulp.task("minifyCSS-6", function (done) {
  gulp
    .src([
      "home6/src/clean-css/css/bootstrap.css",
      "home6/src/clean-css/fonts/fonts.css",
      "home6/src/clean-css/fonts/fontawesome/css/all.css",
      "home6/src/clean-css/css/flaticon.css",
      "home6/src/clean-css/css/style.css",
    ])
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 99 versions"],
        cascade: false,
      })
    )
    .pipe(cleanCSS({ level: { 1: { specialComments: 0 } } }))
    .pipe(concat("style.min.css"))
    .pipe(gulp.dest("home6/dist/css"));
  done();
});

// Minify and concatenate JavaScript for the index page
gulp.task("minifyJSMain-6", function (done) {
  gulp
    .src(["home6/src/js/jquery.js", "home5/src/js/scroll.js"])
    .pipe(concat("main.js"))
    .pipe(terser())
    .pipe(gulp.dest("home6/dist/js"));
  done();
});

// Minify image.js
gulp.task("minifyJSImages-6", function (done) {
  gulp
    .src("home6/src/js/images.js")
    .pipe(terser())
    .pipe(gulp.dest("home6/dist/js"));
  done();
});
