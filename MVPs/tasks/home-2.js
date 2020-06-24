const gulp = require("gulp");
const purgecss = require("gulp-purgecss");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");

// Remove Unused CSS
gulp.task("removeUnusedCSS-2", function () {
  return gulp
    .src("home2/**/*.css")
    .pipe(
      purgecss({
        content: ["home2/**/*.html"],
      })
    )
    .pipe(gulp.dest("home2/dist/"));
});

// Minify and concatenate CSS
gulp.task("minifyCSS-2", function () {
  return gulp
    .src([
      "home2/dist/src/css/bootstrap.css",
      "home2/dist/src/fonts/fonts.css",
      "home2/dist/src/fonts/fontawesome/css/all.css",
      "home2/dist/src/css/style.css",
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

// Rebuild
gulp.task(
  "rebuild-2",
  gulp.parallel("minifyJS-2", function (done) {
    gulp.series("removeUnusedCSS-2", "minifyCSS-2");
    done();
  })
);
