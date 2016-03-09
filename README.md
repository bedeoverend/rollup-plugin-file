# rollup-plugin-file

Basic rollup plugin to read a file (or vinyl) as an entry, rather than a string. Mainly for use with [gulp-process-inline](https://github.com/simplaio/gulp-process-inline)

## Installation
```bash
npm install rollup-plugin-file
```

## Usage

The entry file must have the `base` property. Any imports in the entry file will be looked for relative to the `base` filepath.

The below is a gulp example, however it can be used with any file as long as it has the `base` property.

```js
import rollupFile from 'rollup-plugin-file';
import rollup from 'rollup';
import gulp from 'vinyl';

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
