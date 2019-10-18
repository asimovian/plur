/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur-browser/api/Bootstrap
 */
'use strict';

import PlurClass from '../../plur/Class.mjs';
import API from '../../plur/api/API.mjs';
import Bootstrap from '../../plur/api/Bootstrap.mjs';
import BrowserFileSystem from '../../plur-browser/file/System.mjs';
import HttpFileSystem from '../../plur/http/file/System.mjs';
import { singleton as LocalFileSystem} from '../../plur/file/system/Local.mjs';
import { singleton as ApiFileSystem} from '../../plur/file/system/API.mjs';
import PLUR_MANIFEST from '../../plur/build/current/manifest.mjs'

/**
 * Initializes plur API for use with browser.
 *
 * @implements {IPlurified}
 */
export default class BrowserBootstrap extends Bootstrap {
    constructor() {
        super();

        this.setPlatformType(API.PlatformType.Browser)
    };

    boot() {
        super.boot();

        LocalFileSystem.set(new BrowserFileSystem());

        const virtualManifest = PLUR_MANIFEST.map(i => { return '/manifest/plur/js/' + i; });
        ApiFileSystem.set(new HttpFileSystem('/manifest', virtualManifest));
    };
}

PlurClass.plurify('plur-browser/api/Bootstrap', BrowserBootstrap);
