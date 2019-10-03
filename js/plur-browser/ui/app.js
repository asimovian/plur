/**
 * @copyright 2017 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur-www/blob/master/LICENSE.txt
 * @module plur/web/ui
 */
'use strict';

/**
 * Expects browser/nodejs.js to be loaded.
 */
plurbootstrap.require([
    'plur/web/Bootstrap',
    'plur/browser/ui/App' ],
function(
    WebBootstrap,
    WebUIApp ) {

WebBootstrap.init(plurbootstrap)
    //.require(['main.cfg.json'], function(mainCfg) { ... })
    .addPaths({
        //TODO: loaded from main.cfg.json
        'plurcommander': 'plurcommander/js/plurcommander',
        'plurcommander-cfg': 'plurcommander/cfg/plurcommander'
    })
    .require([
        //TODO: laoded from main.cfg.json
        'plurcommander/webui/service/Main',
        'plurcommander-cfg/webui/service/Main'],
        function(MainServiceClass, mainServiceConfig) {
            let app = null;
            try {
                app = new WebUIApp(MainServiceClass, mainServiceConfig, window);
                app.start();
            } catch (e) {
                console.log(e);
                try { app.stop(); } catch (e) { console.log(e); } // force stop
            }
        }
    );

return /* no export */;
});


