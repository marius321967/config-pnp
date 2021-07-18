Plug-and-play configuration from .json files and ENV variables.

[![NPM](https://nodei.co/npm/config-pnp.svg)](https://nodei.co/npm/config-pnp/)&nbsp;&nbsp;
[![Build Status](https://travis-ci.com/marius321967/config-pnp.svg?branch=master)](https://travis-ci.com/marius321967/config-pnp)

## Example

```js
// config/config.json or {env}.json
{
    "database": {
        "address": {
            "host": "foo.com",
            "port": 3306
        },
        // ...
    }
}
```

```
DATABASE_ADDRESS_HOST=bar.com
MIGRATIONS_ENABLED=true
MAX_CONNECTIONS=100
```

```js
const config = require('config-pnp')

config.init({
    directory: './config',
    environment: 'dev'
})

config.get('database.address.host') // "bar.com" - override from environment variable
config.get('database.address.port') // 3306
config.get('migrations.enabled') // true - parsed boolean
config.get('max_connections') // 100 - parsed integer
```

*Note: configuration values are immutable.*

## Precedence
1. config.json
2. `{env}`.json
3. Environment variables

## Configuration
```js
config.init({
    directory: './path/to/config', // or envvar NODE_CONFIG_DIR. Default: './config'
    environment: 'dev' // or envvar NODE_ENV. Use null to disable
})
```