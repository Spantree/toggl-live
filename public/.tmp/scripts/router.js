(function() {
  Notes.Router.map(function() {
    return this.resource('notes', {
      path: '/'
    }, function() {
      return this.route('note', {
        path: '/note/:note_id'
      });
    });
  });

}).call(this);
