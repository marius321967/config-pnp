const Config = require('./Config');

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
                config_dir: process.env.NODE_CONFIG_DIR || './config'
            });

        return this.instance.get(key);
    },

}