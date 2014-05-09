Notes.NotesNoteRoute = Ember.Route.extend(
  model: (note) ->
    return this.store.find('note', note.note_id)
)
