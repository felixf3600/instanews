const gulp = require("gulp"), // Load Gulp!
  // Now that we've installed the terser package we can require it:
  terser = require("gulp-terser"), //to uglify the code
  rename = require("gulp-rename"), // to rename
  browserSync = require("browser-Sync").create(), //syncs the files to the browser
  eslint = require("gulp-eslint"), // chescks for lynt warnings and errors
  sass = require("gulp-sass"), // sass compiler
  autoPrefixer = require("gulp-autoprefixer"), //older version support
  cssnano = require("gulp-cssnano"), //minify the css
  prettyError = require("gulp-prettyerror"), // looks for errors before compiling
  imagemin = require("gulp-imagemin"); //compresses images

gulp.task("image", function() {
  return gulp
    .src("./assets/images/*")
    .pipe(
      imagemin({
        interlaced: true,
        progressive: true,
        optimizationLevel: 5,
        svgoPlugins: [
          {
            removeViewBox: true
          }
        ]
      })
    )
    .pipe(gulp.dest("./build/images"));
});

gulp.task("sass", function() {
  return gulp
    .src("./sass/style.scss") // source path
    .pipe(prettyError()) // ADD THIS LINE
    .pipe(sass()) //runs compiler
    .pipe(autoPrefixer({})) //support for older versions
    .pipe(cssnano()) //minify the code
    .pipe(rename("style.min.css")) //renames the file
    .pipe(gulp.dest("./build/css")); //destination folder
});

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
  gulp.watch("./sass/*.scss", gulp.series("sass", "reload"));
  // gulp.watch("./css/*.css", gulp.series("reload")); not needed with the scss
  gulp.watch("./*.html", gulp.series("reload"));
  gulp.watch("./assets/images/*", gulp.series("reload"));
}); //watches the files for changes

gulp.task("browser-sync", function() {
  browserSync.init({
    server: { baseDir: "./" }
  });
}); //syncs with browser

gulp.task("reload", function(done) {
  browserSync.reload();
  done();
}); // reload function

gulp.task(
  "default",
  gulp.parallel("sass", "image", "scripts", "watch", "browser-sync")
);
