---
sidebar_label: Options
sidebar_position: 3
title: Options | Scsaver.js Documents
description: About Scsaver.js options.
keywords: [Scsaver.js, Options]
---

# Options

## Default options

```javascript
defaults = {
  waitTime: 3200,
  events: ['keydown', 'mousemove', 'touchstart', 'click'],
  doInterval: 200,
  showFadeTime: 1000,
  hideFadeTime: 1000,
  autoStart: true,
  progressBar: false,
  progressBarParent: null,
  on: null,
  debug: false,
};
```

## waitTime

Waiting time for the screen saver to appear.  
Specify in milliseconds.

default: `3200`

## events

Specify the events that cancel the waiting state or display state of the screen saver.

default: `['keydown', 'mousemove', 'touchstart', 'click']`


## doInterval

Consider frequently occurring events such as `mousemove` and `scroll`, and specify the event occurrence interval in milliseconds.

default: `200`

## showFadeTime / hideFadeTime

Specify the fade animation in milliseconds when the screen saver is displayed or hidden.

default: `300`

## autoStart

Specifies whether to automatically enter the wait state immediately after the Scsaver is initialized.

default: `true`

## progressBar

Displays a progress bar that shows the waiting status until the screen saver is showed.

default: `false`

## progressBarParent

Specify the parent element of the progress bar. If specified, the class `.is-child` will be assigned and the CSS of `position: absolute` will be applied.  
If not specified, the progress bar is appended to the `<body>`.

default: `null`

## on

You can specify the function to be executed in various events.  
[Events is here.](/docs/events.md)

default: `null`

## debug

Immature option. When you cancel a promise such as waiting or fading, it will be spit out to the console log.

default: `false`
