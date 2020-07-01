const gulp = require("gulp");
const purgecss = require("gulp-purgecss");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const terser = require("gulp-terser");
const del = require("del");

// Clean css and js folders
gulp.task("cleanDist-4", function () {
  return del([
    "home4/dist/css/**",
    "home4/dist/js/**",
    "!home4/dist/css",
    "!home4/dist/js",
  ]);
});

// Remove Unused CSS
gulp.task("removeUnusedCSS-4", function (done) {
  gulp
    .src("home4/src/**/*.css")
    .pipe(
      purgecss({
        content: ["home4/src/**/*.html"],
        whitelist: ["error"],
      })
    )
    .pipe(gulp.dest("home4/src/clean-css/"))
    .on("end", function () {
      // in case of success
      done();
    });
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
    .pipe(gulp.dest("home4/dist/css"))
    .on("end", function () {
      // in case of success
      done();
    });
});

// Delete clean-css folder
gulp.task("deleteCleanCSS-4", function () {
  return del(["home4/src/clean-css"]);
});

// Minify and concatenate JavaScript for the index page
gulp.task("minifyJSMain-4", function (done) {
  gulp
    .src([
      "home4/src/js/jquery.js",
      "node_modules/jquery-validation/dist/jquery.validate.js",
      "home4/src/js/scroll.js",
      "home4/src/js/form.js",
    ])
    .pipe(concat("main.js"))
    .on("error", (error) => {
      console.log(error);
      done(error);
    })
    .pipe(terser())
    .pipe(gulp.dest("home4/dist/js"))
    .on("end", function () {
      // in case of success
      done();
    });
});

// Minify and concatenate JavaScript for the payment approval page
gulp.task("minifyJSPayment-4", function (done) {
  gulp
    .src(["home4/src/js/jquery.js", "home4/src/js/scroll.js"])
    .pipe(concat("payment.js"))
    .on("error", (error) => {
      console.log(error);
      done(error);
    })
    .pipe(uglify())
    .pipe(gulp.dest("home4/dist/js"))
    .on("end", function () {
      // in case of success
      done();
    });
});

// Handle all the css
gulp.task(
  "CSS-4",
  gulp.series("removeUnusedCSS-4", "minifyCSS-4", "deleteCleanCSS-4")
);

// Handle all the JS
gulp.task("JS-4", gulp.parallel("minifyJSMain-4", "minifyJSPayment-4"));

// Build CSS and JS files

gulp.task(
  "build-4",
  gulp.series("cleanDist-4", gulp.parallel("CSS-4", "JS-4"))
);
