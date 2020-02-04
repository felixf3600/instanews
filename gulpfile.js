const gulp = require("gulp"); // Load Gulp!
// Now that we've installed the terser package we can require it:
const terser = require("gulp-terser"),
  rename = require("gulp-rename"),
  browserSync = require("browser-Sync").create(),
  eslint = require("gulp-eslint");

gulp.task("scripts", function() {
  return gulp
    .src("./js/*.js") // What files do we want gulp to consume?
    .pipe(terser()) // Call the terser function on these files
    .pipe(rename({ extname: ".min.js" })) // Rename the uglified file
    .pipe(gulp.dest("./build/js")); // Where do we put the result?
});

gulp.task("eslint", function() {
  return (
    gulp
      .src(["./js/*.js"])
      // eslint() attaches the lint output to the 'eslint' property
      // of the file object so it can be used by other modules.
      .pipe(eslint())
      // eslint.format() outputs the lint results to the console.
      // Alternatively use eslint.formatEach() (see Docs).
      .pipe(eslint.format())
      // To have the process exit with an error code (1) on
      // lint error, return the stream and pipe to failAfterError last.
      .pipe(eslint.failAfterError())
  );
});

gulp.task("watch", function() {
  gulp.watch("./js/*.js", gulp.series("scripts", "reload"));
  gulp.watch("./css/*.css", gulp.series("reload"));
  gulp.watch("./*.html", gulp.series("reload"));
});

gulp.task("browser-sync", function() {
  browserSync.init({
    server: { baseDir: "./" }
  });
});

gulp.task("reload", function(done) {
  browserSync.reload();
  done();
});

gulp.task("default", gulp.parallel("scripts", "watch", "browser-sync"));
