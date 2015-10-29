gulp-js-obfuscator
=============

Gulp plugin for [js-obfuscator](https://github.com/caiguanhao/js-obfuscator).

## Installation

Install the package with NPM and add it to your development dependencies:

`npm install --save-dev gulp-js-obfuscator`

## Usage

```javascript
var gulp = require('gulp'),
    js_obfuscator = require('gulp-js-obfuscator');

var path = {
    build: {
      js: 'out/',
    },
    src: {
      js: 'src/**/*.js',
    }
};

gulp.src(path.src.js)
    .pipe(js_obfuscator({}, ["**/jquery-*.js"]))
    .pipe(gulp.dest(path.build.js));
```

## Options

### obfuscatorOptions
Type: `Object` Default: `null`
Options for [js-obfuscator](https://github.com/caiguanhao/js-obfuscator). Should be passed exactly like described on their page.

### excludes
Type: `Array` or `String` Default: `[]`
Examples: `["**/jquery-*.js", "**/*.min.js"]` or `"**/jquery-*.js"`
Can be used to bypass obfuscation of some files.

