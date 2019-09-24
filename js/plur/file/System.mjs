/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/file/System
 */
'use strict';

import PlurObject from "../../plur/PlurObject.mjs";
import IFileSystem from "../../plur/file/ISystem.mjs";

/**
 * A simple abstract base class for all file systems, both local and remote.
 *
 * @abstract
 */
export default class FileSystem {
    constructor(pathSeparator, realHomePath) {
        this.pathSeparator = pathSeparator;

        this._homePath = realHomePath;
        this._configPath = this.joinPaths(realHomePath, FileSystem.DirNames.config);
        this._binPath = this.joinPaths(realHomePath, FileSystem.DirNames.bin);
    }
};

PlurObject.plurify('plur/file/System', FileSystem, [IFileSystem]);

FileSystem.DirNames = {
    bin: 'bin',
    config: 'config'
};

FileSystem._local = null;

FileSystem.local = function() {
    return FileSystem._local;
};

FileSystem.initLocal = function(localFileSystem) {
    FileSystem._local = localFileSystem;
};

/**
 * Combines the provided paths together into one path.
 *
 * @function plur/file/System.prototype.joinPaths
 * @abstract
 * @param ... string[] paths
 * @returns string
 */
FileSystem.prototype.joinPaths = function(/* ... */) {
    const pathSeparator = this.pathSeparator;
    let path = arguments[0]; // base path

    for (let i = 1; i < arguments.length; ++i) {
        // any absolute path is automatically accepted (other than the base path)
        if (arguments[i].charAt(0) === pathSeparator) {
            // throw an error if there are more paths after this one as that's unexpected
            if (i+1 !== arguments.length) {
                throw Error('Unexpected absolute path in list of arguments.')
            }

            path += pathSeparator + arguments[i];
        }
    }

    return path;
};

/**
 * Retrieves the home path for thie Plur software, appending all provided paths.
 *
 * @param ... string[] paths
 * @returns string
 */
FileSystem.prototype.getHomePath = function (/* ... */) {
    if (arguments.length === 0) {
        return this._homePath;
    }

	return this.joinPaths.apply(this, ([this._homePath].concat(arguments)));
};

/**
 * Retrieves the config path for this node instance, appending all provided paths.
 *
 * @param ... string[] paths
 * @returns string
 */
FileSystem.prototype.getConfigPath = function(/* ... */) {
	return this.joinPaths.apply(this, [this._configPath].concat(arguments));
};

/**
 * Retrieves the bin path for the Plur software appending all provided paths.
 *
 * @param ... string[] paths
 * @returns string
 */
FileSystem.prototype.getBinPath = function(/* ... */) {
	return this.joinPaths.apply(this, [this._binPath].concat(arguments));
};

