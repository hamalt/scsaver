## Getting Started

### Step1: Load the required files

```html
<link rel="stylesheet" href="src/style.css">
<script src="dist/scsaver.min.js"></script>
```

### Step2: Added Scsaver element

```html
<div id="scsaver" class="scsaver">
  <div class="scsaver__inner">
    <p>On Screensaver</p>
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