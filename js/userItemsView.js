const UserItemsView = Backbone.View.extend({
  tagName: 'tbody',

  initialize(options) {
    if (!(options && options.model)) {
      throw new Error('Model is not specified');
    }

    this.model.on('add', this.onAddNewUserItem, this);
    this.model.on('remove', this.onRemoveUserItem, this);
  },

  onRemoveUserItem(userItem) {
    const item = document.getElementById(userItem.id);
    item.remove();
  },

  onAddNewUserItem(userItem) {
    const view = new UserItemView({ model: userItem });
    const isValid = view.model.isValid(['name', 'phone']);
    if (isValid) {
      this.el.append(view.render().el);
    } else if (view.model.validationError) {
      alert(view.model.validationError);
    }
  },

  render() {
    this.model.each((userItem) => {
      const view = new UserItemView({ model: userItem });
      this.el.append(view.render().el);
    });

    return this;
  },
});
