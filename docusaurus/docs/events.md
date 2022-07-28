---
sidebar_label: Events
sidebar_position: 5
title: Events | Scsaver.js Documents
# description: 
# image: 
keywords: [Scsaver.js, Events]
---

# Events

A description of the event.

## How to use

There are two ways:

1. Set as an option
2. Method using `on()`

### Set as an option

```javascript
const option = {
  on: {
      waitStart: function() {
          console.log('Wait start.');
      },
      showStart: function() {
          console.log('Show start.');
      },
  }
}
const scsaver = new Scsaver('.scsaver', option);
```

### Method using `on()`

Instantiate it once and then use it:

```javascript
const scsaver = new Scsaver('.scsaver');

scsaver.on('waitStart', function() {
    console.log('Wait start.');
});
```

## Event list

### `waitStart`

Fires when the wait state is started.  
Next, wait with [`Promise`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Promise ':target=_blank') until the screen saver is displayed, and when the wait is completed, use `show()` to fade in the screen saver.

### `showStart`
Fires when the show state is started.  
Fade-in will start, and after it is completed, it will move to the `ShowFadeInComplete` state.

### `showFadeInComplete`
Fires after the screen saver fades in.  
This state will continue unless a cancel event occurs.

### `hideStart`

Fires when the screen saver cancel event occurs.  
Fade-out will start, and after it is completed, it will move to the `HideFadeOutComplete` state.

### `HideFadeOutComplete`

Fires after the screen saver fades out.  
Immediately after completion, it will be in Wait state and fire the `waitStart` event.

## Other events

If you want an event that is not here, please create a [pull request](https://github.com/hamalt/scsaver/pulls ':target=_blank') or [issue](https://github.com/hamalt/scsaver/issues ':target=_blank').
