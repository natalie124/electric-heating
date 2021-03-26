  'use strict';

var gulp = require('gulp');
var del = require('del');
var newer = require('gulp-newer');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var mozjpeg = require('imagemin-mozjpeg');
var svgstore = require('gulp-svgstore');
var webp = require('gulp-webp');

var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
// var objectFit = require('postcss-object-fit-images');
var minify = require('gulp-csso');

var uglify = require('gulp-uglify');

var pug = require('gulp-pug');
var prettier = require('gulp-pretty-html');

var server = require('browser-sync').create();

gulp.task('clean', function() {
  return del('build');
});

gulp.task('copy', function() {
  return gulp.src([
      'src/fonts/*',
      'src/files/*',
      'src/images/**/*',
      'src/js/vendor/*.js',
      'src/js/plugins/*.js',
      'src/css/vendor/*.css',
      'src/css/plugins/*.css',
    ], {
      base: 'src'
    })
    .pipe(gulp.dest('build'));
});

gulp.task('images', function() {
  return gulp.src([
      'src/images/**/*',
      '!src/images/sprite/*.svg'
    ])
    .pipe(newer('build/images'))
    .pipe(imagemin([
      pngquant({
        speed: 1,
        quality: [0.7, 0.9]
      }),
      imagemin.optipng({
        optimizationLevel: 7
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      mozjpeg({
        quality: 90
      }),
      imagemin.svgo({
        plugins: [{
          removeViewBox: false
        }]
      })
    ]))
    .pipe(gulp.dest('build/images'));
});

gulp.task('webp', function() {
  return gulp.src('build/images/**/*.{png,jpg}')
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest('build/images/webp'));
});

gulp.task('sprite', function() {
  return gulp.src('src/images/sprite/*.svg')
    .pipe(newer('build/images'))
    .pipe(imagemin([
      imagemin.svgo({
        plugins: [{
          removeViewBox: false
        }]
      })
    ]))
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/images'));
});

gulp.task('style', function() {
  return gulp.src('src/sass/style.scss')
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(postcss([
      autoprefixer(),
      // objectFit()
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('scripts', function() {
  return gulp.src([
      'src/js/global/**/*.js',
      'src/components/**/*.js'
    ])
    .pipe(plumber())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('build/js'))
    //.pipe(uglify())
    //.pipe(rename({
    //  suffix: '.min'
    //}))
    .pipe(gulp.dest('build/js'));
});

gulp.task('html', function() {
  return gulp.src('src/*.pug')
    .pipe(plumber())
    .pipe(pug())
    .pipe(prettier({
      indent_size: 2,
      indent_char: ' '
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('refresh', function(done) {
  server.reload();
  done();
});

gulp.task('build', gulp.series(
  'clean',
  'copy',
  'webp',
  'sprite',
  'style',
  'scripts',
  'html'
));

gulp.task('build:minify', gulp.series(
  'clean',
  'copy',
  'images',
  'webp',
  'sprite',
  'style',
  'scripts',
  'html'
));

gulp.task('serve', function() {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('src/**/*.{png,jpg,svg}', gulp.series('images', 'sprite', 'refresh'));
  gulp.watch('src/**/*.scss', gulp.series('style'));
  gulp.watch('src/**/*.js', gulp.series('scripts', 'refresh'));
  gulp.watch('src/**/*.pug', gulp.series('html', 'refresh'));
});

gulp.task('start', gulp.series('build', 'serve'));
