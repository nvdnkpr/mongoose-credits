var mongoose = require('mongoose'),
    should   = require('should'),
    utils    = require('./utils'),
    credits  = require('../lib/credits');

describe('creditsTest', function () {

    /**
     * Returns a random number in the range 0-99
     */
    var getRandom = function () {
        return Math.floor(Math.random()*100);
    };

    var defaultCredits = getRandom();
    var softMinimum = getRandom();

    var user, modelUser;
    var UserSchema = utils.createDummySchema();
    UserSchema.plugin(credits, {
        default : defaultCredits,
        softMinimum : softMinimum,
    });
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

    it('should set the default credits', function () {
        user
            .getCredits()
            .should.equal(defaultCredits);
    });

    it('should indicate there are credits', function () {
        user
            .hasCredits()
            .should.equal.true;
    });

    it('should set credits correctly', function () {
        var randCredits = getRandom();
        user
            .setCredits(randCredits)
            .getCredits()
            .should.equal(randCredits);
    });

    it('should add credits correctly', function () {
        var randCredits = getRandom();
        var creditsDelta = getRandom();
        user
            .setCredits(randCredits)
            .addCredits(creditsDelta)
            .getCredits()
            .should.equal(randCredits + creditsDelta);
    });

    it('should reset credits', function () {
        user
            .resetCredits()
            .getCredits()
            .should.equal(0);
    });

    it('should alert when credits are running out', function () {
        user
            .setCredits(softMinimum + 1)
            .isCreditsRunningOut()
            .should.be.false;
        user
            .setCredits(softMinimum - 1)
            .isCreditsRunningOut()
            .should.be.true;
    });

    after(function(done){
        utils.cleanDb(done);
    });

});
