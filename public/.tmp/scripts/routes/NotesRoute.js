(function() {
  Notes.NotesRoute = Ember.Route.extend({
    model: function() {
      return this.store.find('note');
    }
  });

}).call(this);
