ActivityDashboard.TasksRoute = Ember.Route.extend
  model: ->
    @store.find('task').then (task) =>
      ActivityDashboard.user = @store.metadataFor('task').user
      task

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

  actions:
    error: (reason, transition) ->
      console.log "REASON: ", reason
      if reason.status == 401
        window.location = '/login'

    
