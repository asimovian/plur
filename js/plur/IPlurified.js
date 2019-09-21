/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/IPlurified
 */

/**
 * Standard interface for all plur framework classes. Implementing classes have access to two psuedo language features:
 *   - Interfaces: Multiple per class. Errors are thrown if not implemented correctly. Each property in an
 *                 interface class with a value of PlurObject.abstractMethod is considered contract and inherited if not
 *                 already overridden. Static Interfaces are allowed and enforced by simply creating a static property
 *                 in the interface class.
 *   - Reflection: Albeit rudimentary, reflection is possible through universal class identification. Each class
 *                 provides a static and instance copy of its module path, known as a "namepath".
 *
 * The PlurObject utility class provides all of the methods required to use plur psuedo language features.
 *
 * Implementing classes must:
 *   - Provide the module path as an immutable static property and instance property copy: "namepath".
 *   - Provide a array property named "implemented".
 *   - All of this should be done by using PlurObject.plurify() after class declaration.
 *   - Export the class as the default export.
 *
 * Interface classes must:
 *   - Throw InterfaceError on construction - not constructable.
 *   - Assign only properties, static or prototype, meant to be implemented methods. Assigned PlurObject.abstractMethod.
 *   - Use the @interface jsdoc tag.
 *
 * @interface
 * @final
 */
class IPlurified {
    constructor() {
        throw new Error("Cannot instantiate an interface.");
    };
}

Object.defineProperty(IPlurified, 'namepath', {value: 'plur/IPlurified', writable: false, enumerable: true, configurable: false});
Object.defineProperty(IPlurified, 'implemented', {value: [], writable: true, enumerable: true, configurable: true});

export default IPlurified;
