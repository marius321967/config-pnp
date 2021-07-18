const assert = require('chai').assert;
const config = require('../lib');

describe('Library facade', () => {
    beforeEach(() => {
        config.instance = null;
    });

    it('Direct configuration access works', () => {
        // Given
        config.init({
            directory: './test/1-json',
            environment: null,
        });

        assert.equal(config.foo.bar.baz, 100);
    });

})