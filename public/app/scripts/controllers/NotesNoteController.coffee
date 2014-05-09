Notes.NotesNoteController = Ember.ObjectController.extend(
  actions:
    updateNote: ->
      content = this.get('content')
      console.log(content)
      if content
        content.save()
)
