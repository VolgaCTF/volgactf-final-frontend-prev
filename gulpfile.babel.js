import gulp from 'gulp'
import del from 'del'
import browserify from 'browserify'
import babelify from 'babelify'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import gulpIf from 'gulp-if'
import uglify from 'gulp-uglify'
import minifyHTML from 'gulp-minify-html'
import minifyCSS from 'gulp-minify-css'
import concat from 'gulp-concat'
import mustache from 'gulp-mustache'
import Customize from './customize'

var paths = {
  html: [
    'src/index.html'
  ],
  scripts: [
    'src/scripts/main.jsx'
  ],
  styles: [
    'node_modules/normalize.css/normalize.css',
    'src/styles/app.css'
  ],
  images: [
  ]
}

if (Customize.contestLogo && Customize.contestLogo.src) {
  paths.images.push(Customize.contestLogo.src)
}

if (Customize.contestNotifyLogo && Customize.contestNotifyLogo.src) {
  paths.images.push(Customize.contestNotifyLogo.src)
}

if (Customize.extraImages) {
  Array.prototype.push.apply(paths.images, Customize.extraImages)
}

function isProduction () {
  return process.env['NODE_ENV'] === 'production'
}

gulp.task('clean_html', function () {
  return del(['build/html/*.html'])
})

gulp.task('html', gulp.series('clean_html', function () {
  return gulp.src(paths.html)
  .pipe(mustache({title: Customize.contestTitle}))
  .pipe(gulpIf(isProduction, minifyHTML()))
  .pipe(gulp.dest('build/html'))
}))

gulp.task('clean_scripts', function () {
  return del(['build/assets/js/*.js'])
})

gulp.task('scripts', gulp.series('clean_scripts', function () {
  return browserify({
    entries: paths.scripts,
    extensions: ['.jsx'],
    debug: !isProduction()
  })
  .transform(babelify)
  .bundle()
  .pipe(source('app.js'))
  .pipe(buffer())
  .pipe(gulpIf(isProduction, uglify()))
  .pipe(gulp.dest('build/assets/js'))
}))

gulp.task('clean_styles', function () {
  return del(['build/assets/css/*.css'])
})

gulp.task('styles', gulp.series('clean_styles', function () {
  return gulp.src(paths.styles)
  .pipe(concat('app.css'))
  .pipe(gulpIf(isProduction, minifyCSS()))
  .pipe(gulp.dest('build/assets/css'))
}))

gulp.task('clean_images', function () {
  return del(['build/assets/images/*'])
})

gulp.task('images', gulp.series('clean_images', function (done) {
  if (paths.images.length === 0) {
    done()
    return
  }
  return gulp
  .src(paths.images)
  .pipe(gulp.dest('build/assets/images'))
}))

gulp.task('default', gulp.series('html', 'scripts', 'styles', 'images', function (done) {
  done()
}))
