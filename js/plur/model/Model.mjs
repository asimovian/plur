/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/model/Model
 */
'use strict';

import PlurObject from '../../plur/PlurObject.mjs';

/**
 * Converts an object to / from a simple data model.
 *
 * @abstract
 */
export default class Model {
    /**
     * Creates a simple data model of this object.
     *
     * @param {} object
     * @returns {} model
     */
    static model(v, options) {
        var override = (typeof options !== 'undefined' && options.override === false ? false : true);

        switch (typeof v) {
            case 'string':
            case 'number':
            case 'boolean':
                return v;
                break;

            case 'object':
                if (Array.isArray(v)) {
                    // handle arrays
                    var model = [];

                    for (var i = 0; i < v.length; ++i) {
                        var m = PlurObject.model(v[i], options);
                        if (m !== null) {
                            model.push(m);
                        }
                    }

                    return model;
                } else if (!override && Object.hasOwnProperty(v.prototype, 'model') && typeof v.model === 'function') {
                    return v.model();
                } else {
                    // build the model using only public variables
                    var model = {};

                    for (var propertyName in v) {
                        // only include public variables (starts with a lower case letter)
                        if (!propertyName.match(/^[a-z]/)) {
                            continue;
                        }

                        var m = PlurObject.model(v[propertyName], options);
                        if (m !== null) {
                            model[propertyName] = m;
                        }
                    }

                    return model;
                }
                break;

            default:
                return null;
        }
    };

    /**
     * Constructs an object from a data model.
     *
     * @param {} model
     * @returns {} object
     */
    static fromModel(model, callback) {
        if (typeof model.namepath === 'undefined') {
            callback(model);
        }

        requirejs([model.namepath], function (constructor) {
            if (typeof constructor.fromModel === 'function') {
                var object = constructor.fromModel(model);
                callback(object);
            } else {
                var object = new Constructor();

                for (var propertyName in model) {
                    if (!propertyName.match(/^[a-z]/)) {
                        continue;
                    }

                    object[propertyName] = this._createFromModel(model[propertyName]);
                }

                callback(object);
            }
        });
    };
}

PlurObject.plurify('plur/model/Model', Model);
