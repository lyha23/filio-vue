// uno.config.ts
import { resolve } from 'node:path';
import { defineConfig, presetWind } from 'unocss';
import presetAttributify from '@unocss/preset-attributify';
import presetIcons from '@unocss/preset-icons';
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders';
import transformerDirective from '@unocss/transformer-directives';
import transformerVariantGroup from '@unocss/transformer-variant-group';
import extractorPug from '@unocss/extractor-pug';

const iconDirectory = resolve(__dirname, 'icons');

export default defineConfig({
  rules: [['custom-rule', { color: 'red' }]],
  extractors: [extractorPug()],
  shortcuts: [{ logo: 'i-logos-vue w-6em h-6em transform transition-800' }],
  transformers: [transformerDirective(), transformerVariantGroup()],
  presets: [
    presetWind(),
    presetAttributify(),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
      collections: {
        custom: FileSystemIconLoader(iconDirectory),
      },
    }),
  ],
});
