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
