/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur-bin/test/App
 */
'use strict';

import PlurObject from "../../plur/PlurObject.mjs";
import API from "../../plur/api/API.mjs";
import IApplication from "../../plur/app/IApplication.mjs";
import ITerminal from "../../plur/terminal/ITerminal.mjs";
import Tester from "../../plur/test/Tester.mjs";
import { singleton as ApiFileSystem } from "../../plur/file/system/API.mjs";
import { singleton as SystemLog } from '../../plur/log/System.mjs';

/**
 * Performs tests against either a provided set of test classes / test methods or against all available tests.
 *
 * Searching involves globbing for JS files in each plur module (via RequireJS config 'paths').
 * Only modules with the word "test" in their name will be included.
 * Only JS files that end with "Test" will be targeted.
 *
 * @implements {IPlurified}
 */
export default class TestApp {
    /**
     * @param {!ITerminal} terminal
     */
    constructor(terminal) {
        this._terminal = terminal;
        this._targets = [];

        // load targets from the commandline, if available. searching will be performed by start() if necessary
        let parameters = terminal.getParameters();
        for (let i = 0; i < parameters.length; ++i) {
            this._targets.push(parameters[i]);
        }
    };
}

PlurObject.plurify('plur-bin/test/App', TestApp, [IApplication]);

TestApp.prototype._findTargets = function(callback) {
    const importPathMap = API.plur.getImportPathMap();
    const filesystem = ApiFileSystem.get();
    const homePath = filesystem.getHomePath();
    var targets = [];
    var numPathsGlobbed = 0;

    // create an array of potential test targets, skipping any paths that do not include the word "tests" in their name
    var pathNames = [];
    for (const key in importPathMap) {
        if (key.match(/tests/)) {
            pathNames.push(key);
        }
    }

    // pathNames.length will be used by the glob handler to identify when all operations have been completed
    for (var i = 0; i < pathNames.length; ++i) {
        var key = pathNames[i];
        var jsPath = homePath + '/' + importPathMap[key];

        // scope jsPath value into callback as it will change value on the next iteration
        filesystem.find(jsPath, /^(?:|.*\/)[a-z0-9_\-]+-tests\/.*[a-zA-Z0-9\-_]+Test\.mjs$/).then(function(filepaths) {
            for (let i = 0; i < filepaths.length; ++i) {
                const filepath = filepaths[i];
                // skip any files that do not end in "Test.js"
                if (!filesystem.basename(filepath).match(/^[a-zA-Z0-9_\-]+Test\.mjs$/)) {
                    continue;
                }

                // remove the module path root from the filepath, making it relative (like the namepath is)
                const relativeFilepath = filepath.substring(jsPath.length - filesystem.basename(jsPath).length);
                // remove the extension from the name to form a valid namepath
                const namepath = relativeFilepath.match(/^(.*)\.[^.]+$/)[1];
                targets.push(namepath);
            }

            // check if we've finished globbing every path yet, callback if we have
            if (++numPathsGlobbed === pathNames.length) {
                callback(targets);
            }
        });
    }
};

TestApp.prototype.start = function() {
    // if no targets were provided, find and test everything under the sun
    if (this._targets.length === 0) {
        var self = this;
        this._findTargets(function(targets) {
            self._targets = targets;
            var tester = new Tester(targets);
            self._start(tester);
        });
    } else {
        var tester = new Tester(this._targets);
        this._start(tester);
    }

    // initial message ... the blinkies
    SystemLog.get().info('(-(-_-(-_(-_(-_-)_-)-_-)_-)_-)-)');
};

TestApp.prototype._start = function(tester) {
    const self = this;
    let promise = tester.test(this._targets);
    promise.then(
        function() { TestApp._onTesterPromiseFulfilled(self); },
        function(error) { TestApp._onTesterPromiseRejected(self, error); } );
};

/**
 * Expects variable "self" to exist in calling closure.
 */
TestApp._onTesterPromiseFulfilled = function(self) {
    SystemLog.get().info('Tests passed.');
    self.stop(true);
};

/**
 * Expects variable "self" to exist in calling closure.
 */
TestApp._onTesterPromiseRejected = function(self, error) {
    SystemLog.get().error('Tests failed');
    SystemLog.get().error(error.stack)
    self.stop(false);
};

TestApp.prototype.stop = function(success) {
    if (false) {
        const plurified = PlurObject.getPlurified();
        //console.log('plurifed(): ', plurified.map(i => { return i.namepath; }));
        SystemLog.get().info('load time: ', plurified[plurified.length - 1].timestamp - plurified[0].timestamp + 'ms');
    }

    if (typeof process !== 'undefined') { // nodejs
        process.exit(success ? 0 : 1);
    }
};

TestApp.prototype.heartbeat = function() {
    return true;
};


