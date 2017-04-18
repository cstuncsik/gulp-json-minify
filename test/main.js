(function () {

  'use strict';

  require('should');

  var es = require('event-stream'),
    gutil = require('gulp-util'),
    fs = require('fs'),
    path = require('path'),
    paths = {
      json: path.join(__dirname, 'fixtures')
    },
    jsonMinify = require('../');

  function createFile(base, file, type) {
    var filePath = path.join(base, file);

    return new gutil.File({
      cwd: __dirname,
      base: base,
      path: filePath,
      contents: (type === 'buffer') ? fs.readFileSync(filePath) : fs.createReadStream(filePath)
    });
  }

  it('should minify json from buffer', function (cb) {

    var jsonFile = createFile(paths.json, 'data.json', 'buffer'),
      stream = jsonMinify();

    stream.once('data', function (file) {
      file.isBuffer().should.be.true();
      String(file.contents).should.equal(fs.readFileSync(path.join(__dirname, 'expect/data.json'), 'utf8'));
      cb();
    });

    stream.write(jsonFile);
  });

  it('should minify json from stream', function (cb) {

    var jsonFile = createFile(paths.json, 'data.json', 'stream'),
      stream = jsonMinify();

    stream.once('data', function (file) {
      file.isStream().should.be.true();
      file.contents.pipe(es.wait(function(err, data) {
        String(data).should.equal(fs.readFileSync(path.join(__dirname, 'expect/data.json'), 'utf8'));
        cb();
      }));
    });

    stream.write(jsonFile);
  });
})();
