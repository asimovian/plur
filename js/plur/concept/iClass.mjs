/**
 *
 */

import 'plur/Meta.mjs' as PlurMeta;
import 'plur/concept/iType.mjs' as iTypeConcept;
import 'plur/concept/iFunction.mjs' as iFunctionConcept;

/**
 * @abstract
 */
export default class iClassConcept extends iTypeConcept {
    static namepath = 'plur/concept/iClass';

    /** @return {iFunctionConcept[]} **/
    getMethods = PlurMeta.abstractMethod;

    /** @return {iClassConcept|null} **/
    getParent = PlurMeta.abstractMethod; 

    /** @return {iInterfaceConcept[]} **/
    getImplementedInterfaces = PlurMeta.abstractMethod;
}

PlurMeta.conformInteface(iClassConcept);


