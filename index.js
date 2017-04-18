const es = require('event-stream');
const through2 = require('through2');
const jsonMinify = require('node-json-minify');

module.exports = () => through2.obj((file, enc, cb) => {
  if (file.isNull()) {
    return cb(null, file);
  }
  if (file.isBuffer()) {
    file.contents = new Buffer(jsonMinify(file.contents.toString()));
  }
  if (file.isStream()) {
    file.contents = file.contents.pipe(es.map((json, callback) => {
      callback(null, jsonMinify(json.toString()));
    }));
  }
  cb(null, file);
});
