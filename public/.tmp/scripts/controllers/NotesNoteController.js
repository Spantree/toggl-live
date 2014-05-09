(function() {
  Notes.NotesNoteController = Ember.ObjectController.extend({
    actions: {
      updateNote: function() {
        var content;
        content = this.get('content');
        console.log(content);
        if (content) {
          return content.save();
        }
      }
    }
  });

}).call(this);
