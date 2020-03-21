/**
 * @copyright 2017 Asmov LLC
 * @license MIT https://github.com/asmov/plur/blob/master/LICENSE.txt
 * @module plur-webui/plur/web/IUI
 * @requires plur/PlurObject plur/service/AService
 */
define([
    '../../PlurObject',
    'plur/service/AService' ],
function(
    PlurObject,
    IGraphicalUI ) {

/**
 * An
 *
 * @class AWebUIService
 * @alias {plur/browser/ui/AWebUIService}
 * @abstract
 */
class AWebUIService  {
    static getDefaultConfig() {
        return AWebUI._DEFAULT_CONFIG;
    };

    static _DEFAULT_CONFIG = new ConstructorConfig(AWebUI, null, __FILE_CONFIG, {
        webui: {
            rootComponent: Config.string('plurcommander/plur/browser/ui/main/Body')
        }
    });

    constructor(service, config, domWindow) {
        this._service = service;
        this._config = AWebUI.getDefaultConfig().merge(config);
        this._window = domWindow;
        this._document = domWindow.document;
        this._uiTree = new MapTreeNode();
    };

    config() {
        return this._config.config();
    };

    init() {
        '<script>g_plur.webui.include("/TemplateStuff", { attr: { }, prop: { } );</script>';
    };

    render() {
        this._uiTree.get().render(this._window);
    };
}

PlurObject.plurify('plurcommander/plur/browser/IWebUI', IWebUI, [ IGraphicalUI ]);

return AWebUI;
});