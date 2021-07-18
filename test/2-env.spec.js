const assert = require('chai').assert;
const Config = require('../lib/Config');

describe('Environment variable config', () => {

    let config;

    beforeEach(() => {
        config = new Config();
    });

    it('Overrides value from environment', () => {
        // Given
        process.env.FOO = 'baz';
        config.init({
            config_dir: './test/2-env'
        });

        assert.equal(config.get('foo'), 'baz');
    });

    it('Reads nested values', () => {
        // Given
        process.env.SOME_NESTED_VALUE_IS = 'foobarbaz';
        config.init({
            config_dir: './test/2-env'
        });

        assert.equal(config.get('some.nested_value.is'), 'foobarbaz');
    });

    it('Converts integers from environment', () => {
        // Given
        process.env.MAX_CONNECTIONS = '100';
        config.init({ config_dir: './test/2-env' });

        assert.equal(config.get('max_connections'), 100);
    });

    it('Converts floats from environment', () => {
        // Given
        process.env.COEFFICIENT = '3.14';
        config.init({ config_dir: './test/2-env' });

        assert.equal(config.get('coefficient'), 3.14);
    });

    it('Converts booleans from environment', () => {
        // Given
        process.env.BACKUPS_ENABLED = 'true';
        process.env.LOGGING_ENABLED = 'false';
        config.init({ config_dir: './test/2-env' });

        assert.equal(config.get('backups.enabled'), true, 'backups.enabled must be true');
        assert.equal(config.get('logging.enabled'), false, 'logging.enabled must be false');
    });

    afterEach(() => {
        process.env = {};
    });

})