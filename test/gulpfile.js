const path = require('path');
const gulp = require('gulp');
const jsonMinify = require('../');

gulp.task('minifyJson', () => gulp.src(path.join(__dirname, 'fixtures/data.json'))
  .pipe(jsonMinify())
  .pipe(gulp.dest(path.join(__dirname, 'result')))
);
