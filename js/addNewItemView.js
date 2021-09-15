const AddNewItemView = Backbone.View.extend({
  model: UserItem,

  initialize(options) {
    if (!(options && options.model)) {
      throw new Error('Model is not specified');
    }
  },

  events: {
    'click #add': 'onClickAdd',
  },

  onClickAdd() {
    const name = document.getElementById('username');
    const phone = document.getElementById('phone');
    const nameValue = name.value.trim();
    const phoneValue = phone.value.trim();

    // reset errors
    name.style.border = null;
    phone.style.border = null;

    const newUser = new UserItem({ name: nameValue, phone: phoneValue });

    this.model.create(newUser);

    if (!newUser.validationError) {
      name.value = '';
      phone.value = '';
    }
  },

    render() {
      this.el.innerHTML = `
        <div class="form">
          <div style="display: flex; justify-content: space-between;">
            <label for="username">Name</label>
            <input autofocus type="text" id="username" />
          </div>
          <div style="display: flex; justify-content: space-between;">
            <label for="phone">Phone</label>
            <input type="text" placeholder="+7 999 123-45-67" id="phone" />
          </div>
          <button class="submit-btn" type="button" id="add">
            add new user
          </button>
        </div>
      `;

      return this;
    }
});
