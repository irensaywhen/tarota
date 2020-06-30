const gulp = require("gulp");
const purgecss = require("gulp-purgecss");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const terser = require("gulp-terser");
const del = require("del");
const plumber = require("gulp-plumber");
const handler = require("gulp-task-err-handler");

// Clean css and js folders
gulp.task("cleanDist-9", function () {
  return del([
    "home9/dist/css/**",
    "home9/dist/js/**",
    "!home9/dist/css",
    "!home9/dist/js",
  ]);
});

// Remove Unused CSS
gulp.task("removeUnusedCSS-9", function (done) {
  gulp
    .src("home9/src/**/*.css")
    .pipe(plumber())
    .pipe(
      purgecss({
        content: ["home9/src/**/*.html"],
        whitelist: ["error"],
      })
    )
    .pipe(gulp.dest("home9/src/clean-css/"))
    .on("end", function () {
      // in case of success
      done();
    });
});

// Minify and concatenate CSS
gulp.task("minifyCSS-9", function (done) {
  gulp
    .src([
      "home9/src/clean-css/css/bootstrap.css",
      "home9/src/clean-css/fonts/fonts.css",
      "home9/src/clean-css/fonts/fontawesome/css/all.css",
      "home9/src/clean-css/css/flaticon.css",
      "home9/src/clean-css/css/style.css",
    ])
    .on("error", (error) => {
      console.log(error);
      done(error);
    })
    //.pipe(plumber())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 99 versions"],
        cascade: false,
      })
    )
    .pipe(cleanCSS({ level: { 1: { specialComments: 0 } } }))
    .pipe(concat("style.min.css"))
    .pipe(gulp.dest("home9/dist/css"))
    .on("end", function () {
      // in case of success
      done();
    });
  //done();
});

// Delete clean-css folder
gulp.task("deleteCleanCSS-9", function (done) {
  return del(["home9/src/clean-css"]);
});

// Minify and concatenate JavaScript for the index page
gulp.task("minifyJSMain-9", function (done) {
  gulp
    .src([
      "home9/src/js/jquery.js",
      "node_modules/jquery-validation/dist/jquery.validate.js",
      "home9/src/js/scroll.js",
      "home9/src/js/form.js",
    ])
    .pipe(plumber())
    .pipe(concat("main.js"))
    .on("error", (error) => {
      console.log(error);
      done(error);
    })
    .pipe(terser())
    .pipe(gulp.dest("home9/dist/js"))
    .on("end", function () {
      // in case of success
      done();
    });
});

// Minify and concatenate JavaScript for the payment approval page
gulp.task("minifyJSPayment-9", function (done) {
  gulp
    .src(["home9/src/js/jquery.js", "home9/src/js/scroll.js"])
    .pipe(plumber())
    .pipe(concat("payment.js"))
    .on("error", (error) => {
      console.log(error);
      done(error);
    })
    .pipe(uglify())
    .pipe(gulp.dest("home9/dist/js"))
    .on("end", function () {
      // in case of success
      done();
    });
});

// Minify image.js
gulp.task("minifyJSImages-9", function (done) {
  gulp
    .src("home9/src/js/images.js")
    .pipe(plumber())
    .pipe(terser())
    .pipe(gulp.dest("home9/dist/js"))
    .on("end", function () {
      // in case of success
      done();
    });
});

// Handle all the css
gulp.task(
  "CSS-9",
  gulp.series("removeUnusedCSS-9", "minifyCSS-9", "deleteCleanCSS-9")
);

// Handle all the JS
gulp.task(
  "JS-9",
  gulp.parallel("minifyJSImages-9", "minifyJSMain-9", "minifyJSPayment-9")
);

// Build CSS and JS files

gulp.task(
  "build-9",
  gulp.series("cleanDist-9", gulp.parallel("CSS-9", "JS-9"))
);
