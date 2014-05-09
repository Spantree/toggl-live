Notes.NotesController = Ember.ArrayController.extend(
  needs: ['notesNote']
  newNoteName: null
  selectedNoteBinding: 'controllers.notesNote.model'

  actions:
    createNewNote: ->
      content = this.get('content')
      newNoteName = this.get('newNoteName')
      unique = newNoteName != null && newNoteName.length > 1

      content.forEach (note) ->
        if newNoteName == note.get('name')
          unique = false
          return

      if unique
        newNote = this.store.createRecord('note')
        newNote.set('id', newNoteName)
        newNote.set('name', newNoteName)
        newNote.save()
        this.set('newNoteName', null)
      else
        alert("Note must have a unique name of at least 2 characters!")
    
    doDeleteNote: (note) ->
      this.set('noteForDeletion', note)
      $("#confirmDeleteNoteDialog").modal({"show": true})

    doCancelDelete: ->
      this.set('noteForDeletion', null)
      $("#confirmDeleteNoteDialog").model('hide')

    doConfirmDelete: ->
      selectedNote = this.get('noteForDeletion')
      this.set('noteForDeletion', null)
      if selectedNote
        this.store.deleteRecord(selectedNote)
        selectedNote.save()

        if this.get('controllers.notesNote.model.id') == selectedNote.get('id')
          this.transitionToRoute('notes')

        $("#confirmDeleteNoteDialog").modal('hide')
      
    
)
