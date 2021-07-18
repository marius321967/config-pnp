const assert = require('chai').assert;
const Config = require('../lib/Config');

describe('.json config', () => {
    let config;

    beforeEach(() => {
        config = new Config();
    });

    it('Loads config.json from custom config_dir', () => {
        // Given
        // NODE_ENV missing
        config.init({
            config_dir: './test/1-json'
        });

        assert.equal(config.get('foo'), 'bar');
        assert.equal(config.get('baz'), 'foo');
    });

    it('Overrides with environment-specific JSON', () => {
        // Given
        process.env.NODE_ENV = 'test';
        config.init({
            config_dir: './test/1-json'
        });

        assert.equal(config.get('foo'), 'baz');
    });

    it('Reads nested values', () => {
        // Given
        process.env.NODE_ENV = 'test-nested';
        config.init({
            config_dir: './test/1-json'
        });

        assert.equal(config.get('foo.bar.baz'), 100);
    });

    afterEach(() => {
        process.env = {};
    });

})