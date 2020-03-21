/**
 * @copyright 2019 Asmov LLC
 * @license MIT https://github.com/asmov/plur/blob/master/LICENSE.txt
 * @module plur/IPlurified
 * @version 0.1.0
 */

/**
 * Standard interface for all plur framework classes. Implementing classes have access to two psuedo language features:
 *   - Interfaces: Multiple per class. Errors are thrown if not implemented correctly. Each property in an
 *                 interface class with a value of PlurClass.abstractMethod is considered contract and inherited if not
 *                 already overridden. Static Interfaces are allowed and enforced by simply creating a static property
 *                 in the interface class.
 *
 *   - Class Identity: Each class provides a static and instance copy of its module path, known as a "namepath".
 *
 * The PlurClass utility class provides all of the methods required to use plur psuedo language features. Each call
 * to plurify() a class will shim this interface into the class's implemented map.
 *
 * Implementing classes must:
 *   - Provide the module path as an immutable static property and prototype property copy: "namepath".
 *   - Provide a static array property named "implemented".
 *   - All of this should be done by using PlurClass.plurify() after class declaration.
 *   - Export the class as the default export.
 *
 * Interface classes must:
 *   - Throw an InterfaceError on construction and nothing else. (Not constructable: Throws error)
 *   - Properties intended to be implemented as methods should assign PlurClass.abstractMethod as the value.
 *   - Use the @interface and @implements class doc tags. List IPlurified as implemented (it is after plurify().).
 *   - Use @abstract, @param, @returns and @throws tags on abstract method signatures to define and enforce a contract.
 *
 * @interface
 */
export default class IPlurified {
    constructor() {
        throw new Error("Cannot instantiate an interface.");
    };
}

/**
 * The class's module path.
 * @alias IPlurified.namepath
 */
Object.defineProperty(IPlurified, 'namepath', { value: 'plur/IPlurified', writable: false, enumerable: true,
    configurable: false });

/**
 * A map of each implemented class, with the namepath as the key and the class object as the value.
 * @alias IPlurified.implemented
 */
Object.defineProperty(IPlurified, 'implemented', { value: {}, writable: false, enumerable: true,
    configurable: false });
