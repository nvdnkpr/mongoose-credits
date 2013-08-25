var mongoose         = require('mongoose'),
    stripeCustomer   = require('../lib/credits');
    Faker            = require('Faker');
    DatabaseCleaner  = require('database-cleaner');

var dbConnection = 'mongodb://127.0.0.1/testing';

module.exports.createDummySchema = function () {
    var UserSchema = new mongoose.Schema({
        name : {
            first : String,
            last  : String,
        },
        email : String,
    });
    return UserSchema;
};

module.exports.setFakeUserData = function (user) {
    user.name.first = Faker.Name.firstName();
    user.name.last = Faker.Name.lastName();
    user.email = Faker.Internet.email();
    return user;
};

module.exports.setDb = function (fn) {
    mongoose.connect(dbConnection);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    mongoose.connection.db.once('open', function(err, db) {
        fn();
    });
};

module.exports.cleanDb = function (fn) {
    var databaseCleaner = new DatabaseCleaner('mongodb');
    databaseCleaner.clean(mongoose.connection.db, function () {
        mongoose.connection.close(function () {
            mongoose.disconnect(function () {
                fn();
            });
        });
    });
};
