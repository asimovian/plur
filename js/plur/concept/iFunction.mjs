/**
 *
 */

import 'plur/Meta.mjs' as PlurMeta;
import 'plur/concept/iType' as iTypeConcept;


/**
 * @abstract
 */
export default class iFunctionConcept {
    static namepath = 'plur/concept/iInteface';

    /** @returns {string} **/
    getName = PlurMeta.abstractMethod;
    
    /** @returns {iFunctionParameterConcept[]} **/
    getParameters = PlurMeta.abstractMethod;
}

PlurMeta.conformInteface(iFunctionConcept);

