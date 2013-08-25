module.exports = exports = function credits (schema, options) {

    var defaultCredits = options.default || 0;

    schema.add({ 
        credits : { type: Number, default: defaultCredits },
    });

    /**
     * Is there at least one credit left?
     *
     * @return {bool}
     */
    schema.methods.hasCredits = function () {
        return Boolean(this.getCredits() >= 1);
    };

    /**
     * Set credits
     *
     * @param {int} credits
     * @return {Object}
     */
    schema.methods.setCredits = function (credits) {
        this.credits = credits;
        return this;
    };

    /**
     * Reset credits
     *
     * @return {Object}
     */
    schema.methods.resetCredits = function () {
        this.setCredits(0);
        return this;
    };

    /**
     * Add credits
     *
     * @param {int} credits
     * @return {Object}
     */
    schema.methods.addCredits = function (credits) {
        this.credits += credits;
        return this;
    };

    /**
     * Get credits
     *
     * @return {int}
     */
    schema.methods.getCredits = function () {
        return this.credits;
    };

    /**
     * Checks if credits are running out
     *
     * @return {bool}
     */
    schema.methods.isCreditsRunningOut = function () {
        return Boolean(this.getCredits() < options.softMinimum);
    };

};
