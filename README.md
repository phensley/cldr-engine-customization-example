
# cldr-engine-customization-example

Demonstrates configuring the [`@phensley/cldr`](https://www.npmjs.com/package/@phensley/cldr) library, specifying which identifiers your application requires.
This lets you generate more compact resource packs, including only the data you need.


**EXPERIMENTAL** The API for customizing [cldr-engine](https://github.com/phensley/cldr-engine) via the `@phensley/cldr-core` package is new and therefore may not be as stable as importing the full `@phensley/cldr` library.

## Overview

The `@phensley/cldr-schema` package is used to both (1) generate resource packs and (2) build an accessor object at runtime that lets you fetch values from resource packs in a typesafe way.  The library uses a series of "key indices" which contain the identifiers used to index and encode the data in the resource pack.

For example, the index `"unit-id"` contains an array of all unit identifiers that will be used by the application. If this index is configured to contain `['mile', 'foot', 'inch']`, then data for only those 3 units will be encoded and accessible to the application.


Review this application's [customized config](./src/config.json) and [typescript code](./src/index.ts) to see an example of initializing and configuring the library.

### Config format

The object below shows which attributes can be configured and what they do.

```typescript
export interface SchemaConfig {
  /**
   * Additional calendar types to include besides "gregorian".
   *
   * Ex: ['buddhist', 'japanese', 'persian']
   */
  calendars?: string[];

  /**
   * Currency codes to include.
   *
   * Ex: ['USD', 'EUR', 'GBP', 'JPY', 'CAD', ... ]
   */
  ['currency-id']?: string[];

  /**
   * Language identifiers to include. Used to pull in display name data.
   *
   * Ex: ['en', 'fr', 'es']
   */
  ['language-id']?: string[];

  /**
   * Script identifiers to include. Used to pull in display name data.
   *
   * Ex: ['Latn', 'Cyrl']
   */
  ['script-id']?: string[];

  /**
   * Region identifiers to include. Used to pull in display name data.
   *
   * Ex: ['001', 'US', '419', 'AR', 'GB']
   */
  ['region-id']?: string[];

  /**
   * Units to include.
   *
   * Ex: ['meter', 'kilogram', 'foot']
   */
  ['unit-id']?: string[];

  /**
   * Number system names to include besides 'latn'.
   *
   * Ex: ['arab', 'arabext', 'laoo']
   */
  ['number-system-name']: string[];
}
```
