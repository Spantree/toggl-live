(function() {
  var Notes;

  Notes = window.Notes = Ember.Application.create();

  require('scripts/store');

  require('scripts/controllers/*');

  require('scripts/models/*');

  require('scripts/routes/*');

  require('scripts/views/*');

  require('scripts/router');

}).call(this);
