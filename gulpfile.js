/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @version 0.0.2
 */
'use strict';

const { src, dest, series } = require('gulp');
const rimraf = require('rimraf');

function clean(cb) {
    rimraf('build', cb);
};

function buildCore() {
    return src('js/plur/**/*.mjs')
    .pipe(dest('build/plur-core/js/plur/'));
};

function buildNodeJS() {
    return src('js/plur-nodejs/**/*.mjs')
    .pipe(dest('build/plur-nodejs/js/plur-nodejs/'));
};

function buildBrowser() {
    return src('js/plur-browser/**/*.mjs')
    .pipe(dest('build/plur-browser/js/plur-browser/'));
};

exports.clean = clean;
exports.build = series(clean,buildCore,buildNodeJS,buildBrowser);
