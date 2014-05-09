Notes.Router.map ->
  this.resource('notes', {path: '/'}, ->
    this.route('note', {path: '/note/:note_id'})
  )
