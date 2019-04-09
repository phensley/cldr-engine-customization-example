import * as fs from 'fs';
import { join } from 'path';

import { CLDRFramework } from '@phensley/cldr-core';
import * as config from './config.json';

export const loader = (language: string): any => {
  const path = join(__dirname, '..', 'packs', `${language}.json`);
  return fs.readFileSync(path).toString('utf-8');
};

const framework = new CLDRFramework({
  loader,
  config
});

const cldr = framework.get('en');
let s: string;

s = cldr.Numbers.formatCurrency('1234.5678', 'USD');
console.log(s);

// If a currency code is missing from the schema, you'll see missing symbols.
s = cldr.Numbers.formatCurrency('1234.5678', 'PTE');
console.log(s);
