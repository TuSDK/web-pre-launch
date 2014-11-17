var gulp = require('gulp')

var sass = require('gulp-sass')
  , minifyCSS = require('gulp-minify-css')
  , spritesmith = require('gulp.spritesmith')
  , livereload = require('gulp-livereload')
  , imagemin = require('gulp-imagemin')
  , pngquant = require('imagemin-pngquant')

// Images
gulp.task('img', function () {
  var sprite = gulp.src('assets/img/*.png')
    .pipe(spritesmith({
      imgName: 'sprite.png'
    , imgPath: '../img/sprite.png'
    , cssName: '_sprite.scss'
    , algorithm: 'binary-tree'
    }))
  sprite.img
    .pipe(imagemin({
      progressive: true
    , svgoPlugins: [{ removeViewBox: false }]
    , use: [pngquant()]
    }))
    .pipe(gulp.dest('static/img/'))
  sprite.css.pipe(gulp.dest('assets/scss/partials/'))
})

// Compile sass to css
gulp.task('css', function () {
  gulp.src('assets/scss/lasque.scss')
      .pipe(sass())
      .pipe(minifyCSS({ 'keepSpecialComments': 0 }))
      .pipe(gulp.dest('static/css'))
      .pipe(livereload())
})

// Rerun the task when a file changes
gulp.task('watch', function () {
  gulp.watch('assets/img/**/*', ['img'])
  gulp.watch('assets/scss/**/*', ['css'])
})

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['img', 'css', 'watch'])
