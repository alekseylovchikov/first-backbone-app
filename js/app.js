const addNewContainer = document.getElementById('add-new');
const tableUsers = document.querySelector('#users');

const userItems = new UserItems();
userItems.fetch();

const userItemsView = new UserItemsView({ model: userItems });
const addNewItemView = new AddNewItemView({ model: userItems });

addNewContainer.append(addNewItemView.render().el);
tableUsers.append(userItemsView.render().el);
