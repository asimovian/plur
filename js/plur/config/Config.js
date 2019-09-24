/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/config/Config
 */
'use strict';

import PlurObject from 'plur/PlurObject.mjs';

/**
 * Maintains key/value configuration for a subject object, typically for a prototype.
 *
 * @class Config
 * @alias {module:plur/config/Config}
 * @final
 */
class Config {
    /**
     * @param {IConfigurable} configurableObject
     * @param {Config} defaultConfig
     * @param {} override 
     */
    constructor(configurableObject, defaultConfig, override) {
        this._configuredNamepath = configurableObject.namepath;
        this._defaultConfig = ( defaultConfig || null );
        this._parentDefaultConfig = (defaultConfig ? defaultConfig.getParentConfig() : null );
        this._config = {};

        // build _config
    };

    /**
     * @returns {{string:*}}
     * */
    config() {
        const cfgobj = {}; //todo: deep clone _config
        return cfgobj;
    };

    getNamepath() {
        return this._configuredNamepath;
    };
}

PlurObject.plurify('plur/config/Config', Config);


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
    for (const key in primitiveMap) {
        let node = null;

        if (!configTreeNode.has(key)) {
            node = configTreeNode.addChild(new MapTreeNode(configTreeNode, key));
        } else {
            node = configTreeNode.get(node);
        }

        const value = primitiveMap[key];

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


export default Config;
