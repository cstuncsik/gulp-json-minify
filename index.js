const through2 = require('through2');
const jsonMinify = require('node-json-minify');

module.exports = () => through2.obj((file, enc, cb) => {
  try {
    if (file.isNull()) {
      return cb(null, file);
    }
    if (file.isBuffer()) {
      file.contents = Buffer.from(jsonMinify(file.contents.toString()));
    }
    if (file.isStream()) {
      file.contents = file.contents.pipe(through2.obj((json, enc, cb) => {
        cb(null, jsonMinify(json.toString()));
      }));
    }
    cb(null, file);
  } catch (error) {
    cb(error);
  }
});
