require('should');

const es = require('event-stream');
const gutil = require('gulp-util');
const fs = require('fs');
const path = require('path');
const paths = {
  json: path.join(__dirname, 'fixtures')
};
const jsonMinify = require('../');

const createFile = (base, file, type) => {
  const filePath = path.join(base, file);

  return new gutil.File({
    cwd: __dirname,
    base: base,
    path: filePath,
    contents: (type === 'buffer') ? fs.readFileSync(filePath) : fs.createReadStream(filePath)
  });
};

describe('gulp-json-minify', () => {

  it('should minify json from buffer', cb => {

    const jsonFile = createFile(paths.json, 'data.json', 'buffer');
    const stream = jsonMinify();

    stream.once('data', file => {
      file.isBuffer().should.be.true();
      String(file.contents).should.equal(fs.readFileSync(path.join(__dirname, 'expect/data.json'), 'utf8'));
      cb();
    });

    stream.write(jsonFile);
  });

  it('should minify json from stream', cb => {

    const jsonFile = createFile(paths.json, 'data.json', 'stream');
    const stream = jsonMinify();

    stream.once('data', file => {
      file.isStream().should.be.true();
      file.contents.pipe(es.wait((err, data) => {
        String(data).should.equal(fs.readFileSync(path.join(__dirname, 'expect/data.json'), 'utf8'));
        cb();
      }));
    });

    stream.write(jsonFile);
  });
});

