# design-tokens-grow-america

design tokens for Grow America

This repo converts Figma variables into clean, production-ready CSS and SCSS tokens using Style Dictionary.

It supports rem→px conversion, organized typography utilities, and folder-based output for clarity and modularity.

# Installation

Clone the repository
git clone https://github.com/tayoandhobbes/design-tokens-grow-america
cd design-tokens-grow-america

Install dependencies
npm install

ensure node is installed
node -v
npm -v

If node is not download it here
https://nodejs.org/

# How It Works

Step 1: Figma Setup

1. In Figma, define all your tokens using Variables (colors, typography, spacing, etc.).
2. Use the Figma Tokens Plugin to export your tokens as a JSON file.
3. Place the exported .json file inside the tokens/ directory.

# Step 2: Build Tokens

To generate design tokens:
npm run build

This will:
• Convert your JSON tokens to:
• SCSS variables (in build/scss/)
• CSS custom properties (in build/css/)
• Apply postprocessing steps like:
• Converting rem to px
• Cleaning typography naming
• Generating utility classes for typography styles

# Output Structure

build/
├── css/
│ ├── typography/
│ ├── spacing/
│ └── ...
└── scss/
├── typography/
├── spacing/
└── ...
Each token category (e.g. color, spacing, typography) is exported to its own folder and file for modular use.

# Postprocessing Tasks

After Style Dictionary builds the base files, custom scripts do the following:
• 🔁 Convert rem → px (for teams using px units)
• ✨ Add alias variables (e.g. --opacity-visible: var(--opacity-full))
• 🧠 Organize typography tokens into readable utility classes

    These scripts are located in:
    scripts/

└── postprocess/
├── css/
└── scss/

# Commands Summary

npm install
Install dependencies
npm run build
Build tokens and apply postprocessing
