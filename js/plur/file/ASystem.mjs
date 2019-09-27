/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/file/ASystem
 */
'use strict';

import PlurObject from "../../plur/PlurObject.mjs";
import IFileSystem from "../../plur/file/ISystem.mjs";

/**
 * A simple abstract base class for all file systems, both local and remote.
 *
 * @abstract
 * @implements {IPlurified, IFileSystem}
 */
export default class AFileSystem {
    constructor(pathSeparator, realHomePath) {
        this.pathSeparator = pathSeparator;
        this._homePath = realHomePath;

        this._configPath = this.joinPaths(realHomePath, 'plur', AFileSystem.DirNames.config);
        this._binPath = this.joinPaths(realHomePath, 'plur', AFileSystem.DirNames.bin);
    };

    /**
     * @override
     * @param {string} path
     * @returns {string}
     */
    basename(path) {
        return path.replace(/.*\//, '');
    };

    /**
     * Combines the provided paths together into one path.
     *
     * @param {...string} path
     * @returns string
     */
    joinPaths(/* ... */) {
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
     * @param {...Array<string>} paths
     * @returns string
     */
    getHomePath(/* ... */) {
        if (arguments.length === 0) {
            return this._homePath;
        }

        return this.joinPaths.apply(this, ([this._homePath].concat(arguments)));
    };

    /**
     * Retrieves the config path for this node instance, appending all provided paths.
     *
     * @param {...Array<string>} paths
     * @returns string
     */
    getConfigPath(/* ... */) {
        return this.joinPaths.apply(this, [this._configPath].concat(arguments));
    };

    /**
     * Retrieves the bin path for the Plur software appending all provided paths.
     *
     * @param {...Array<string>} paths
     * @returns string
     */
    getBinPath(/* ... */) {
        return this.joinPaths.apply(this, [this._binPath].concat(arguments));
    };
};

PlurObject.plurify('plur/file/ASystem', AFileSystem, [ IFileSystem ]);

AFileSystem.DirNames = {
    bin: 'bin',
    config: 'config'
};

