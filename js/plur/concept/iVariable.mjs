
import 'plur/Meta.mjs' as PlurMeta;
import 'plur/concept/iType.mjs' as iTypeConcept;

export class iVariableConcept {
    static namepath = 'plur/concept/iVariable'

    /** @returns {iTypeConcept} **/
    getType = PlurMeta.abstractMethod;

    /** @returns {string} **/
    getName = PlurMeta.abstractMethod;
}

PlurMeta.conformInteface(iVariableConcept);
