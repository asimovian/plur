/**
 * @copyright 2020 Asmov LLC
 * @license MIT https://github.com/asmov/plur/blob/master/LICENSE.txt
 * @module plur/Class
 * @version 2020.0.1
 *
 * @typedef {Object<string,(string,number,boolean,null,Array<obj>,obj)>} obj
 */
'use strict';

import iPlurCompatable from '../plur/iCompatable.mjs';
export iPlurCompatable;

export class PlurMetaDescriptor {
    static namepath = 'plur/Meta/Descriptor';

    #metaNamepath = null;
    #classObject = null;

    constructor(classObject) {
        this.#metaNamepath = classObject.namepath;
        this.#classObject = classObject;
    };

    getNamepath() { return this.#namepath; };

    getMetaNamepath() {
        return this.#metaNamepath;
    };

    getClassObject() {
        return this.#classObject;
    };
};

/**
 * Utility for prototype object construction.
 *
 * @implements {plur/iPlurCompatable}
 * @final
 */
export default class PlurMeta {
    static const #metaDescriptors = [];

    /**
     * Determines whether the given object or class has been plurify()'d or not.
     *
     * @param {Object|Function|iPlurCompatable} o The object or class object to review.
     * @return {boolean} TRUE if plurified FALSE if not
     */
    static isCompatable(o) {
        return ( typeof o.__implemented === 'object' && typeof o.__implemented['plur/iPlurCompatable'] !== 'undefined');
    };

    /**
     * Determines whether the given class have been plurify()'d or not. FALSE on objects of a class.
     *
     * @param {Function|iPlurCompatable} c The class object to review
     * @return {boolean} TRUE if a plurified class FALSE if not
     */
    static isClassCompatable(c) {
        return ( c.hasOwnProperty('__implemented') && typeof c.__implemented === 'object' &&
            typeof c.implemented['plur/iPlurCompatable'] !== 'undefined');
    };

    /**
     *
     * @param {iPlurCompatable} object
     * @param {iPlurCompatable} interfaceConstructor
     * @return {boolean}
     */
    static implementing(object, interfaceConstructor) {
        const constructor = ( object instanceof Function ? object : Object.getPrototypeOf(object).constructor );

        if (typeof constructor.__implemented === 'undefined') {
            return false;
        } else if (typeof interfaceConstructor === 'string') {
            return ( typeof constructor.__implemented[interfaceConstructor] !== 'undefined' );
        } else {
            return ( typeof constructor.__implemented[interfaceConstructor.namepath] !== 'undefined' );
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
     * PlurMeta.plurify('myproject/foobars/Foo', Foo);
     ***
     *
     * Sets the provided "namepath" property into the prototype of the provided constructor.
     *
     * Sets the "__implemented" property into the constructor that maps implemented interface namepaths
     * to their constructors.
     *
     * @param {string} namepath The namepath to set both statically and on the prototype.
     * @param {!iPlurCompatable} classObject The class to be plurified
     * @param {Array<iPlurCompatable>=} interfaces Interfaces to be implemented.
     */
    static conformClass(classObject, interfaces) {
        if (!(classObject instanceof Function) || typeof classObject.prototype === 'undefined') {
            throw new Error('Non-class passed to plurify()');
        } else if (this.isPlurifiedClass(classObject)) {
            return;
        }

        // inject namepath into the class's static properties and prototype properties
        //PlurMeta.constProperty(classObject, 'namepath', namepath);
        //PlurMeta.constProperty(classObject.prototype, 'namepath', namepath);

        // inject the implemented class map into the class's static properties
        PlurMeta.constProperty(classObject, '__implemented', { 'plur/iPlurCompatable' : iPlurCompatable }, false);

        // inherit parent interfaces if any exist
        const parentClass = Object.getPrototypeOf(classObject.prototype).constructor;
        if (PlurMeta.isPlurifiedClass(parentClass)) {
            for (const key in parentClass.__implemented) {
                if (typeof classObject.__implemented[key] === 'undefined') {
                    classObject.__implemented[key] = parentClass.__implemented[key];
                }
            }
        }

        // kept for runtime metrics
        PlurMeta.#metaDescriptors[classObject.namepath] = new MetaDescriptor(classObject);

        if (!Array.isArray(interfaces)) {  // all done then
            return;
        }

        for (let i = 0; i < interfaces.length; ++i) {
            PlurMeta.implement(classObject, interfaces[i]);
        }
    };

    static conformInteface(

    /**
     * Define a subject constructor/prototype as implementing a given interface constructor.
     * Copies the interface prototype's abstract methods in to the subject prototype.
     * Adds the interface pathname to the subject constructor.__implemented variable.
     *
     * @param {iPlurCompatable} classObject
     * @param {iPlurCompatable} interfaceClass
     * @throws {Error}
     */
    static implement(classObject, interfaceClass) {
        if (typeof classObject.__implemented[interfaceClass.namepath] !== 'undefined') {
            return;  // already implemented
        } else if (!PlurMeta.isPlurifiedClass(classObject) || !PlurMeta.isPlurifiedClass(interfaceClass)) {
            throw new Error('Only plurified classes can implemented plurified class interfaces.');
        }

        const interfacePrototype = interfaceClass.prototype;
        const prototype = classObject.prototype;

        for (const propertyName in interfacePrototype) {
            // make sure that the interface property is assigned to PlurMeta.abstractMethod
            if (interfacePrototype.hasOwnProperty(propertyName) &&
                interfacePrototype[propertyName] === PlurMeta.abstractMethod) {
                // set it if it's undefined. ignore if it exists and is already abstract. throw error otherwise.
                if (typeof prototype[propertyName] === 'undefined') {
                    prototype[propertyName] = interfacePrototype[propertyName];
                }
            }
        }

        classObject.__implemented[interfaceClass.namepath] = interfaceClass;
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
            enumerable: ( typeof enumerable === 'boolean' ? enumerable : true )});
    };

    /**
     * Returns a string namepath for the provided value (class, object, or string).
     * @param {Function|Object|String} v
     * @returns {string}
     * @throws {Error} on invalid parameter
     */
    static namepath(v) {
        switch(typeof v) {
            case 'function':
                if (typeof v.namepath === 'string') {
                    return v.namepath;
                }

                throw new Error('Class does not have a namepath');

            case 'object':
                if (typeof v.getNamepath !== 'undefined') {
                    return v.getNamepath();
                }

                throw new Error('Object does not have a namepath method');

            case 'string':
                return v;

            default:
                throw new Error('Invalid parameter for namepath');
        }
    };

    /**
     * Returns an array of records { namepath: string, datetime: 'string' }.
     * @return {!Array<!Object<string, string>>}
     */
    static getMetaDescriptors() {
        return PlurMeta.#metaDescriptors;
    };

    static getMetaDescriptor(namepath) {
        if (typeof PlurMeta.#metaDescriptors[namepath] !== 'undefined') {
            return PlurMeta.#metaDescriptors[namepath];
        }

        throw new Error('Meta descriptor not found for namepath');
    };


    /**
     * @throws {Error}
     */
    constructor() {
        throw new Error('Cannot instantiate private constructor of PlurMeta');
    };
}

/** @type {!Array<!Object<string,string>>} Runtime information about each class that has been plurify()'d. **/
PlurMeta._plurified = [];

PlurMeta.plurify('plur/Meta', PlurMeta);
