/**
 * Blah blah blah
 *
 * @doc portdoc 2020 ecmascript 2020
 * @copyright 2020 My Company Inc. @license MIT
 * 
 * @standard plur/doc/standard 2020
 * @concepts me/doc/concepts 2020
 */

/**
 * Blah blah blah
 *
 * @interface my/name/space/iReflectiveFace @extends some/thing/Else
 * @portable @reflective 
 */
export default class iReflectiveFace {
        /**
         * Should do something useful.
         *
         * @method doSomething <bool> @implements IReflectiveFace.doSomething
         * @explicit
         *     * Should do something.
         *     ** Should do something specifically.
         *     * Should do something else.
         *--- #mySection
         * This is my section. It is named, and part of the contract description.
         *------ @thirdsection
         * This is my third section. It represents a custom documentation concept ("thirdsection").
         * @thirdtag This is a tag defined by @thirdsection.
         *------
         * 
         * Does something by amount.
         *
         * @param <integer> num The amount of something.
         * @param <classpath:ISomeInterface> classpath
         * @param <class:ASomeClass> theclass
         * @param <interface:ISomeOtherIface> otheriface
         * @param <array:string> strings
         * @param <map:string> strings
         * @param <map:string,<foo:string,string>> strings
         * @returns <string>
         *     If the string is null, bad.
         *--- 
         * Does something by name.
         *
         * @param <string> name @default ""
         *     This is an indented line and part of the above description.
         *     And another.
         * @param <bool> how How to do something
         * @returns <undefined>
         *---
         */
        doSomething: null;

        foo = 'bar'; /* @string foo */
};

basicType.proto:
  bool,byte,integer,float,string,array

portableType.proto extends basicType:
  class,interface,map

type.proto:
  basicType basic
  string[64] namepath

parameter.proto:
  type type
  string[16] name
  blob description

signature.proto:
  blob description
  type returnType
  type[] throwsExceptions
  parameter[] parameters
  bool isInternal
  bool isCompatable
  bool isPortable

method.proto:
  string[16] name
  section sections[]
  signatures[]
  bool isInternal
  bool isPortable
  bool isCompatable
  string[64][] conformsWith
  blob description
  blob explicitDescription

interface.proto:
  string[64] namepath
  section[] sections
  bool isInternal
  bool isCompatable
  bool isPortable
  bool isReflective
  bool isRemote
  method[] methods;
  string[64][] conformsWith
  blob description
  blob explicitDescription
