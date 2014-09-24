var User   = require('./models/user');
var uuid   = require('node-uuid');
var jwt    = require('jsonwebtoken');
var crypto = require('crypto');

var Auth = function(jwtSecret, dataSecret) {
  function encrypt(data) {
    var cipher = crypto.createCipher('aes-256-cbc', dataSecret),
        crypted = cipher.update(data, 'utf8', 'hex');

    return crypted + cipher.final('hex');
  }

  function decrypt(data) {
    var decipher = crypto.createDecipher('aes-256-cbc', dataSecret),
        decrypted = decipher.update(data, 'hex', 'utf8');

    return decrypted + decipher.final('utf8');
  }

  this.check = function(username, password) {
    var user = User.find({ username: username });

    if (user && user.isValidPassword(password)) {
      return user;
    }

    return null;
  };

  this.generateToken = function(user) {
    var payload = {
      iat: new Date().getTime() / 1000,
      jti: uuid.v4(),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username
      }
    };

    var encryptedPayload = {
      token: encrypt(JSON.stringify(payload))
    };

    return jwt.sign(encryptedPayload, jwtSecret, { expiresInMinutes: 60*5 });
  };

  this.decodeToken = function(token) {
    var data = null;

    jwt.verify(token, jwtSecret, function(err, decoded) {
      if (!err) {
        data = JSON.parse(decrypt(decoded.token));
      }
    });

    return data;
  };
};

module.exports = Auth;
