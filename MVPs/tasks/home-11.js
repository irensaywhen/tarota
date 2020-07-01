const gulp = require("gulp");
const purgecss = require("gulp-purgecss");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const terser = require("gulp-terser");
const del = require("del");
const plumber = require("gulp-plumber");

// Clean css and js folders
gulp.task("cleanDist-11", function () {
  return del([
    "home11/dist/css/**",
    "home11/dist/js/**",
    "!home11/dist/css",
    "!home11/dist/js",
  ]);
});

// Remove Unused CSS
gulp.task("removeUnusedCSS-11", function (done) {
  gulp
    .src("home11/src/**/*.css")
    .pipe(
      purgecss({
        content: ["home11/src/**/*.html"],
        whitelist: ["error"],
      })
    )
    .pipe(gulp.dest("home11/src/clean-css/"))
    .on("end", function () {
      // in case of success
      done();
    });
});

// Minify and concatenate CSS
gulp.task("minifyCSS-11", function (done) {
  gulp
    .src([
      "home11/src/clean-css/css/bootstrap.css",
      "home11/src/clean-css/fonts/fonts.css",
      "home11/src/clean-css/fonts/fontawesome/css/all.css",
      "home11/src/clean-css/css/flaticon.css",
      "home11/src/clean-css/css/style.css",
    ])
    .on("error", (error) => {
      console.log(error);
      done(error);
    })
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 99 versions"],
        cascade: false,
      })
    )
    .pipe(cleanCSS({ level: { 1: { specialComments: 0 } } }))
    .pipe(concat("style.min.css"))
    .pipe(gulp.dest("home11/dist/css"))
    .on("end", function () {
      // in case of success
      done();
    });
});

// Delete clean-css folder
gulp.task("deleteCleanCSS-11", function () {
  return del(["home11/src/clean-css"]);
});

// Minify and concatenate JavaScript for the index page
gulp.task("minifyJSMain-11", function (done) {
  gulp
    .src([
      "home11/src/js/jquery.js",
      "node_modules/jquery-validation/dist/jquery.validate.js",
      "home11/src/js/scroll.js",
      "home11/src/js/form.js",
    ])
    .pipe(plumber())
    .pipe(concat("main.js"))
    .on("error", (error) => {
      console.log(error);
      done(error);
    })
    .pipe(terser())
    .pipe(gulp.dest("home11/dist/js"))
    .on("end", function () {
      // in case of success
      done();
    });
});

// Minify and concatenate JavaScript for the payment approval page
gulp.task("minifyJSPayment-11", function (done) {
  gulp
    .src(["home11/src/js/jquery.js", "home11/src/js/scroll.js"])
    .pipe(plumber())
    .pipe(concat("payment.js"))
    .on("error", (error) => {
      console.log(error);
      done(error);
    })
    .pipe(uglify())
    .pipe(gulp.dest("home11/dist/js"))
    .on("end", function () {
      // in case of success
      done();
    });
});

// Minify image.js
gulp.task("minifyJSImages-11", function (done) {
  gulp
    .src("home11/src/js/images.js")
    .pipe(plumber())
    .pipe(terser())
    .pipe(gulp.dest("home11/dist/js"))
    .on("end", function () {
      // in case of success
      done();
    });
});

// Handle all the css
gulp.task(
  "CSS-11",
  gulp.series("removeUnusedCSS-11", "minifyCSS-11", "deleteCleanCSS-11")
);

// Handle all the JS
gulp.task(
  "JS-10",
  gulp.parallel("minifyJSImages-11", "minifyJSMain-11", "minifyJSPayment-11")
);

// Build CSS and JS files

gulp.task(
  "build-11",
  gulp.series("cleanDist-11", gulp.parallel("CSS-11", "JS-11"))
);
