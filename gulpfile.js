var gulp = require("gulp");
var sass = require("gulp-sass");
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var usemin = require('gulp-usemin');
var htmlmin = require('gulp-htmlmin');
var cssnano = require('gulp-cssnano');
var useref = require('gulp-useref');
var eslint = require('gulp-eslint');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var runSequence = require('run-sequence');
var del = require('del');
var lazypipe = require('lazypipe');
var browserSync = require("browser-sync").create();

var paths = {
  baseDir: './src',
  html: './src/*.html',
  scripts: './src/js/*.js',
  css: './src/css/*.css',
  scss: './src/scss/*.scss',
  dist: './dist',
  distjs: './dist/js',
  distcss: './dist/css',
};

var supported = [
    'last 2 versions',
    'safari >= 8',
    'ie >= 10',
    'ff >= 20',
    'ios 6',
    'android 4'
];

var jstasks = lazypipe()
  .pipe(sourcemaps.init)
  .pipe(eslint)
  .pipe(eslint.format) 
  .pipe(babel)
  .pipe(uglify)
  .pipe(sourcemaps.write);

gulp.task('lint', function() {
  return gulp.src(paths.scripts)
  .pipe(eslint())
  .pipe(eslint.format()) 
});

gulp.task('babel', function() {
  return gulp.src(paths.scripts)
    .pipe(babel())
});

gulp.task('clean:dist', function() {
  return del([paths.dist]).then(function(paths) {
    console.log('Deleted files and folders:\n', paths.join('\n'));
  });
});

gulp.task('scss', function(){
  gulp.src(paths.scss)
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('src/css'))
  .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('usemin', function() {
  return gulp.src(paths.html)
    .pipe(usemin({
      css: [cssnano({
        autoprefixer: {browsers: supported, add: true}
      })],
      js: [jstasks()]
    }))
    .pipe(gulp.dest(paths.dist))
});

gulp.task('build', function (callback) {
  runSequence('clean:dist', 
    ['scss', 'usemin'],
    callback
  )
})

gulp.task('serve', ['scss'], function() {
    browserSync.init({
    server: {
      baseDir: paths.src
    },
  });

  gulp.watch(paths.scripts, ['lint', 'babel', browserSync.reload]);
  gulp.watch(paths.html, browserSync.reload)
  gulp.watch(paths.scss, ['scss']);
});
