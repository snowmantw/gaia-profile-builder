(function() {
  var builder = require('./run.js');
  builder.states.prepareDone = function(path) {
    console.log('donwload done with: ', path);
  };
  builder.prepare('/tmp/xulrunner');

  var buildCommand = function(module) {
    return builder.build(module)
      .xpcshell('./xulrunner-sdk-26/xulrunner-sdk/bin/XUL.framework/Versions/Current/xpcshell')
      .runMozilla('xulrunner-sdk-26/xulrunner-sdk/bin/XUL.framework/Versions/Current/run-mozilla.sh')
      .buildModulePath('./build')
      .xpcshellCommonjs('./build/xpcshell-commonjs.js')
      .done()
    .config()
      .path()
        .gaia('./')
        .profile('./profile')
        .distribution('./distribution')
        .apps(['./apps/calendar', './apps/system'])
        .locales('locales')
        .localesFile('shared/resources/languages.json')
      .done()
    .get()
    .run();
  };

  var finalCommand = "";

  // Need these to make the profile.
  ['preferences', 'settings', 'webapp-manifests',
   'webapp-optimize', 'webapp-zip'].forEach(function(module) {
    finalCommand = finalCommand + '\n' + buildCommand(module);
   });
  console.log('#!/bin/bash\n'+finalCommand);
})();
