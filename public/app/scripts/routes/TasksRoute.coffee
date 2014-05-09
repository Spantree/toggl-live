ActivityDashboard.TasksRoute = Ember.Route.extend
  model: ->
    Ember.$.getJSON('http://localhost:9000/api/tasks').then (data) ->
      data.map (task) ->
        if task["currentTask"]
          {name: task.name, task: task.currentTask}
        else
          {name: task.name, task: 'Idle'}
    
