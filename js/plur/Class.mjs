/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/Class
 * @version 0.0.2
 *
 * @typedef {Object<string,(string,number,boolean,null,Array<obj>,obj)>} obj
 */
'use strict';

import IPlurified from '../plur/IPlurified.mjs';

/**
 * Utility for prototype object construction.
 *
 * @implements {plur/IPlurified}
 * @final
 */
export default class PlurClass {
    /**
     * Determines whether the given object or class has been plurify()'d or not.
     *
     * @param {Object|Function|IPlurified} o The object or class object to review.
     * @return {boolean} TRUE if plurified FALSE if not
     */
    static isPlurified(o) {
        return ( typeof o.implemented === 'object' && typeof o.implemented['plur/IPlurified'] !== 'undefined');
    };

    /**
     * Determines whether the given class have been plurify()'d or not. FALSE on objects of a class.
     *
     * @param {Function|IPlurified} c The class object to review
     * @return {boolean} TRUE if a plurified class FALSE if not
     */
    static isPlurifiedClass(c) {
        return ( c.hasOwnProperty('implemented') && typeof c.implemented === 'object' &&
            typeof c.implemented['plur/IPlurified'] !== 'undefined');
    };

    /**
     *
     * @param {IPlurified} object
     * @param {IPlurified} interfaceConstructor
     * @return {boolean}
     */
    static implementing(object, interfaceConstructor) {
        const constructor = ( object instanceof Function ? object : Object.getPrototypeOf(object).constructor );

        if (typeof constructor.implemented === 'undefined') {
            return false;
        } else if (typeof interfaceConstructor === 'string') {
            return ( typeof constructor.implemented[interfaceConstructor] !== 'undefined' );
        } else {
            return ( typeof constructor.implemented[interfaceConstructor.namepath] !== 'undefined' );
        }
    };

    /**
     * Meant to be assigned to abstract prototype functions that require overriding in child classes.
     *
     * @throws Error
     */
    static abstractMethod() {
        throw new Error('plur: Cannot call abstract method.');
    };

    /**
     * Initializes a class as a Plur Object.
     *
     * Designed to be used from within a ES6+ class declaration. Always assigned to a static property "namepath".
     *
     *** Example usage:
     * class Foo {
     *   ...
     * };
     *
     * PlurClass.plurify('myproject/foobars/Foo', Foo);
     ***
     *
     * Sets the provided "namepath" property into the prototype of the provided constructor.
     *
     * Sets the "implemented" property into the constructor that maps implemented interface namepaths
     * to their constructors.
     *
     * @param {string} namepath The namepath to set both statically and on the prototype.
     * @param {!IPlurified} classObject The class to be plurified
     * @param {Array<IPlurified>=} interfaces Interfaces to be implemented.
     */
    static plurify(namepath, classObject, interfaces) {
        if (!(classObject instanceof Function) || typeof classObject.prototype === 'undefined') {
            throw new Error('Non-class passed to plurify()');
        } else if (this.isPlurifiedClass(classObject)) {
            return;
        }

        // inject namepath into the class's static properties and prototype properties
        PlurClass.constProperty(classObject, 'namepath', namepath);
        PlurClass.constProperty(classObject.prototype, 'namepath', namepath);

        // inject the implemented class map into the class's static properties
        PlurClass.constProperty(classObject, 'implemented', { 'plur/IPlurified' : IPlurified }, false);

        // inherit parent interfaces if any exist
        const parentClass = Object.getPrototypeOf(classObject.prototype).constructor;
        if (PlurClass.isPlurifiedClass(parentClass)) {
            for (const key in parentClass.implemented) {
                if (typeof classObject.implemented[key] === 'undefined') {
                    classObject.implemented[key] = parentClass.implemented[key];
                }
            }
        }

        // kept for runtime metrics
        PlurClass._plurified.push({ namepath: namepath, timestamp: Date.now() });

        if (!Array.isArray(interfaces)) {  // all done then
            return;
        }

        for (let i = 0; i < interfaces.length; ++i) {
            PlurClass.implement(classObject, interfaces[i]);
        }
    };

    /**
     * Define a subject constructor/prototype as implementing a given interface constructor.
     * Copies the interface prototype's abstract methods in to the subject prototype.
     * Adds the interface pathname to the subject constructor.implemented variable.
     *
     * @param {IPlurified} classObject
     * @param {IPlurified} interfaceClass
     * @throws {Error}
     */
    static implement(classObject, interfaceClass) {
        if (typeof classObject.implemented[interfaceClass.namepath] !== 'undefined') {
            return;  // already implemented
        } else if (!PlurClass.isPlurifiedClass(classObject) || !PlurClass.isPlurifiedClass(interfaceClass)) {
            throw new Error('Only plurified classes can implemented plurified class interfaces.');
        }

        const interfacePrototype = interfaceClass.prototype;
        const prototype = classObject.prototype;

        for (const propertyName in interfacePrototype) {
            // make sure that the interface property is assigned to PlurClass.abstractMethod
            if (interfacePrototype.hasOwnProperty(propertyName) &&
                interfacePrototype[propertyName] === PlurClass.abstractMethod) {
                // set it if it's undefined. ignore if it exists and is already abstract. throw error otherwise.
                if (typeof prototype[propertyName] === 'undefined') {
                    prototype[propertyName] = interfacePrototype[propertyName];
                }
            }
        }

        classObject.implemented[interfaceClass.namepath] = interfaceClass;
    };

    /**
     *
     * @param {Object} object
     * @return {Object[]}
     */
    static values(object) {
        const values = [];
        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                values.push(object[key]);
            }
        }

        return values;
    };

    /**
     * @param {*} object
     * @param {string} key
     * @param {*} value
     * @param {boolean=} enumerable
     */
    static constProperty(object, key, value, enumerable) {
        Object.defineProperty(object, key, { value: value, writable: false, configurable: false,
            enumerable: ( typeof enumerable === 'boolean' ? enumerable: true )});
    };

    /**
     * Returns an array of records { namepath: string, datetime: 'string' }.
     * @return {!Array<!Object<string, string>>}
     */
    static getPlurified() {
        return PlurClass._plurified;
    };

    /**
     * @throws {Error}
     */
    constructor() {
        throw new Error('Cannot instantiate private constructor of PlurClass');
    };
}

/** @type {!Array<!Object<string,string>>} Runtime information about each class that has been plurify()'d. **/
PlurClass._plurified = [];

PlurClass.plurify('plur/Class', PlurClass);
