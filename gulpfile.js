var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var ejs = require('gulp-ejs');
var gutil = require('gulp-util');



gulp.task('ejs', function(){
  return gulp.src('./ejs/index.ejs')
   .pipe(ejs({}, {ext:'.html'}))
   .pipe(gulp.dest('./'))
});

// task for sass
gulp.task('styles', function () {
  gulp.src('./sass/main.sass').pipe(sass())
  // piping to autoprefixer
  .pipe(autoprefixer())
  .pipe(gulp.dest('./css'))
  //.pipe(browserSync.reload({stream: true}));
});

 //task for browser sync
gulp.task('serve',  function () {

   // without localsync just comment browserSync.init
    // browserSync.init({
    //    server: {
    //      baseDir: './'
    //    }
    //  });

  gulp.watch('./sass/**', ['styles']);
  gulp.watch('./ejs/**', ['ejs']);

});

// default task
gulp.task('default', ['styles', 'ejs', 'serve']);
