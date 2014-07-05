ActivityDashboard.TaskController = Ember.ObjectController.extend
  task: (->
    if @get('model.currentTask')
      return @get('model.currentTask')
    else
      return 'Idle'
  ).property('currentTask')

  project: (  ->
    if @hasCurrentProject()
      return @get('model.currentProject')
    else
      return 'No Project'
  ).property('currentProject')

  isAvailable: ( ->
    unless @hasCurrentTask() == 'Idle'
      console.log "has current Task: ", @get('model.currentTask')
      "list-group-item alert alert-success"
    else
      "list-group-item alert alert-danger"
  ).property('currentTask')

  hasCurrentProject: ->
    @get('model.currentProject')

  hasCurrentTask: ->
    @get('model.currentTask')


ActivityDashboard.TasksController = Ember.ArrayController.extend
  sortProperties: ['name']
  sortAscending: true
  itemController: 'task'


