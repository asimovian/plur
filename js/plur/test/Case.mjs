/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/test/TestCase
 */
'use strict';

import PlurClass from '../../plur/Class.mjs';
import Assert from '../../plur/test/Assert.mjs';
import Emitter from '../../plur/event/Emitter.mjs';

/**
 * Basic xUnit base class for unit, integration, and system tests.
 *
 * Any method that begins with 'test_' will be ran. Tests run sequentially, unless async is specified.
 *
 * The overridable setup() and teardown() methods are run before and after all tests have run, respectively.
 *
 * @abstract
 * @implements {IPlurified}
 */
export default class TestCase {
    constructor() {
        this._TOPIC = this.namepath + '.';
        this._RESULT_TOPIC = this.namepath + '.result';
        this._emitter = new Emitter();
        this.assert = new Assert();
    };

    /**
     * Initialize this test case.
     */
    setup() {};

    /**
     * Perform cleanup after the test case has been ran.
     */
    teardown() {};

    /**
     * Fires an event to the test case emitter.
     *
     * @param {String} subtopic
     * @param {obj} data
     */
    emit(subtopic, data) {
        this._emitter.emit(this._TOPIC + subtopic, data);
    };

    /**
     * Fires a test case result event to the emitter. Conforms to xUnit XML result format.
     *
     * @param {String} methodName The test method name.
     * @param {String} outcome 'Pass', 'Fail', 'Skip'
     * @Param {number} time Elapsed time in milliseconds.
     */
    emitResult(methodName, outcome, time) {
        // @todo this._emitter.emit(this._RESULT_TOPIC, new Result(methodName, outcome, time).model());
        this._emitter.emit(this._RESULT_TOPIC, {
           name: methodName.substr(5), // remove the prefixed test_
           type: this.namepath,
           method: methodName,
           time: time,
           result: outcome
        });
    };
};

PlurClass.plurify('plur/test/Case', TestCase);

