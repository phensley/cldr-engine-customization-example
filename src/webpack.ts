import { CLDRFramework } from "@phensley/cldr-core";
import * as config from './config.json';

// statically embed languages
import * as english from '../packs/en.json';
import * as spanish from '../packs/es.json';
import * as french from '../packs/fr.json';
import * as italian from '../packs/it.json';
import * as german from '../packs/de.json';
import * as japanese from '../packs/ja.json';
import * as korean from '../packs/ko.json';
import * as chinese from '../packs/zh.json';

const packs = {
  en: english,
  es: spanish,
  fr: french,
  it: italian,
  de: german,
  ja: japanese,
  ko: korean,
  zh: chinese
};

const loader = (language: string): any => packs[language];

const framework = new CLDRFramework({
  loader,
  config
});

export const main = () => {
  for (const lang of ['en', 'es']) {
    const cldr = framework.get(lang);
    let s: string;

    s = cldr.Numbers.formatCurrency('1234.5678', 'USD');
    console.log(s);
    // "$1,234.57"

    // If a currency code is used that was not configured,
    // you'll see missing symbols.
    s = cldr.Numbers.formatCurrency('1234.5678', 'PTE');
    console.log(s);
    // " 1,234.57"
  }
};

main();
