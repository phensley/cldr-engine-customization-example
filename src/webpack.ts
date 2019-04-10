import { CLDRFramework, Quantity, RegionIdType } from "@phensley/cldr-core";
import * as config from './config.json';

/**
 * Dynamic import of resource packs.
 */
const asyncLoader = (language: string): any =>
 import(/* webpackChunkName: "cldr-pack-" */ `../../packs/${language}.json`).then(d => d.default);

const framework = new CLDRFramework({
  asyncLoader,
  config
});

export const main = () => {
  const locales = ['en-GB', 'es-419', 'fr-CA', 'de-AT'];
  for (const locale of locales) {
    framework.getAsync(locale).then(cldr => {
      let s: string;

      const { tag } = cldr.General.locale();
      console.log(`Hello, visitor from ${cldr.General.getRegionDisplayName(tag.region() as RegionIdType)}`);

      const total = Math.random() * 99999;
      s = cldr.Numbers.formatCurrency(total, 'USD');
      console.log(`Your total is ${s}`);

      const qty: Quantity = { value: Math.random() * 1000, unit: 'megabyte' };
      console.log(`You've used ${cldr.Units.formatQuantity(qty)}`);

      console.log();
    });
  }
};

main();
