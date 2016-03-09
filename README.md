# Rollup Plugin File
[![][npm-badge]][npm-url] [![][travis-badge]][travis-url] [![][npmdeps-badge]][npmdeps-url] [![][npmdevdeps-badge]][npmdevdeps-url]


Rollup plugin to read a file (or vinyl) as an entry, rather than a string.

## Installation
```shell
npm install --save-dev rollup-plugin-file
```

## Usage
The entry file must have the `base` property. Any imports in the entry file will be looked for relative to the `base` filepath.

The below is a [Gulp][gulp] example, however it can be used with any file as long as it has the `base` property.

```js
import rollupFile from 'rollup-plugin-file';
import rollup from 'rollup';
import gulp from 'gulp';

gulp.task('rollup', function() {
  return gulp.src('./src/*.js')
    .pipe(through(function(file, enc, done) {
      rollup({
        entry: file,
        plugins: [ rollupFile() ]
      })
      .then(function(bundle) {
        file.contents = new Buffer(bundle.generate(options).code);
        done(null, file);
      })
      .catch(function(err) {
        done(err);
      });
    }))
    .pipe(gulp.dest('./dist'));
});
```

Use [`gulp-rollup-file`][gulp-rollup-file]
instead of this directly for Gulp, and use alongside [`gulp-process-inline`][gulp-process-inline] to use Rollup with inline `<script>` blocks in HTML.

## License

MIT © [Simpla](https://simpla.io)


[npm-badge]: https://img.shields.io/npm/v/rollup-plugin-file.svg
[npm-url]: https://npmjs.org/package/rollup-plugin-file
[travis-badge]: https://img.shields.io/travis/simplaio/rollup-plugin-file.svg
[travis-url]: https://travis-ci.org/simplaio/rollup-plugin-file
[npmdeps-badge]: https://img.shields.io/david/simplaio/rollup-plugin-file.svg
[npmdeps-url]: https://david-dm.org/simplaio/rollup-plugin-file
[npmdevdeps-badge]: https://img.shields.io/david/dev/simplaio/rollup-plugin-file.svg?theme=shields.io
[npmdevdeps-url]: https://david-dm.org/simplaio/rollup-plugin-file#info=devDependencies
[gulp]: http://gulpjs.com/
[gulp-rollup-file]: https://github.com/simplaio/gulp-rollup-file
[gulp-process-inline]: https://github.com/simplaio/gulp-process-inline
