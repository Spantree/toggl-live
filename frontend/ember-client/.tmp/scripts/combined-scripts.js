(function() {

(function() {
  var ActivityDashboard;

  ActivityDashboard = window.ActivityDashboard = Ember.Application.create();


})();

(function() {

(function() {
  ActivityDashboard.ApplicationAdapter = DS.RESTAdapter.extend({
    namespace: 'api'
  });

  ActivityDashboard.Task = DS.Model.extend({
    name: DS.attr('string'),
    currentTask: DS.attr('string'),
    currentProject: DS.attr('string')
  });

}).call(this);


})();

(function() {

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


})();

(function() {

(function() {
  ActivityDashboard.IndexRoute = Ember.Route.extend({
    redirect: function() {
      return this.transitionTo("tasks");
    }
  });

}).call(this);


})();

(function() {

(function() {
  ActivityDashboard.TasksRoute = Ember.Route.extend({
    model: function() {
      return this.store.find('task');
    },
    setupController: function(controller, tasks) {
      controller.set('model', tasks);
      setInterval(function() {
        Ember.$.getJSON('/api/tasks').then(function(data) {
          var updatedTasks;
          updatedTasks = data.map(function(task) {
            if (task["currentTask"]) {
              return {
                name: task.name,
                task: task.currentTask,
                project: task.currentProject
              };
            } else {
              return {
                name: task.name,
                task: 'Idle'
              };
            }
          });
          controller.set('model', updatedTasks);
        });
      }, 1200000);
    }
  });

}).call(this);


})();

(function() {

(function() {
  ActivityDashboard.Router.map(function() {
    return this.resource('tasks');
  });

}).call(this);


})();

(function() {

}).call(this);


})();