/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/test/Assert
 */
'use strict';

import PlurClass from '../../plur/Class.mjs';
import AssertionError from "js/plur/error/Assertion.mjs";

/**
 * Performs assertions for test cases.
 *
 * @implements {IPlurified}
 * @final
 */
export default class Assert {
    /**
     * @param {Function} callback
     * @param {string} message
     * @throws {AssertionError}
     */
    tried(callback, message) {
        try {
            return callback();
        } catch (e) {
            throw new AssertionError(message, e);
        }
    };

    /**
     * @param callback
     * @param message
     * @throws {AssertionError}
     */
    caught(callback, message) {
        try {
            callback();
            throw new AssertionError(message);
        } catch (e) {
            return;
        }
    };

    /**
     * Determines whether a value is strictly equal.
     */
   test(test, message) {
        if (!test)
            throw new AssertionError(message || 'Assertion failed', { result: test});
    };

    /**
     * Determines whether a value is strictly equal.
     */
    equals(actual, expected, message) {
        if (actual !== expected)
            throw new AssertionError(message || 'Values are not strictly equal', { expected: expected, actual: actual});
    };

    /**
     * Determines whether an object has its own copy of a property and whether it strictly equals the provided value.
     */
    owns(object, propertyName, expected, message) {
        if (typeof object === 'undefined') {
            throw new AssertionError(message || 'Actual object is undefined', { expected: { propertyName: propertyName, value: expected }, actual: 'undefined' });
        } else if (!object.hasOwnProperty(propertyName)) {
            throw new AssertionError(message || 'Object does not own property', { expected: { propertyName: propertyName, value: expected }, actual: object[propertyName] });
        }

        this.assertEquals(object[propertyName], expected, message || 'Object does not own property');
    };

    /**
     * Determines whether an object has a property name in its prototype chain and ensures that it is strictly equal
     * to the expected value.
     */
    has(object, propertyName, expected, message) {
        if (typeof object === 'undefined') {
            throw new AssertionError(message || 'Object is undefined', { expected: { value: expected, propertyName: propertyName }, actual: 'undefined' });
        } else if (typeof object[propertyName] === 'undefined') {
            throw new AssertionError(message || 'Object property is undefined', { expected: { value: expected, propertyName: propertyName }, actual: { object: object, value: 'undefined'} });
        } else if (typeof expected !== 'undefined' && object[propertyName] !== expected) {
            this.assertEquals(object[propertyName], expected, message);
        }
    };

    /**
     * Promotes alcoholism among QA developers.
     */
    fail(message, data) {
        throw new AssertionError(message || 'Assertion failed', data);
    };
}

PlurClass.plurify('plur/test/Assert', Assert);
