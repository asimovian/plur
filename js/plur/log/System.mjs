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

        emitter.on('info', function (event) {
            const infoFunc = ( typeof console.info === 'undefined' ? console.log : console.info );
            const data = event.data();
            if (typeof data.logEntry.data !== 'undefined') {
                infoFunc(data.logEntry.message, data.logEntry.data);
            } else {
                infoFunc(data.logEntry.message);
            }
        });

        emitter.on('warn', function (event) {
            const data = event.data();
            const warnFunc = ( typeof console.warn === 'undefined' ? console.log : console.warn );
            if (typeof data.logEntry.data !== 'undefined') {
                warnFunc(data.logEntry.message, data.logEntry.data);
            } else {
                warnFunc(data.logEntry.message);
            }
        });

        emitter.on('error', function (event) {
            const data = event.data();
            const errorFunc = ( typeof console.info === 'undefined' ? console.log : console.error );
            if (typeof data.logEntry.data !== 'undefined') {
                errorFunc(data.logEntry.message, data.logEntry.data);
            } else {
                errorFunc(data.logEntry.message);
            }
        });
    };
}

PlurObject.plurify('plur/log/System', SystemLog);

const singleton = new SystemLog();
export {singleton};
