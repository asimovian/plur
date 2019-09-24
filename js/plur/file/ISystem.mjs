/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/file/ISystem
 */
'use strict';

import PlurObject from "../../plur/PlurObject.mjs";
import InterfaceError from "../../plur/error/Interface.mjs";

/**
 * The interface that all file system prototypes must provide.
 *
 * @interface
 */
export default class IFileSystem {
    constructor() {
        throw new InterfaceError(this);
    }
};

PlurObject.plurify('plur/file/ISystem', IFileSystem);

/**
 * Combines the provided paths together into one path.
 *
 * @type {function}
 * @abstract
 * @param ... string[] paths
 * @returns string
 */
IFileSystem.prototype.joinPaths = PlurObject.abstractMethod;

/**
 * Retrieves the home path for thie Plur software, appending all provided paths.
 *
 * @type {function}
 * @abstract
 * @param ... string[] paths
 * @returns string
 */
IFileSystem.prototype.getHomePath = PlurObject.abstractMethod;

/**
 * Retrieves the config path for this node instance, appending all provided paths.
 *
 * @type {function}
 * @abstract
 * @param ... string[] paths
 * @returns string
 */
IFileSystem.prototype.getConfigPath = PlurObject.abstractMethod;

/**
 * Retrieves the bin path for the Plur software appending all provided paths.
 *
 * @type {function}
 * @abstract
 * @param ... string[] paths
 * @returns string
 */
IFileSystem.prototype.getBinPath = PlurObject.abstractMethod;
