const gulp = require('gulp');
const through2 = require('through2');
const chai = require('chai');
const Vinyl = require('vinyl');
const fs = require('fs');
const path = require('path');
const jsonMinify = require('../');
require('./gulpfile');

const paths = {
  json: path.join(__dirname, 'fixtures')
};
const expect = chai.expect;

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
      expect(file.isBuffer()).to.be.true;
      expect(String(file.contents)).to.equal(fs.readFileSync(path.join(__dirname, 'expect/data.json'), 'utf8'));
      done();
    });

    stream.write(jsonFile);
  });

  it('should minify json from stream', done => {

    const jsonFile = createFile(paths.json, 'data.json', 'stream');
    const stream = jsonMinify();

    stream.once('data', file => {
      expect(file.isStream()).to.be.true;
      file.contents.pipe(through2.obj((data, enc, cb) => {
        expect(String(data)).to.equal(fs.readFileSync(path.join(__dirname, 'expect/data.json'), 'utf8'));
        cb(null, data);
        done();
      }));
    });

    stream.write(jsonFile);
  });

  it('should minify json through a gulp task', done => {
    gulp.task('minifyJson')()
    .on('end', () => {
      fs.readFile(path.join(__dirname, 'result/data.json'), 'utf8', (err, data) => {
        if (err) return done(err);
        expect(data).to.equal(fs.readFileSync(path.join(__dirname, 'expect/data.json'), 'utf8'));
        done();
      });
    });
  });
});
