module.exports = (function () {

  'use strict';

  var es = require('event-stream'),
    through2 = require('through2'),
    jsonMinify = require('node-json-minify');

  return function () {
    return through2.obj(function (file, enc, cb) {

      if (file.isNull()) {
        return cb(null, file);
      }
      if (file.isBuffer()) {
        file.contents = new Buffer(jsonMinify(file.contents.toString()));
      }
      if (file.isStream()) {
        file.contents = file.contents.pipe(es.map(function(json, callback){
          callback(null, jsonMinify(json.toString()));
        }));
      }
      cb(null, file);
    });
  };
})();
