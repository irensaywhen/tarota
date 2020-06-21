const gulp = require("gulp");
const purgecss = require("gulp-purgecss");

gulp.task("removeUnusedCss", function () {
  return gulp
    .src("home/**/*.css")
    .pipe(
      purgecss({
        content: ["home/**/*.html"],
      })
    )
    .pipe(gulp.dest("home/dist/css"));
});
