const Config = require('./Config');
const path = require('path');

const library = {

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

};

const proxyHandler = {
    get: (library, prop) => 
        (prop in library)
            ? library[prop] // Return facade property
            : library.get(prop) // Return first-level configuration value
}

// Combine Config wrapper and direct accessor config
module.exports = new Proxy(library, proxyHandler);