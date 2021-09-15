const UserItems = Backbone.Collection.extend({
  model: UserItem,

  url: 'http://localhost:3000/users',
});
