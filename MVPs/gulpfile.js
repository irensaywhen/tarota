const gulp = require("gulp");
const purgecss = require("gulp-purgecss");
const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat");

// Remove unused CSS
gulp.task("removeUnusedCSS", function () {
  return gulp
    .src("home/**/*.css")
    .pipe(
      purgecss({
        content: ["home/**/*.html"],
      })
    )
    .pipe(gulp.dest("home/dist/"));
});

// Minify and concatenate CSS
gulp.task("minifyCSS", function () {
  return gulp
    .src([
      "home/dist/css/bootstrap.css",
      "home/dist/css/fonts.css",
      "home/dist/fonts/fontawesome/css/all.css",
      "home/dist/css/mvp_style.css",
    ])
    .pipe(cleanCSS())
    .pipe(concat("style.min.css"))
    .pipe(gulp.dest("home/dist/css"));
});
