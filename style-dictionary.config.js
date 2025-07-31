// style-dictionary.config.js
import StyleDictionary from "style-dictionary";

export default {
  source: ["tokens/**/*.json"],
  platforms: {
    scss_variables: {
      transformGroup: "scss",
      buildPath: "build/scss/",
      files: [
        {
          destination: "variables.scss",
          format: "scss/variables",
        },
        {
          destination: "typography/typography.scss",
          format: "scss/variables",
          filter: (token) =>
            Array.isArray(token.path) &&
            token.path[0] === "typography" &&
            token.path.some((p) => p.endsWith("-impact")),
        },
        {
          destination: "color/color.scss",
          format: "scss/variables",
          filter: (token) =>
            Array.isArray(token.path) && token.path.includes("color"),
        },
        {
          destination: "media/media.scss",
          format: "scss/variables",
          filter: (token) => token.path.includes("media-queries"),
        },
        {
          destination: "spacing/spacing.scss",
          format: "scss/variables",
          filter: (token) => token.path.includes("spacing"),
        },
        {
          destination: "radius/radius.scss",
          format: "scss/variables",
          filter: (token) => token.path.includes("radius-corner"),
        },
        {
          destination: "stroke/stroke.scss",
          format: "scss/variables",
          filter: (token) =>
            Array.isArray(token.path) && token.path.includes("stroke"),
        },
        {
          destination: "opacity/opacity.scss",
          format: "scss/variables",
          filter: (token) => token.path.includes("opacity"),
        },
      ],
    },
    json: {
      transformGroup: "js",
      buildPath: "build/json/",
      files: [
        {
          destination: "tokens.json",
          format: "json/flat",
        },
      ],
    },
    css: {
      transformGroup: "css",
      buildPath: "build/css/",
      files: [
        {
          destination: "stroke/stroke.css",
          format: "css/variables",
          filter: (token) =>
            Array.isArray(token.path) && token.path.includes("stroke"),
        },
        {
          destination: "typography/typography.css",
          format: "css/variables",
          filter: (token) =>
            Array.isArray(token.path) &&
            token.path[0] === "typography" &&
            token.path.some((p) => p.endsWith("-impact")),
        },
        {
          destination: "spacing/spacing.css",
          format: "css/variables",
          filter: (token) => token.path.includes("spacing"),
        },
        {
          destination: "radius/radius.css",
          format: "css/variables",
          filter: (token) => token.path.includes("radius-corner"),
        },
        {
          destination: "opacity/opacity.css",
          format: "css/variables",
          filter: (token) => token.path.includes("opacity"),
        },
        {
          destination: "media/media.css",
          format: "css/variables",
          filter: (token) => token.path.includes("media-queries"),
        },
        {
          destination: "color/color.css",
          format: "css/variables",
          filter: (token) =>
            Array.isArray(token.path) && token.path.includes("color"),
        },
      ],
    },
  },
};
