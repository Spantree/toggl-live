ActivityDashboard.TaskController = Ember.ObjectController.extend
  task: (->
    if @get('model.currentTask') then return @get('model.currentTask') else return 'Idle'
  ).property('currentTask')

  project: (  ->
    if @get('model.currentProject') then return @get('model.currentProject') else return 'No Project'
  ).property('currentProject')


ActivityDashboard.TasksController = Ember.ArrayController.extend
  sortProperties: ['name']
  sortAscending: true
  itemController: 'task'


