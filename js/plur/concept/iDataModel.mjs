/**
 *
 */

import 'plur/Meta.mjs' as PlurMeta;
import 'plur/concept/iType.mjs' as iTypeConcept;

/**
 * @abstract
 */
export default class iDataModelConcept extends iTypeConcept {
    static namepath = 'plur/concept/iClass';

    /** @return {iDataModelConcept|null} **/
    getParent = PlurMeta.abstractMethod; 

    /** @return {iVariable[]} **/
    getProperties = PlurMeta.abstractMethod;
}

PlurMeta.conformInteface(iDataModelConcept);
