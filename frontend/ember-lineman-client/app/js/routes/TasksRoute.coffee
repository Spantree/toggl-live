ActivityDashboard.TasksRoute = Ember.Route.extend
  model: ->
    @store.find('task').then (task) =>
      ActivityDashboard.user = @store.metadataFor('task').user
      task

  setupController: (controller, tasks) ->
    controller.set('model', tasks)
    setInterval =>
      @store.find('task')
    , 120000
    return

  actions:
    error: (reason, transition) ->
      console.log "REASON: ", reason
      if reason.status == 401
        window.location = '/login'

    
