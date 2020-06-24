const gulp = require("gulp");
const purgecss = require("gulp-purgecss");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const terser = require("gulp-terser");

// Remove Unused CSS
gulp.task("removeUnusedCSS-3", function (done) {
  gulp
    .src("home3/src/**/*.css")
    .pipe(
      purgecss({
        content: ["home3/src/**/*.html"],
      })
    )
    .pipe(gulp.dest("home3/src/clean-css"));
  done();
});

// Minify and concatenate CSS
gulp.task("minifyCSS-3", function (done) {
  gulp
    .src([
      "home3/src/clean-css/css/bootstrap.css",
      "home3/src/clean-css/fonts/fonts.css",
      "home3/src/clean-css/fonts/fontawesome/css/all.css",
      "home3/src/clean-css/css/style.css",
    ])
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 99 versions"],
        cascade: false,
      })
    )
    .pipe(cleanCSS({ level: { 1: { specialComments: 0 } } }))
    .pipe(concat("style.min.css"))
    .pipe(gulp.dest("home3/dist/css"));
  done();
});

// Minify and concatenate JavaScript for the index page
gulp.task("minifyJSMain-3", function (done) {
  gulp
    .src([
      "home3/src/js/jquery.js",
      "node_modules/jquery-validation/dist/jquery.validate.js",
      "home3/src/js/form.js",
      "home3/src/js/scroll.js",
    ])
    .pipe(concat("main.js"))
    .pipe(terser())
    .pipe(gulp.dest("home3/dist/js"));
  done();
});

// Minify and concatenate JavaScript for the payment approval page
gulp.task("minifyJSPayment-3", function (done) {
  gulp
    .src(["home3/src/js/jquery.js", "home3/src/js/scroll.js"])
    .pipe(concat("payment.js"))
    .pipe(uglify())
    .pipe(gulp.dest("home3/dist/js"));
  done();
});
