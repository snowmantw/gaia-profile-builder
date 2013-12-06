(function() {
  var fs = require('fs'),
      detectos = require('./detectos'),
      _path = require('path'),
      Configure = require('gaia-config-builder');

  /**
   * Resolver with '~' ability.
   *
   * @param {string} |path|
   * @return {string}
   */
  _resolvePath = function(path) {
    if (path.substr(0,1) === '~')
      path = process.env.HOME + path.substr(1);
    return _path.resolve(path);
  };

  exports.states = {
    'prepareDone': function(path){}
  };

  exports.buildOptions = {
    'xpcshell': '',
    'run-mozilla': '',
    'build-module-path': '',
    'build-module-uri': '',
    'xpcshell-commonjs': '',
    'config': '',
    'current-module': ''
  };

  exports.prepare = function(xulpath) {
    /*
    var mozdownload = require('mozilla-download');
    var options = {'product': 'xulrunner', 'branch': 'latest/sdk', 'os': detectos(),'language': 'en-US'};
    mozdownload(xulpath, options, function(err, path) {
      if (err)
        throw err;
      exports.states.prepareDone(path);
    });
    */
    //console.log('The mozilla-download needs heavy patches to download xulrunner...');
  };

  exports.run = function() {
    var RUN_MOZILLA = exports.buildOptions['run-mozilla'];
    var XPCSHELL = exports.buildOptions['xpcshell'];
    var EVAL_BUILDDIR="'const GAIA_BUILD_DIR=\"" + exports.buildOptions['build-module-uri'] + "\"'"
    var XPCSHELL_COMMONJS = exports.buildOptions['xpcshell-commonjs'];
    var MAGIC="'try { require(\"" + exports.buildOptions['current-module'] + "\").execute(" + JSON.stringify(exports.buildOptions.config) + "); quit(0);} catch(e) { dump(\"Exception:  \" + e + \"\\n\" + e.stack + \"\\n\"); throw(e); }'"
    var cmd = "" + RUN_MOZILLA + " " + XPCSHELL + " -e " + EVAL_BUILDDIR + " -f " + XPCSHELL_COMMONJS + " -e " + MAGIC;
    return cmd;
  };

  exports.build = function(module) {
    exports.buildOptions['current-module'] = module;
    return exports.builders;
  };

  exports.config = function(preset) {
    var bpath = exports.buildOptions['build-module-path'];
    var cpath = bpath + '/config.js';
    var cbuilder = Configure(preset);
    cbuilder.get = function() {
      exports.buildOptions.config = cbuilder.config;

      // Write the config to the build directory.
      fs.writeFileSync(cpath, 'exports.config = {' + JSON.stringify(cbuilder.config) + '}');
      return exports;
    };
    return cbuilder;
  };

  exports._xpcshell = function(path) {
    if(!fs.existsSync(path))
      throw 'The path: ' + path + ' doesn\'t exist.';
    exports.buildOptions.xpcshell = path;
    return exports.builders;
  };

  exports._runMozilla = function(path) {
    if(!fs.existsSync(path))
      throw 'The path: ' + path + 'doesn\'t exist.';
    exports.buildOptions['run-mozilla'] = path;
    return exports.builders;
  };

  exports._buildModulePath = function(path) {
    if(!fs.existsSync(path))
      throw 'The path: ' + path + ' doesn\'t exist.';
    exports.buildOptions['build-module-path'] = _resolvePath(path);
    exports.buildOptions['build-module-uri'] = 'file://' + _resolvePath(path) + '/';
    return exports.builders;
  };

  exports._xpcshellCommonjs = function(path) {
    if(!fs.existsSync(path))
      throw 'The path: ' + path + 'doesn\'t exist.';
    exports.buildOptions['xpcshell-commonjs'] = path;
    return exports.builders;
  };

  exports.builders = {
    'xpcshell': exports._xpcshell,
    'runMozilla': exports._runMozilla,
    'buildModulePath': exports._buildModulePath,
    'xpcshellCommonjs': exports._xpcshellCommonjs,
    'done': function() { return exports; }
  };
})();
