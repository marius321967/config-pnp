const Config = require('./Config');
const path = require('path');

module.exports = {

    instance: null,

    init(settings) {
        this.instance = new Config();
        this.instance.init(settings);
    },

    get(key) {
        // Implicit init with defaults
        if (this.instance === null)
            this.init({
                directory: process.env.NODE_CONFIG_DIR || path.join(process.cwd(), 'config')
            });

        return this.instance.get(key);
    },

}