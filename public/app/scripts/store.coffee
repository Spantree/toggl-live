ActivityDashboard.ApplicationAdapter = DS.RESTAdapter.extend
  namespace: 'api'

ActivityDashboard.Task = DS.Model.extend(
  name: DS.attr('string')
  currentTask: DS.attr('string')
)
