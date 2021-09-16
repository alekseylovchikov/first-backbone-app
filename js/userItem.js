const UserItem = Backbone.Model.extend({
  defaults: {
    editMode: false,
    name: '',
    phone: '',
  },

  urlRoot: 'http://localhost:3000/users',

  validate(attrs) {
    const phoneRegex = /^\+?\d(\s?|-?)\d{3}(\s?|-?)\d{3}(\s?|-?)\d{2}(\s?|-?)\d{2}$/;
    if (!attrs.name) {
      return 'Name is required';
    }
    if (!attrs.phone || !phoneRegex.test(attrs.phone)) {
      return 'Phone is required and must be valid';
    }
  },

  toggleEditMode(editMode) {
    this.set({ editMode });
  },

  updateValue(updateUser) {
    this.set(updateUser);
    if (!this.validationError) {
      this.save();
    }
  },
});
