ActivityDashboard.TaskController = Ember.ObjectController.extend
  task: ->
    if @get('model.currentTask') then @get('model.currentTask') else 'Idle'

ActivityDashboard.TasksController = Ember.ArrayController.extend
  sortProperties: ['name']
  sortAscending: true
  itemController: 'task'


