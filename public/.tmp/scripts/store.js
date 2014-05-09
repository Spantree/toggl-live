(function() {
  Notes.Store = DS.Store.extend({
    adapter: DS.LSAdapter
  });

  Notes.Note = DS.Model.extend({
    name: DS.attr('string'),
    value: DS.attr('string')
  });

}).call(this);
