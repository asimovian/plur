/**
 *
 */

import 'plur/Meta.mjs' as PlurMeta;
import 'plur/concept/iConcept.mjs' as iConcept;

/**
 * @abstract
 */
export default class iTypeConcept extends iConcept {
    static namepath = 'plur/concept/iType';

    static DataTypes = {
        Bool: 'bool',
        Byte: 'byte'
        Integer32: 'int32',
        Integer64: 'int64',
        UnsignedInteger32: 'uint32',
        UnsignedInteger64: 'uint64',
        Float32: 'float32',
        Float64: 'float64',
        UnsignedFloat32: 'ufloat32',
        UnsignedFloat64: 'ufloat64',
        UTF8: 'utf8',
        UTF16: 'utf16',
        UTF32: 'utf32',
    };

    getName = PlurMeta.abstractMethod;

    getNamepath = PlurMeta.abstractMethod;
}

PlurMeta.conformInteface(TypeConcept);
