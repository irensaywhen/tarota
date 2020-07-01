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
gulp.task("cleanDist-10", function () {
  return del([
    "home10/dist/css/**",
    "home10/dist/js/**",
    "!home10/dist/css",
    "!home10/dist/js",
  ]);
});

// Remove Unused CSS
gulp.task("removeUnusedCSS-10", function (done) {
  gulp
    .src("home10/src/**/*.css")
    .pipe(plumber())
    .pipe(
      purgecss({
        content: ["home10/src/**/*.html"],
        whitelist: ["error"],
      })
    )
    .pipe(gulp.dest("home10/src/clean-css/"))
    .on("end", function () {
      // in case of success
      done();
    });
});

// Minify and concatenate CSS
gulp.task("minifyCSS-10", function (done) {
  gulp
    .src([
      "home10/src/clean-css/css/bootstrap.css",
      "home10/src/clean-css/fonts/fonts.css",
      "home10/src/clean-css/fonts/fontawesome/css/all.css",
      "home10/src/clean-css/css/flaticon.css",
      "home10/src/clean-css/css/style.css",
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
    .pipe(gulp.dest("home10/dist/css"))
    .on("end", function () {
      // in case of success
      done();
    });
});

// Delete clean-css folder
gulp.task("deleteCleanCSS-10", function () {
  return del(["home10/src/clean-css"]);
});

// Minify and concatenate JavaScript for the index page
gulp.task("minifyJSMain-10", function (done) {
  gulp
    .src([
      "home10/src/js/jquery.js",
      "node_modules/jquery-validation/dist/jquery.validate.js",
      "home10/src/js/scroll.js",
      "home10/src/js/form.js",
    ])
    .pipe(plumber())
    .pipe(concat("main.js"))
    .on("error", (error) => {
      console.log(error);
      done(error);
    })
    .pipe(terser())
    .pipe(gulp.dest("home10/dist/js"))
    .on("end", function () {
      // in case of success
      done();
    });
});

// Minify and concatenate JavaScript for the payment approval page
gulp.task("minifyJSPayment-10", function (done) {
  gulp
    .src(["home10/src/js/jquery.js", "home10/src/js/scroll.js"])
    .pipe(plumber())
    .pipe(concat("payment.js"))
    .on("error", (error) => {
      console.log(error);
      done(error);
    })
    .pipe(uglify())
    .pipe(gulp.dest("home10/dist/js"))
    .on("end", function () {
      // in case of success
      done();
    });
});

// Minify image.js
gulp.task("minifyJSImages-10", function (done) {
  gulp
    .src("home10/src/js/images.js")
    .pipe(plumber())
    .pipe(terser())
    .pipe(gulp.dest("home10/dist/js"))
    .on("end", function () {
      // in case of success
      done();
    });
});

// Handle all the css
gulp.task(
  "CSS-10",
  gulp.series("removeUnusedCSS-10", "minifyCSS-10", "deleteCleanCSS-10")
);

// Handle all the JS
gulp.task(
  "JS-10",
  gulp.parallel("minifyJSImages-10", "minifyJSMain-10", "minifyJSPayment-10")
);

// Build CSS and JS files

gulp.task(
  "build-10",
  gulp.series("cleanDist-10", gulp.parallel("CSS-10", "JS-10"))
);
