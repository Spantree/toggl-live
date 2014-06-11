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
