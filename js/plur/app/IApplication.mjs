/**
 * @copyright 2019 Asmov LLC
 * @license MIT https://github.com/asmov/plur/blob/master/LICENSE.txt
 * @module plur/app/IApplication
 */
'use strict';

import PlurClass from "../../plur/Class.mjs";
import InterfaceError from "../../plur/error/Interface.mjs";

/**
 * Basic interface for all applications (shell, browser, etc.). Simple start / stop / status interface.
 *
 * Applications, by design, should be extremely basic -- simply a driver for starting/stopping the local Plur Node and
 * for starting the Application's main Service. The main Service class should perform all real setup, teardown, and
 * logic.
 *
 * @interface
 * @implements {IPlurified}
 */
export default class IApplication {
    constructor() {
        throw new InterfaceError(this);
    };
}

PlurClass.plurify('plur/app/IApplication', IApplication);

/**
 * Bitwise status flags for use with IApplication.prototype.status().
 * Services may provide more flags not including those reserved here (0x00 thru 0x18).
 *
 * Combining different flags signal different events. E.g.;
 *   OFFLINE | PAUSED | STOPPED => Service was paused before it was stopped.
 *   ONLINE | INIT | PAUSED => Service was paused during INIT
 *   OFFLINE | INIT | ERROR => Service crashed during INIT
 */
IApplication.Status = {
    OFFLINE:        0x00,
    ONLINE:         0x01,
    INIT:           0x02,
    RUNNING:        0x04, // cannot be OFFLINE, INIT, PAUSED, STOPPED
    PAUSED:         0x08, // cannot be INIT, RUNNING, STOPPED
    STOPPED:        0x10, // cannot be ONLINE, RUNNING, PAUSED
    WARNING:        0x12,
    ERROR:          0x14, // cannot be ONLINE
    //RESERVED:     0x18 through 0x28
};

/**
 * Starts the plur node, registers and starts the application's main service.
 *
 * @type {Function}
 * @abstract
 * @returns {Promise}
 */
IApplication.prototype.start = PlurClass.abstractMethod;

/**
 * Stops the application, performing any cleanup necessary.
 *
 * @type {Function}
 * @abstract
 * @returns {Promise}
 */
IApplication.prototype.stop = PlurClass.abstractMethod;


