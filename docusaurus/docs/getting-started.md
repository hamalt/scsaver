---
sidebar_label: Getting Started
sidebar_position: 2
title: Getting Started | Scsaver.js Documents
# description: 
# image: 
keywords: [Scsaver.js, Getting Started]
---

# Getting Started

## Step0: Build the file

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

## Step1: Load the required files

```html
<link rel="stylesheet" href="src/scsaver.css">
<script src="dist/scsaver.min.js"></script>
```

## Step2: Added Scsaver element

```html
<div id="scsaver" class="scsaver">
  <div class="scsaver-inner">
    <p>Hello, Scsaver.</p>
    <!-- Customize: Place images and videos and customize them to your liking. -->
  </div>
</div>
```

## Step3: Init Scsaver

```html
<script>
  const scsaver = new Scsaver('#scsaver');
</script>
```
