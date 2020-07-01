const gulp = require("gulp");
const purgecss = require("gulp-purgecss");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const terser = require("gulp-terser");
const del = require("del");

// Clean css and js folders
gulp.task("cleanDist-11", function () {
  return del([
    "home3/dist/css/**",
    "home3/dist/js/**",
    "!home3/dist/css",
    "!home3/dist/js",
  ]);
});

// Remove Unused CSS
gulp.task("removeUnusedCSS-3", function (done) {
  gulp
    .src("home3/src/**/*.css")
    .pipe(
      purgecss({
        content: ["home3/src/**/*.html"],
        whitelist: ["error"],
      })
    )
    .pipe(gulp.dest("home3/src/clean-css/"))
    .on("end", function () {
      // in case of success
      done();
    });
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
    .pipe(gulp.dest("home3/dist/css"))
    .on("end", function () {
      // in case of success
      done();
    });
});

// Delete clean-css folder
gulp.task("deleteCleanCSS-3", function () {
  return del(["home3/src/clean-css"]);
});

// Minify and concatenate JavaScript for the index page
gulp.task("minifyJSMain-3", function (done) {
  gulp
    .src([
      "home3/src/js/jquery.js",
      "node_modules/jquery-validation/dist/jquery.validate.js",
      "home3/src/js/scroll.js",
      "home3/src/js/form.js",
    ])
    .pipe(concat("main.js"))
    .on("error", (error) => {
      console.log(error);
      done(error);
    })
    .pipe(terser())
    .pipe(gulp.dest("home3/dist/js"))
    .on("end", function () {
      // in case of success
      done();
    });
});

// Minify and concatenate JavaScript for the payment approval page
gulp.task("minifyJSPayment-3", function (done) {
  gulp
    .src(["home3/src/js/jquery.js", "home3/src/js/scroll.js"])
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

// Handle all the css
gulp.task(
  "CSS-3",
  gulp.series("removeUnusedCSS-3", "minifyCSS-3", "deleteCleanCSS-3")
);

// Handle all the JS
gulp.task("JS-3", gulp.parallel("minifyJSMain-3", "minifyJSPayment-3"));

// Build CSS and JS files

gulp.task(
  "build-3",
  gulp.series("cleanDist-3", gulp.parallel("CSS-3", "JS-3"))
);
