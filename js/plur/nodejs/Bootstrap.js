/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/nodejs/Bootstrap
 */
'use strict';

import PlurObject from "../../plur/PlurObject";
import API from "../../plur/api/API";
import Bootstrap from "../../plur/api/Bootstrap";
import FileSystem from "../../plur/file/System";
import NodeJsFileSystem from "../../plur/nodejs/file/System";

/**
 * Initializes plur API for use with NodeJS.
 *
 * @implements {IPlurified}
 */
class NodeJsBootstrap extends Bootstrap {
    constructor() {
        super();
        this.setPlatformType(API.PlatformType.NodeJS)
    };

    boot() {
        super.boot();

        // initialize the local file system api
        FileSystem.initLocal(new NodeJsFileSystem());
    };
};

PlurObject.plurify('plur/nodejs/Bootstrap', NodeJsBootstrap, Bootstrap);

export default NodeJsBootstrap;
