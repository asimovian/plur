/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/log/System
 */
'use strict';

import PlurObject from '../../plur/PlurObject.mjs';
import Log from '../../plur/log/Log.mjs';

/**
 * Log singleton
 *
 */
export default class SystemLog extends Log {
    constructor() {
        super(new Log());

        // add listeners that output to console
        const emitter = this.object.emitter();

        emitter.on('info', function (event) {
            const data = event.getData();
            if (typeof data.logEntry.data !== 'undefined')
                console.info(data.logEntry.message, data.logEntry.data);
            else
                console.info(data.logEntry.message);
        });

        emitter.on('error', function (event) {
            const data = event.getData();
            if (typeof data.logEntry.data !== 'undefined')
                console.error(data.logEntry.message, data.logEntry.data);
            else
                console.error(data.logEntry.message);
        });
    };
}

PlurObject.plurify('plur/log/System', SystemLog);
