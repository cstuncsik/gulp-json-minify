[![Build Status](https://travis-ci.org/cstuncsik/gulp-json-minify.svg?branch=master)](https://travis-ci.org/cstuncsik/gulp-json-minify)
[![npm version](https://badge.fury.io/js/gulp-json-minify.svg)](https://badge.fury.io/js/gulp-json-minify)
[![Dependency Status](https://www.versioneye.com/user/projects/5686a933eb4f47003c000e99/badge.svg?style=flat)](https://www.versioneye.com/user/projects/5686a933eb4f47003c000e99)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/cstuncsik/gulp-json-minify/master/LICENSE)

# gulp-json-minify

## gulp wrapper for [node-json-minify](https://www.npmjs.com/package/node-json-minify)

### Install

```sh
$ npm i -S gulp-json-minify
```

### Usage

```js
var gulp = require('gulp'),
    util = require('gulp-util'),
    jsonMinify = require('gulp-json-minify');

gulp.task('json:minify', function() {
    return gulp.src('src/data/spritesheet/*.json')
        .pipe(jsonMinify())
        .pipe(gulp.dest('build/production'))
        .on('error', util.log);
});
```
