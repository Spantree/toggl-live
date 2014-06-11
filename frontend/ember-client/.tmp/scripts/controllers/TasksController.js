(function() {
  ActivityDashboard.TaskController = Ember.ObjectController.extend({
    task: (function() {
      if (this.get('model.currentTask')) {
        return this.get('model.currentTask');
      } else {
        return 'Idle';
      }
    }).property('currentTask'),
    project: (function() {
      if (this.get('model.currentProject')) {
        return this.get('model.currentProject');
      } else {
        return 'No Project';
      }
    }).property('currentProject')
  });

  ActivityDashboard.TasksController = Ember.ArrayController.extend({
    sortProperties: ['name'],
    sortAscending: true,
    itemController: 'task'
  });

}).call(this);
