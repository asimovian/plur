/**
 * @copyright 2017 Asmov LLC
 * @license MIT https://github.com/asmov/asimovian-webui/blob/master/LICENSE.txt
 * @module plur-webui/plur/webui/index/App
 * @requires plur/PlurObject plur/app/IApplication plur/node/Node plur-webui/plur/browser/ui/index/Service
 */
 'use strict';

define([
    '../../PlurObject',
    'plur/app/IApplication',
    'plur/node/INode',
    'plur/node/Service',
    'plur/browser/ui/IService' ],
function(
    PlurObject,
    IApplication,
    IPlurNode,
    PlurNodeService,
    IWebUIService ) {

/**
 * Start and control a browser-based plur node.
 *
 * @class WebUIApp
 * @alias {module:plur/browser/App}
 * @implements {module:plur/app/IApplication}
 */
class WebUIApp {
    /**
     * Constructs a new Plur Node.
     *
     * @param {function(new: (module:plur/web/ui/IService))} webuiServiceClass
     * @param {Window} domWindow
     */
    constructor(webuiServiceClass, serviceConfig, domWindow) {
        /** @type {module:plur/node/Node} **/
        this._node = new PlurNode(PlurNodeService);
        /** @type {module:plur/service/IService} **/
        this._service = new applicationServiceClass(this._node, {
            service: {
                autostart: true,
                webui: {
                    domWindow: domWindow
                }
            }
        });

        // register this application's main service. it is configured to auto-start once the node starts.
        this._node.registerService(this._service);

        // the application should stop() on the node's 'plur.node.stopped' events
        let self = this;
        this._node.emitter().once('plur.node.stopped', function() {
            self.stop();
        });
    };

    /**
     * @returns {module:plur/node/Node}
     */
    plurNode() {
        return this._node;
    };

    /**
     * @returns {module:plur/service/IService}
     */
    service() {
        return this._service;
    };

    /**
     * Starts the Plur Node.
     * Registers the WebUiService with the node and starts it.
     */
    start() {
        this._node.start();
    };

    /**
     * Stops the node and the application.
     */
    stop() {
        try {
            this._node.stop();
        } catch (e) {
            console.log(e);
        } finally {
            this._service = null;
            this._node = null;
        }
    };
}

PlurObject.plurify('plur/browser/App', WebUIApp, IApplication);


return WebUIApp;
});