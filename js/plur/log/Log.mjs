/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/log/Log
 */
'use strict';

import PlurClass from '../../plur/Class.mjs';
import Emitter from '../../plur/event/Emitter.mjs';

/**
 * A simple logging interface. Intended to be used a singleton. Loggers can attach to this object's emitter to
 * catch logging messages.
 *
 */
export default class Log {
	constructor() {
		this._emitter = new Emitter();
	}

	/**
	 * Logs a typical information message.
	 *
	 * @param {string} message
	 * @param {*=} data
	 */
	info(message, data) {
		this._emitter.emit('info', { logEntry: { type: 'info', message: message, data: data } });
	};

	/**
	 * Logs a debugging message with data.
	 *
	 * @param {string} message
	 * @param {*=} data
	 */
	debug(message, data) {
		this._emitter.emit('debug', { logEntry: { type: 'debug', message: message, data: data } });
	};

	/**
	 * Logs a warning message.
	 *
	 * @param {string} message
	 * @param {*=} data
	 */
	warn(message, data) {
		this._emitter.emit('warn', { logEntry: { type: 'warn', message: message, data: data }});
	};

	/**
	 * Logs an error message.
	 *
	 * @param {string} message
	 * @param {*=} data
	 */
	error(message, data) {
		this._emitter.emit('error', { logEntry: { type: 'error', message: message, data: data }});
	};

	/**
	 * Returns the log's emitter, which can be used to catch logging messages.
	 *
	 * @returns plur/event/Emitter
	 */
	emitter() {
		return this._emitter;
	};
};

PlurClass.plurify('plur/log/Log', Log);

