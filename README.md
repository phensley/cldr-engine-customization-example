
# cldr-engine-customization-example

Demonstrates configuring the [`@phensley/cldr`](https://www.npmjs.com/package/@phensley/cldr) library, specifying which identifiers your application requires.
This lets you generate more compact resource packs, including only the data you need.

Not every attribute in the resource pack can be made optional. The library currently relies on some types of data always being present. Over time more data may become configurable / optional.

**EXPERIMENTAL** The API for customizing [cldr-engine](https://github.com/phensley/cldr-engine) via the `@phensley/cldr-core` package is new and therefore may not be as stable as importing the full `@phensley/cldr` library.

**NOTE** Since the library uses the confiugration to generate resource packs and create runtime schema linkage, the resource packs are fitted to the configuration. **Anytime the configuration is changed the resource packs MUST be regenerated.** Failure to do so will result in unpredictable behavior.

## Overview

The `@phensley/cldr-schema` package is used to both (1) generate resource packs and (2) build an accessor object at runtime that lets you fetch values from resource packs in a typesafe way.  The library uses a series of "key indices" which contain the identifiers used to index and encode the data in the resource pack.

For example, the index `"unit-id"` contains an array of all unit identifiers that will be used by the application. If this index is configured to contain `['mile', 'foot', 'inch']`, then data for only those 3 units will be encoded and accessible to the application.


Review this application's [customized config](./src/config.json) and [typescript code](./src/index.ts) to see an example of initializing and configuring the library.

### Config format
See [the docs for SchemaConfig](https://phensley.github.io/cldr-engine/docs/en/api-schemaconfig.html)