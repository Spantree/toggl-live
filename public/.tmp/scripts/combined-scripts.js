(function() {

(function() {
  var Notes;

  Notes = window.Notes = Ember.Application.create();


})();

(function() {

(function() {
  Notes.Store = DS.Store.extend({
    adapter: DS.LSAdapter
  });

  Notes.Note = DS.Model.extend({
    name: DS.attr('string'),
    value: DS.attr('string')
  });

}).call(this);


})();

(function() {

(function() {
  Notes.NotesController = Ember.ArrayController.extend({
    needs: ['notesNote'],
    newNoteName: null,
    selectedNoteBinding: 'controllers.notesNote.model',
    actions: {
      createNewNote: function() {
        var content, newNote, newNoteName, unique;
        content = this.get('content');
        newNoteName = this.get('newNoteName');
        unique = newNoteName !== null && newNoteName.length > 1;
        content.forEach(function(note) {
          if (newNoteName === note.get('name')) {
            unique = false;
          }
        });
        if (unique) {
          newNote = this.store.createRecord('note');
          newNote.set('id', newNoteName);
          newNote.set('name', newNoteName);
          newNote.save();
          return this.set('newNoteName', null);
        } else {
          return alert("Note must have a unique name of at least 2 characters!");
        }
      },
      doDeleteNote: function(note) {
        this.set('noteForDeletion', note);
        return $("#confirmDeleteNoteDialog").modal({
          "show": true
        });
      },
      doCancelDelete: function() {
        this.set('noteForDeletion', null);
        return $("#confirmDeleteNoteDialog").model('hide');
      },
      doConfirmDelete: function() {
        var selectedNote;
        selectedNote = this.get('noteForDeletion');
        this.set('noteForDeletion', null);
        if (selectedNote) {
          this.store.deleteRecord(selectedNote);
          selectedNote.save();
          if (this.get('controllers.notesNote.model.id') === selectedNote.get('id')) {
            this.transitionToRoute('notes');
          }
          return $("#confirmDeleteNoteDialog").modal('hide');
        }
      }
    }
  });

}).call(this);


})();

(function() {

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


})();

(function() {

(function() {
  Notes.NotesNoteRoute = Ember.Route.extend({
    model: function(note) {
      return this.store.find('note', note.note_id);
    }
  });

}).call(this);


})();

(function() {

(function() {
  Notes.NotesRoute = Ember.Route.extend({
    model: function() {
      return this.store.find('note');
    }
  });

}).call(this);


})();

(function() {

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


})();

(function() {

}).call(this);


})();