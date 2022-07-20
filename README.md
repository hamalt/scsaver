# Scsaver.js

[DEMO & Document](https://hamalt.github.io/scsaver/)

[![Latest Release](https://img.shields.io/github/tag/hamalt/scsaver.svg?label=release)](https://github.com/hamalt/scsaver/releases/latest) [![Stars](https://img.shields.io/github/stars/hamalt/scsaver.svg)](https://github.com/hamalt/scsaver/stargazers) [![License](https://img.shields.io/github/license/hamalt/scsaver.svg)](LICENSE)

Web page screensaver JavaScript library.
Beta version.

## Getting Started

### Step1: Load the required files

```html
<link rel="stylesheet" href="src/style.css">
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
