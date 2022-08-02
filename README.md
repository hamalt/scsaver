![Scsaver.js](https://github.com/hamalt/scsaver/blob/main/assets/img/scsaver_github_ogp.png?raw=true)

# Scsaver.js

[DEMO & Document](https://hamalt.github.io/scsaver/)

[![Latest Release](https://img.shields.io/github/tag/hamalt/scsaver.svg?label=release)](https://github.com/hamalt/scsaver/releases/latest) [![Stars](https://img.shields.io/github/stars/hamalt/scsaver.svg)](https://github.com/hamalt/scsaver/stargazers) [![License](https://img.shields.io/github/license/hamalt/scsaver.svg)](LICENSE)

Web page screensaver JavaScript library.
Beta version.

## What it is

It is a JavaScript library to realize the function of the screen saver on the web page.  
This program was used in an interactive video for booth installation.  
(I created it because I had to display a different video or image than the interactive video if there was no action.)

## Getting Started

### Step0: Build the file

Build with the following command:

```
npm install
or
yarn install
```

```
npm run build
```

`scsaver.min.js` is output to the `dist` folder.  
The CSS file is in the `src` directory.

Alternatively, you can use a CDN.

```
https://cdn.jsdelivr.net/npm/scsaver@latest/dist/scsaver.min.js
https://cdn.jsdelivr.net/npm/scsaver@latest/src/scsaver.css
```

### Step1: Load the required files

```html
<link rel="stylesheet" href="src/scsaver.css">
<script src="dist/scsaver.min.js"></script>
```

### Step2: Added Scsaver element

```html
<div id="scsaver" class="scsaver">
  <div class="scsaver-inner">
    <p>Hello, Scsaver.</p>
    <!-- Customize: Place images and videos and customize them to your liking. -->
  </div>
</div>
```

### Step3: Init Scsaver

```html
<script>
  const scsaver = new Scsaver('#scsaver');
</script>
```