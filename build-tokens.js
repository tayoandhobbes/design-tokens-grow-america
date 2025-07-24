// build-tokens.js
import StyleDictionary from 'style-dictionary';
import config from './style-dictionary.config.js';

async function buildTokens() {
  const sd = new StyleDictionary(config);
  await sd.buildAllPlatforms();
}

buildTokens().catch(e => {
  console.error(e);
  process.exit(1);
});