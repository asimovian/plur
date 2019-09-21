/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/config/Config
 */
'use strict';

import { plurObject } from 'plur/PlurObject';
import { IConfigurable } from 'plur/config/IConfigurable';
import { MapTreeNode } from 'plur/tree/MapNode';

/**
 * Maintains key/value configuration for a subject object, typically for a prototype.
 *
 * @class Config
 * @alias {module:plur/config/Config}
 * @final
 */
class Config {
    /**
     *
     * @param IConfig config
     * @param parentConfigurable
     * @param config
     */
    constructor(config, parentConfig, override) {
        this._inheritanceTree = new MapTreeNode();
        this._configuredNamepath = null;
        this._parentConfiguredNamepath = null;
        this._config = {};

        if (config instanceof Config) {
        } else {
        }
    };

    /**
     * @returns {{string:*}}
     * */
    config() {
	const cfgobj = //todo: deep clone
        return cfgobj;
    };
	
    getNamepath() {
        return this._configuredNamepath;
    };
}

PlurObject.plurify('plur/config/Config', Config, [ IConfig ]);


Config.merge = function(config1, config2) {
	/*
    if (typeof config === 'undefined') {
        return this;
    } else if (config instanceof Config) {
        return this._merge(config);
    } else {
        return this._mergePrimitive(config);
    }
    */
};

Config._mergePrimitive = function(primitiveMap) {
    var config = this.copy();
    this._fillWithPrimitiveMap(config, this._configTree, primitiveMap)
    config._update();
    return config;
};

Config._fillWithPrimitiveMap = function(config, configTreeNode, primitiveMap) {
    for (var key in primitiveMap) {
        var node = null;

        if (!configTreeNode.has(key) {
            node = configTreeNode.addChild(new MapTreeNode(configTreeNode, key));
        } else {
            node = configTreeNode.get(node);
        }

        var value = primitiveMap[key];

        switch(typeof value) {
        case 'string':
        case 'boolean':
        case 'number':
            node.set(value);
            break;

        case 'object':
            this._copyPrimitiveMap(config, node, value);
            break;

        case 'array':
            if (!configTreeNode.has('[]')) {
                node = node.addChild(new ListTreeNode(node), '[]');
            } else {
                node = configTreeNode.get('[]');
            }

            for (var i = 0, n = value.length; ++i) {
                this._copyPrimitiveMap(config, node, value);
            }
            break;

        default:
            break;
        }
    }
};


export default Config
