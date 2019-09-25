/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/browser/Bootstrap
 */
'use strict';

import PlurObject from "../../plur/PlurObject.mjs";
import API from "../../plur/api/API.mjs";
import Bootstrap from "../../plur/api/Bootstrap.mjs";

/**
 * Initializes plur API for use with browser.
 *
 * @implements {IPlurified}
 */
class BrowserBootstrap extends Bootstrap {
    constructor() {
        super();
        this.setPlatformType(API.PlatformType.Browser)
    };

    boot() {
        super.boot();
    };
}

PlurObject.plurify('plur/browser/Bootstrap', BrowserBootstrap, Bootstrap);
