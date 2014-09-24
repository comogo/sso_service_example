var User = function(options) {
  var that = this;
  this.id = options.id;
  this.name = options.name;
  this.username = options.username;
  this.email = options.email;
  this.password = options.password;

  this.isValidPassword = function(password) {
    // TODO: improve this
    return password == that.password;
  };
};

// Returns null or the founded user
User.find = function(options) {
  // TODO: improve this
  if (options.username == 'admin') {
    return new User({
      id: 14,
      name: 'Administrator',
      username: 'admin',
      email: 'admin@foo.com',
      password: '123456'
    });
  }

  return null;
};

module.exports = User;
