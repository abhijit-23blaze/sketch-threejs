const gulp = require('gulp');
const requireDir = require('require-dir');
var deploy      = require('gulp-gh-pages');

const $ = require('./gulp/plugins');

requireDir('./gulp/tasks');

gulp.task('default', gulp.series(
  'cleanDest',
  gulp.parallel('pug', 'sass', 'scripts', 'copyToDest'),
  gulp.parallel('serve', 'watch'),
));

gulp.task('build', gulp.series(
  'cleanDest',
  gulp.parallel('pug', 'sass', 'copyToDest'),
  'cleanBuild',
  'replaceHtml',
  'cleanCss',
  'scripts',
  'imagemin',
  'copyToBuild',
));

gulp.task('deploy', function () {
  return gulp.src("./dist/**/*")
    .pipe(deploy())
});
