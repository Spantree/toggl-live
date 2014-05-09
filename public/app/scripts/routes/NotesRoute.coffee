Notes.NotesRoute = Ember.Route.extend(
  model: ->
    return this.store.find('note')
)
