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
 *
 *   - Class Identity: Each class provides a static and instance copy of its module path, known as a "namepath".
 *
 * The PlurObject utility class provides all of the methods required to use plur psuedo language features.
 *
 * Implementing classes must:
 *   - Provide the module path as an immutable static property and prototype property copy: "namepath".
 *   - Provide a static array property named "implemented".
 *   - All of this should be done by using PlurObject.plurify() after class declaration.
 *   - Export the class as the default export.
 *
 * Interface classes must:
 *   - Extend from this class or one of its descendents.
 *   - Call super() on construction and nothing else. (Not constructable: Throws error)
 *   - Properties intended to be implemented as methods should assign PlurObject.abstractMethod as the value.
 *   - Use the @interface class doc tag. Use @param, @returns and @throws tags to define and enforce method signatures.
 *
 * @interface
 */
class IPlurified {
    constructor() {
        throw new Error("Cannot instantiate an interface.");
    };
}

Object.defineProperty(IPlurified, 'namepath', { value: 'plur/IPlurified', writable: false, enumerable: true,
    configurable: false });
Object.defineProperty(IPlurified, 'implemented', { value: [], writable: true, enumerable: true,
    configurable: true });

export default IPlurified;
