Plur Roadmap
============

Version 0.1.0
-------------
"It works!"
* Unit Tests & Integrations Tests: 80% Coverage
* Code Style and Doc Tags: 100% Coverage
* Build system works and test coverage on:
  * Mint 19 w/Cinammon (Ubuntu 18)
  * Ubuntu Server 19
  * OSX 10.15
  * Windows 10
* plur/panel runs and tested on:
  * Chrome (Linux)
  * Safari (OSX)
  * Edge (Windows)
* plur-launch runs and tested as a system service (daemon) on:
  * Mint 19 w/Cinammon (Ubuntu 18)
  * Ubuntu Server 19
  * OSX 10.15
  * Windows 10
* Node networking basic operation and tests:
  * Multiple nodes interconnect and communicate message request/responses
  * Message Routing
  * Capabilities: Distribution
  * Roles: Distribution, Heirarchy
  * Identity, Authentication & Verification: PGP signatures
  * Encryption: TLS for communication
  * Core Role / Services:
    * Cloud Controller (CLOUD_*): Active-Active configuration. Controlled by plur-panel.
    * System Controller (SYS_*): Integrates plur-launch
    * Router (FWD_*)
    * Authenticator (AUTH_*): Verifies PGP sigs and role/capabilities
* IndexedDB support
* Basic project performance
  * plur/Config @ 100%
  * Well defined: Bootstrap -> IApplication -> IPlurNode -> IService
  * Operational: IPlurNode -> CommChannel <-> WebsocketClientService
  * Operational: IService <-> CommChannel
  * ES6 everything. Remove PlurPromise.
  * Basic JSDoc3 + ClosureDoc for everything.
    * @copyright, @license, and @module in every file.
    * @alias in every class.
    * @extends, @abstract, @interface, and @final for every class that needs them.
    * @type for every class member variable
    * @param, @returns, @throws for every class method that needs them.

Version 0.2.0
-------------
Google VM support

Version 0.3.0
-------------
Amazon VM support

Version 0.4.0
-------------
Android

Version 0.5.0
-------------
iOS

Version 0.6.0
-------------
Chrome Extension

Version 0.7.0
-------------
posgreSQL

Version 0.8.0
-------------
mySQL




