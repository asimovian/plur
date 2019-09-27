/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/log/System
 */
'use strict';

import PlurObject from '../../plur/PlurObject.mjs';
import Singleton from '../../plur/design/singleton/ASingleton.mjs';
import Log from '../../plur/log/Log.mjs';

/**
 * Log singleton
 *
 */
export default class SystemLog extends Singleton {
    constructor() {
        super(new Log());

        // add listeners that output to console
        const emitter = this.get().emitter();

        const infoFunc = ( typeof console.info === 'undefined' ? console.log : console.info );
        const errorFunc = ( typeof console.info === 'undefined' ? console.log : console.error );

        emitter.on('info', function (event) {
            const data = event.data();
            if (typeof data.logEntry.data !== 'undefined') {
                infoFunc(data.logEntry.message, data.logEntry.data);
            } else {
                infoFunc(data.logEntry.message);
            }
        });

        emitter.on('error', function (event) {
            const data = event.data();
            if (typeof data.logEntry.data !== 'undefined') {
                errorFunc(data.logEntry.message, data.logEntry.data);
            } else {
                errorFunc(data.logEntry.message);
            }
        });

        // initial message ... the blinkies
        console.log('(-(-_-(-_(-_(-_-)_-)-_-)_-)_-)-)');
    };
}

PlurObject.plurify('plur/log/System', SystemLog);

const singleton = new SystemLog();
export {singleton};
