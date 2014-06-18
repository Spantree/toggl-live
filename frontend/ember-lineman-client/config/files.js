module.exports = function(lineman) {
  return {

     js: {
       vendor: [
         "vendor/js/underscore.js",
         "vendor/js/jquery.js",
         "vendor/js/handlebars-runtime.js",
         "vendor/js/ember.js",
         "vendor/js/ember-data.js",
         "vendor/js/**/*.js"
       ]
     }

  };
};
