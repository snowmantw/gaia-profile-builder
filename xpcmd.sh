The mozilla-download needs heavy patches to download xulrunner...
xulrunner-sdk-26/xulrunner-sdk/bin/XUL.framework/Versions/Current/run-mozilla.sh ./xulrunner-sdk-26/xulrunner-sdk/bin/XUL.framework/Versions/Current/xpcshell -e 'const GAIA_BUILD_DIR="file:///Users/snowmantw/Projects/gaia-profile-builder/build/"' -f ./build/xpcshell-commonjs.js -e 'try { require("applications-data").execute({"GAIA_DIR":"/Users/snowmantw/Projects/gaia-profile-builder","PROFILE_DIR":"./profile","PROFILE_FOLDER":"profile","GAIA_SCHEME":"http://","GAIA_DOMAIN":"gaiamobile.org","DEBUG":1,"LOCAL_DOMAINS":1,"DESKTOP":1,"DEVICE_DEBUG":0,"HOMESCREEN":"http://system.gaiamobile.org","GAIA_PORT":8080,"GAIA_LOCALES_PATH":"locales","LOCALES_FILE":"shared/resources/languages.json","GAIA_KEYBOARD_LAYOUTS":"en,pt-BR,es,de,fr,pl","BUILD_APP_NAME":"*","PRODUCTION":0,"GAIA_OPTIMIZE":0,"GAIA_DEV_PIXELS_PER_PX":1,"DOGFOOD":0,"OFFICIAL":"","GAIA_DEFAULT_LOCALE":"en-US","GAIA_INLINE_LOCALES":1,"GAIA_CONCAT_LOCALES":1,"GAIA_ENGINE":"xpcshell","GAIA_DISTRIBUTION_DIR":"/Users/snowmantw/Projects/gaia-profile-builder/distribution","GAIA_APPDIRS":"./apps/gaia-calendar ./apps/system","NOFTU":1,"REMOTE_DEBUGGER":0,"TARGET_BUILD_VARIANT":"","SETTINGS_PATH":"build/custom-settings.json","VARIANT_PATH":""}); quit(0);} catch(e) { dump("Exception:  " + e + "\n" + e.stack + "\n"); throw(e); }'