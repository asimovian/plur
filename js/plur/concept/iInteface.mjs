/**
 *
 */

import 'plur/Meta.mjs' as PlurMeta;
import 'plur/concept/iType.mjs' as iTypeConcept;
import 'plur/concept/iFunction.mjs' as iFunctionConcept;

/**
 * @abstract
 */
export default class iIntefaceConcept extends iTypeConcept {
    static namepath = 'plur/concept/iInteface';

    /** @return iFunctionConcept[] **/
    getMethods = PlurMeta.abstractMethod;

    /** @return {iIntefaceConcept|null} **/
    getParent = PlurMeta.abstractMethod; 
}

PlurMeta.conformInteface(iIntefaceConcept);

