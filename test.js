(function() {
  var builder = require('./run.js');
  builder.states.prepareDone = function(path) {
    console.log('donwload done with: ', path);
  };
  builder.prepare('/tmp/xulrunner');
  builder.build()
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
      .apps(['./apps/gaia-calendar', './apps/system'])
      .locales('locales')
      .localesFile('shared/resources/languages.json')
    .done()
  .get()
  .run();
})();
