const gulp = require("gulp");
const purgecss = require("gulp-purgecss");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const terser = require("gulp-terser");

// Remove Unused CSS
gulp.task("removeUnusedCSS-4", function (done) {
  gulp
    .src(["home4/src/**/*.css", "!home4/src/css/style.css"])
    .pipe(
      purgecss({
        content: ["home4/src/**/*.html"],
      })
    )
    .pipe(gulp.dest("home4/src/clean-css"));
  done();
});

// Minify and concatenate CSS
gulp.task("minifyCSS-4", function (done) {
  gulp
    .src([
      "home4/src/clean-css/css/bootstrap.css",
      "home4/src/clean-css/fonts/fonts.css",
      "home4/src/clean-css/fonts/fontawesome/css/all.css",
      "home4/src/clean-css/css/style.css",
    ])
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 99 versions"],
        cascade: false,
      })
    )
    .pipe(cleanCSS({ level: { 1: { specialComments: 0 } } }))
    .pipe(concat("style.min.css"))
    .pipe(gulp.dest("home4/dist/css"));
  done();
});

// Minify and concatenate JavaScript for the index page
gulp.task("minifyJSMain-4", function (done) {
  gulp
    .src([
      "home4/src/js/jquery.js",
      "node_modules/jquery-validation/dist/jquery.validate.js",
      "home4/src/js/form.js",
      "home4/src/js/scroll.js",
    ])
    .pipe(concat("main.js"))
    .pipe(terser())
    .pipe(gulp.dest("home4/dist/js"));
  done();
});

// Minify and concatenate JavaScript for the payment approval page
gulp.task("minifyJSPayment-4", function (done) {
  gulp
    .src(["home4/src/js/jquery.js", "home4/src/js/scroll.js"])
    .pipe(concat("payment.js"))
    .pipe(uglify())
    .pipe(gulp.dest("home4/dist/js"));
  done();
});
