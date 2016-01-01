[![Dependency Status](https://gemnasium.com/cstuncsik/gulp-json-minify.svg)](https://gemnasium.com/cstuncsik/gulp-json-minify)

# Gulp wrapper for [node-json-minify](https://www.npmjs.com/package/node-json-minify)

## Install

```sh
$ npm i -S gulp-json-minify
```

## Usage

```js
import config from '../config.js';
import gulp from 'gulp';
import util from 'gulp-util';
import jsonMinify from 'gulp-json-minify';

gulp.task('data:prod', () => {
    return gulp.src(config.paths.src.data)
        .pipe(jsonMinify())
        .pipe(gulp.dest(config.paths.builds.prod.data))
        .on('error', util.log);
});
```

## License

Copyright © 2014 Csaba Tuncsik <csaba.tuncsik@gmail.com>

This work is free. You can redistribute it and/or modify it under the
terms of the Do What The Fuck You Want To Public License, Version 2,
as published by Sam Hocevar. See [WTFPL](http://www.wtfpl.net) ![WTFPL icon](http://i.imgur.com/AsWaQQl.png) for more details.
