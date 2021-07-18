const assert = require('chai').assert;
const Config = require('../lib/Config');

describe('.json config', () => {
    let config;

    beforeEach(() => {
        config = new Config();
    });

    it('Loads config.json from custom directory', () => {
        // Given
        // NODE_ENV missing
        config.init({
            directory: './test/1-json'
        });

        assert.equal(config.get('foo'), 'bar');
        assert.equal(config.get('baz'), 'foo');
    });

    it('Overrides with environment-specific JSON', () => {
        // Given
        process.env.NODE_ENV = 'test';
        config.init({
            directory: './test/1-json'
        });

        assert.equal(config.get('foo'), 'baz');
    });

    it('Accepts environment override from init()', () => {
        // Given
        process.env.NODE_ENV = 'test';
        config.init({
            directory: './test/1-json',
            environment: 'test-env-override'
        });

        assert.equal(config.get('foo'), 'true-value');
    });

    it('Reads nested values', () => {
        // Given
        process.env.NODE_ENV = 'test-nested';
        config.init({
            directory: './test/1-json'
        });

        assert.equal(config.get('foo.bar.baz'), 100);
    });

    it('Returns JSON objects', () => {
        // Given
        process.env.NODE_ENV = 'test-nested';
        config.init({ directory: './test/1-json' });

        assert.deepEqual(config.get('foo'), { bar: { baz: 100 } });
    });

    afterEach(() => {
        process.env = {};
    });

})