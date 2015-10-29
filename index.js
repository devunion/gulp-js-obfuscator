var through = require('through2');
var gutil = require('gulp-util');
var jsObfuscator = require('js-obfuscator');
var multimatch = require('multimatch');
var PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-js-obfuscator';

function shouldExclude(filePath, excludes) {
    for (var i = 0; i < excludes.length; i++) {
        if (multimatch(filePath, excludes[i]).length > 0) {
            return true;
        }
    }

    return false;
}

// Plugin level function(dealing with files)
function gulpJsObfuscator(options, excludes) {
    excludes = typeof excludes === 'string' ? [excludes] : excludes || [];

    // Creating a stream through which each file will pass
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            return cb(null, file);
        }

        if (shouldExclude(file.relative, excludes)) {
            cb(null, file);
        } else {
            if (file.isBuffer()) {
                jsObfuscator(String(file.contents), options).then(function (result) {
                    file.contents = new Buffer(result);
                    cb(null, file);
                }).catch(function (err) {
                    throw new PluginError(PLUGIN_NAME, err);
                });
            } else if (file.isStream()) {
                throw new PluginError(PLUGIN_NAME, 'Streams are not supported!');
            }
        }
    });
}

// Exporting the plugin main function
module.exports = gulpJsObfuscator;