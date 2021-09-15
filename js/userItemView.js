const UserItemView = Backbone.View.extend({
  initialize(options) {
    if (!(options && options.model)) {
      throw new Error('Model is not specified');
    }

    this.model.on('change', this.render, this);
  },

  tagName: 'tr',

  events: {
    'click .edit': 'onClickEdit',
    'click .delete': 'onClickDelete',
  },

  onClickEdit() {
    if (this.model.get('editMode')) {
      const nameValue = document.getElementById('editName').value;
      const phoneValue = document.getElementById('editPhone').value;

      this.model.toggleEditMode(false);

      this.model.updateValue({ name: nameValue, phone: phoneValue });

      if (this.model.validationError) {
        alert(this.model.validationError);
        this.model.save(this.model._previousAttributes);
      }
    } else {
      this.model.toggleEditMode(true);
    }
  },

  onClickDelete() {
    if (confirm('Are you sure?')) {
      this.model.destroy();
    }
  },

  render() {
    // clear element
    this.el.innerHTML = '';

    const tdName = document.createElement('td');
    const tdPhone = document.createElement('td');
    const tdActions = document.createElement('td');

    if (!this.model.get('editMode')) {
      tdName.innerText = this.model.escape('name');
      tdPhone.innerText = this.model.escape('phone');
    } else {
      const nameInput = document.createElement('input');
      const phoneInput = document.createElement('input');

      nameInput.id = 'editName';
      phoneInput.id = 'editPhone';
      nameInput.value = this.model.escape('name');
      phoneInput.value = this.model.escape('phone');

      tdName.append(nameInput);
      tdPhone.append(phoneInput);
    }
    tdActions.innerHTML = `
      <button class="edit">${this.model.get('editMode') ? 'save' : 'edit'}</button>
      <button class="delete">delete</button>
    `;

    this.el.append(tdName);
    this.el.append(tdPhone);
    this.el.append(tdActions);
    this.el.id = this.model.id;

    return this;
  },
});
