/**
 * The plur framework defines an portal standard meta-language definition for abstract software language concepts:
 * model, structure, protocol, and logic. The combined definitions for each of these sub-categories is known as the
 * Plur Conceptual Language or PlurCL.
 * 
 * PlurCL abstractly defines concepts commonly found in various programming languages. within the context
 * of a specific language that PlurCL standards are to be implemented, PlurCL concretely defines what language-specific
 * syntax and design patterns are to be used to implement a given abstract concept.
 *
 * Most importantly, PlurCL provides a common way to refer to primitive types, values, interfaces, and classes along
 * with common patterns on how they interact.
 */

import 'plur/Meta.mjs' as PlurMeta;

export default class iConcept {
    static namepath = 'plur/iConcept';
};

PlurMeta.conformInteface(iConcept);
