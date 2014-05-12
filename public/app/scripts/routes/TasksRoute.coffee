ActivityDashboard.TasksRoute = Ember.Route.extend
  model: ->
     @store.find('task')
     #Ember.$.getJSON('http://localhost:9000/api/tasks').then (data) ->
     #  data.map (task) ->
     #    if task["currentTask"]
     #      {name: task.name, task: task.currentTask, status: 'busy'}
     #    else
     #      {name: task.name, task: 'Idle', status: 'available'}

   setupController: (controller, tasks) ->
      controller.set('model', tasks)
      setInterval ->
         Ember.$.getJSON('/api/tasks').then (data) ->
            updatedTasks = data.map (task) ->
              if task["currentTask"]
                {name: task.name, task: task.currentTask, project: task.currentProject}
              else
                {name: task.name, task: 'Idle'}
            controller.set('model', updatedTasks)
            return
         return
      , 1200000
      return

    
