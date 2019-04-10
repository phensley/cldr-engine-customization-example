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

const emit = (s: string) => {
  const elem = document.getElementById('output');
  if (elem) {
    elem.innerHTML = elem.innerHTML + s;
  }
};

export const main = () => {
  const locales = ['en-GB', 'es-419', 'fr-CA', 'de-AT', 'zh'];
  const zones = ['Europe/London', 'America/Sao_Paulo', 'Europe/Paris', 'Europe/Vienna', 'Asia/Beijing'];
  for (let i = 0; i < locales.length; i++) {
    const locale = locales[i];
    const zoneId = zones[i];
    framework.getAsync(locale).then(cldr => {
      let s: string;

      const { tag } = cldr.General.locale();
      emit(`Hello, visitor from ${cldr.General.getRegionDisplayName(tag.region() as RegionIdType)}\n`);

      s = cldr.Calendars.formatDate({ date: new Date(), zoneId }, { datetime: 'full' });
      emit(`The current date and time is ${s}\n`);

      const total = Math.random() * 99999;
      s = cldr.Numbers.formatCurrency(total, 'USD');
      emit(`Your total is ${s}\n`);

      const qty: Quantity = { value: Math.random() * 1000, unit: 'megabyte' };
      emit(`You've used ${cldr.Units.formatQuantity(qty, { maximumFractionDigits: 1 })}\n`);

      emit('\n');
    });
  }
};

main();
