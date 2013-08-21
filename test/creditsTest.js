var mongoose = require('mongoose'),
    should   = require('should'),
    sinon    = require('sinon'),
    utils    = require('./utils'),
    _        = require('underscore');

describe('creditsTest', function () {

    var user, modelUser;
    var UserSchema = utils.createDummySchema();
    before(function(done){
        utils.setDb(function () {
            modelUser = mongoose.model('users', UserSchema);
            user = new modelUser();
            user = utils.setFakeUserData(user);
            user.save(function (usr, arr) {
                done();
            });
        });
    });


    beforeEach(function (done) {
        done();
    });

    it('...', function () {
        true.should.be.true;
    });


    after(function(done){
        utils.cleanDb(done);
    });

});
