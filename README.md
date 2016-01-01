[![Dependency Status](https://www.versioneye.com/user/projects/5686a933eb4f47003c000e99/badge.svg?style=flat)](https://www.versioneye.com/user/projects/5686a933eb4f47003c000e99)

# Gulp wrapper for [node-json-minify](https://www.npmjs.com/package/node-json-minify)

## Install

```sh
$ npm i -S gulp-json-minify
```

## Usage

```js
import gulp from 'gulp';
import util from 'gulp-util';
import jsonMinify from 'gulp-json-minify';

gulp.task('data:prod', () => {
    return gulp.src('src/data/spritesheet/*.json')
        .pipe(jsonMinify())
        .pipe(gulp.dest('build/production'))
        .on('error', util.log);
});
```

## License

Copyright © 2014 Csaba Tuncsik <csaba.tuncsik@gmail.com>

This work is free. You can redistribute it and/or modify it under the
terms of the Do What The Fuck You Want To Public License, Version 2,
as published by Sam Hocevar. See [WTFPL](http://www.wtfpl.net) ![WTFPL icon](http://i.imgur.com/AsWaQQl.png) for more details.
