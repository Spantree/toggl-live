ActivityDashboard.IndexRoute = Ember.Route.extend
   redirect: ->
      @transitionTo "tasks"

