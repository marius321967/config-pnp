const path = require('path');
const merge = require('lodash.merge');

module.exports = class Config {

    constructor() {
        this.cache = {},
        this.json = null;
    }
    
    init(settings) {
        const configDirAbsolute = path.resolve(__dirname, '../', settings.directory);
        this.json = require(`${configDirAbsolute}/config.json`);
        
        const environment = ('environment' in settings) ? settings.environment : process.env.NODE_ENV;
        if (environment)
            this.json = merge(this.json, require(`${configDirAbsolute}/${environment}.json`));
    }

    get(key) {
        if ( !(key in this.cache) ) {
            this.cache[key] = this.resolve(key);
        }

        return this.cache[key];
    }

    resolve(key) {
        // Parse from env
        const envKey = key.toUpperCase().replace(/\./g, '_');
        if (envKey in process.env)
            return this.parseEnvValue(process.env[envKey]);

        // Parse from JSON object
        const parts = key.split('.');
        
        let value = this.json;
        parts.forEach(index => value = value[index]);
        return value;
    }

    /**
     * @param {String} value 
     * @returns {String|Number|Boolean}
     */
    parseEnvValue(value) {
        if (value == 'true')  return true;
        if (value == 'false') return false;
        if (!isNaN(value))    return parseFloat(value);

        return value;
    }

}