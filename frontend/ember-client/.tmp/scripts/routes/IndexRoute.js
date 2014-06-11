(function() {
  ActivityDashboard.IndexRoute = Ember.Route.extend({
    redirect: function() {
      return this.transitionTo("tasks");
    }
  });

}).call(this);
