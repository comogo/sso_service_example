var User = function(options) {
  var that = this;
  this.id = options.id;
  this.name = options.name;
  this.username = options.username;
  this.email = options.email;
  this.password = options.password;

  this.isValidPassword = function(password) {
    return password == that.password;
  };
};

User.repository = [
  new User({ id: 1, name: 'Administrator', username: 'admin', email: 'admin@foo.com', password: 'admin' })
];

// Returns null or the founded user
User.find = function(options) {
  var users = this.repository,
      username = options.username;

  for(var i in users) {
    if (users[i].username == username) {
      return users[i];
    }
  }

  return null;
};

User.add = function(user) {
  user.id = this.repository.length + 1;

  this.repository.push(user);
};

module.exports = User;
