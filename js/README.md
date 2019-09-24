Javascript Source
=================

All JS library source files are stored here, organized by namespace. This is the base-path for JS module imports.

The term **"namepath"** is used in plur to designate the relative path of a JS file, not including its extension.

Example
-------

Author "myteam" is working on package "myproject". Where Square extends Shape ...
~~~~
plur/js/myteam/myproject/Shape.mjs
plur/js/myteam/myproject/shape/Square.mjs
~~~~

... would have namepaths of ...
~~~~
myteam/myproject/Shape
myteam/myproject/shape/Square
~~~~

... and Square imports Shape like so ...
~~~js
/** @file Square.mjs **/
import Shape from '../../../myteam/myproject/Shape.mjs';
~~~

As the class is always the default export in plur class files.

The only namepaths that are not required to prefix with an author/team name are official "plur" modules.
