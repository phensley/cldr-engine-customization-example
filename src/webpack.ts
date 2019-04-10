import { CLDRFramework, Quantity, RegionIdType } from "@phensley/cldr-core";
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
  const locales = ['en-GB', 'es-419', 'fr-CA', 'de-AT'];
  for (const locale of locales) {
    const cldr = framework.get(locale);
    let s: string;

    const { tag } = cldr.General.locale();
    console.log(`Hello, visitor from ${cldr.General.getRegionDisplayName(tag.region() as RegionIdType)}`);

    const total = Math.random() * 99999;
    s = cldr.Numbers.formatCurrency(total, 'USD');
    console.log(`Your total is ${s}`);

    const qty: Quantity = { value: Math.random() * 1000, unit: 'megabyte' };
    console.log(`You've used ${cldr.Units.formatQuantity(qty)}`);

    console.log();
  }
};

main();
