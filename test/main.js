(function() {

    'use strict';

    require('should');

    var gutil = require('gulp-util'),
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

    it('should minify json from buffer', function(cb) {

        var jsonFile = createFile(paths.json, 'data.json', 'buffer'),
            stream = jsonMinify(jsonFile);

        stream.once('data', function(file) {
            file.isBuffer().should.be.true();
            String(file.contents).should.equal(fs.readFileSync(path.join(__dirname, 'expect/data.json'), 'utf8'));
        });

        stream.write(jsonFile);
        stream.on('end', cb);
        stream.end();
    });

    it('should minify json from stream', function(cb) {

        var jsonFile = createFile(paths.json, 'data.json', 'stream'),
            stream = jsonMinify(jsonFile);

        stream.once('data', function(file) {
            file.isStream().should.be.true();
            String(file.contents.read()).should.equal(fs.readFileSync(path.join(__dirname, 'expect/data.json'), 'utf8'));
        });

        stream.write(jsonFile);
        stream.on('end', cb);
        stream.end();
    });
})();
