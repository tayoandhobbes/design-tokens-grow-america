// style-dictionary.config.js
import StyleDictionary from 'style-dictionary';


const isColor = token => token.type === 'color';
const isTypography = token => token.path[0] === 'typography';
const isSize = token => token.type === 'dimension' && token.path.includes('size', 'test');
const isSpacing = token => token.type === 'dimension' && token.path.includes('spacing');
const isRadius = token => token.type === 'dimension' && token.path.includes('radius-corner');
const isStroke = token => token.type === 'dimension' && token.path.includes('stroke');
const isOpacity = token => token.type === 'dimension' && token.path.includes('opacity');
const isMediaQuery = token => token.type === 'dimension' && token.path.includes('media-queries');

export default {
  source: ['tokens/**/*.json'],
      scss_variables: {
      transformGroup: 'scss',
      buildPath: 'build/scss/',
      files: [{
        destination: 'variables.scss',
        format: 'scss/variables'
      }]
    },
    json_tokens: {
      transformGroup: 'js',
      buildPath: 'build/json/',
      files: [{
        destination: 'tokens.json',
        format: 'json/nested'
      }]
    },
  platforms: {
    css_color: {
      transformGroup: 'css',
      buildPath: 'build/css/color/',
      files: [{
        destination: 'color.css',
        format: 'css/variables',
        filter: isColor
      }]
    },
    css_radius: {
      transformGroup: 'css',
      buildPath: 'build/css/radius/',
      files: [{
        destination: 'radius.css',
        format: 'css/variables',
        filter: isRadius
      }]
    },
    css_typography: {
      transformGroup: 'css',
      buildPath: 'build/css/typography/',
      files: [{
        destination: 'typography.css',
        format: 'css/variables',
        filter: isTypography
      }]
    },
    css_size: {
      transformGroup: 'css',
      buildPath: 'build/css/size/',
      files: [{
        destination: 'size.css',
        format: 'css/variables',
        filter: isSize
      }]
    },
    css_spacing: {
      transformGroup: 'css',
      buildPath: 'build/css/spacing/',
      files: [{
        destination: 'spacing.css',
        format: 'css/variables',
        filter: isSpacing
      }]
    },
    css_stroke: {
  transformGroup: 'css',
  buildPath: 'build/css/stroke/',
  files: [{
    destination: 'stroke.css',
    format: 'css/variables',
    filter: isStroke
  }]
},
css_opacity: {
  transformGroup: 'css',
  buildPath: 'build/css/opacity/',
  files: [{
    destination: 'opacity.css',
    format: 'css/variables',
    filter: isOpacity
  }]
},
css_media: {
  transformGroup: 'css',
  buildPath: 'build/css/media/',
  files: [{
    destination: 'media.css',
    format: 'css/variables',
    filter: isMediaQuery
  }]
},
all_tokens_json: {
  transformGroup: 'js',
  buildPath: 'build/json/',
  files: [{
    destination: 'all-tokens.json',
    format: 'json/nested'
  }]
},
  }
};
