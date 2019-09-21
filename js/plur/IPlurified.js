/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur
 */

/**
 * Standard interface for all Plur library classes.
 *
 * @interface
 */
class IPlurified {
    constructor() {
        throw new Error("Cannot instantiate an interface.");
    };
}

Object.defineProperty(IPlurified, 'namepath', {value: 'plur/IPlurified', writable: false, enumerable: true, configurable: false});
Object.defineProperty(IPlurified, 'implemented', {value: [], writable: true, enumerable: true, configurable: true});

export default IPlurified;
