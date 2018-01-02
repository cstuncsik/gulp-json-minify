require('should');

const through2 = require('through2');
const Vinyl = require('vinyl');
const fs = require('fs');
const path = require('path');
const paths = {
  json: path.join(__dirname, 'fixtures')
};
const jsonMinify = require('../');

const createFile = (base, file, type) => {
  const filePath = path.join(base, file);

  return new Vinyl({
    cwd: __dirname,
    base: base,
    path: filePath,
    contents: (type === 'buffer') ? fs.readFileSync(filePath) : fs.createReadStream(filePath)
  });
};

describe('gulp-json-minify', () => {

  it('should minify json from buffer', done => {

    const jsonFile = createFile(paths.json, 'data.json', 'buffer');
    const stream = jsonMinify();

    stream.once('data', file => {
      file.isBuffer().should.be.true();
      String(file.contents).should.equal(fs.readFileSync(path.join(__dirname, 'expect/data.json'), 'utf8'));
      done();
    });

    stream.write(jsonFile);
  });

  it('should minify json from stream', done => {

    const jsonFile = createFile(paths.json, 'data.json', 'stream');
    const stream = jsonMinify();

    stream.once('data', file => {
      file.isStream().should.be.true();
      file.contents.pipe(through2.obj((data, enc, cb) => {
        String(data).should.equal(fs.readFileSync(path.join(__dirname, 'expect/data.json'), 'utf8'));
        cb(null, data);
        done();
      }));
    });

    stream.write(jsonFile);
  });
});
