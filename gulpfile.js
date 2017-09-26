// gulp modules
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var ejs = require('gulp-ejs');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');

// path to source directory
var sourcePATH = './source/';

// minify JS + create sourcemap
gulp.task('js', function() {
  gulp.src(sourcePATH + 'js/*.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'));
});

// create CSS from SASS + minify CSS + create sourcemap
gulp.task('css', function() {
  gulp.src(sourcePATH + 'sass/main.sass')
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(cleanCSS())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('dist/css'));

  gulp.src(sourcePATH + 'css/*.css')
      .pipe(sourcemaps.init())
      .pipe(cleanCSS())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('dist/css'));
})

// create HTML from EJS
gulp.task('ejs', function(){
  gulp.src(sourcePATH + '/ejs/index.ejs')
   .pipe(ejs({}, {ext:'.html'}))
   .pipe(gulp.dest('./'))
});

//task for browser sync
gulp.task('serve',  function () {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch(sourcePATH + 'sass/**', ['css']);
  gulp.watch(sourcePATH + 'ejs/**', ['ejs']);
  gulp.watch(sourcePATH + 'js/*.js', ['js']);

});

// default task
gulp.task('default', ['css','js', 'ejs', 'serve']);
