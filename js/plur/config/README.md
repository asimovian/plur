plur / Config
=============

Synopsis
--------

Config represents configuration settings for class objects. Configuration templates and default values are defined per class. Templates and values follow basic rules of inheritance. Classes and objects that use plur/Config are considered configurable.

Persitence
----------
Settings are accesible as a nested primitive object. Data is serialized with JSON and stored on the filesystem in a directory structure that mirrors the configurable class's namepath, located in "cfg/" in a standard plur project. Named the same as the class with ".cfg.json" as the extension. E.g., myPlurPackage/cfg/myOrg/stuff/Thing.cfg.json

Mutability
----------

Each config object is completely imutable. Changes to class object settings involves creating anew merge()'d copy reflecting the new values. The mergeTemplate() method allows for both data and template manipulation.

Configurable
------------

Classes that implement the IConfigurable interface are expected to maintain an immutable copy of Config on construction and handle runtime changes to settings separately.

Implementing classes should provide methods config() and getConfig() to retrieve the primitive config data and the Config object, respectively. The getDefaultConfig() static method should provide the default class Config. Constructors should accept a config object to merge() with if settings are expected to differ from the class default.

Loading
-------

The plur/config/Loader acts as a config class loader and factory. Classes, namepaths, URIs, and pre-existing data may be provided to retrieve and create a Config object. Named config-sets can be loaded by providing class/namepath and the config-set name.

Filesystem Standard
-------------------

When stored in a standard plur project, Config files should exist in the ./cfg directory. The directory heirarchy and filename should reflect the configurable class's namepath, jus as JS source files do. The extension should be ".cfg.json". E.g., ./cfg/myOrg/stuff/Thing.cfg.json or cfg/myOrg/stuff/Thing.InternalThing.cfg.json

Any number of non-default configuration sets may be defined using a token name. E.g., ./cfg/myOrg/stuff/Thing.myConfig.cfg.json


