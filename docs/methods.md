# Methods

A description of the method.

## How to use

Instantiate it once and then use it:

```javascript
const scsaver = new Scsaver('.scsaver');
scsaver.disabled();
```

## Method List

From the outside, it is basically assumed that only `enabled()` and `disabled()` are used.  
This is expected to work with external scripts.

### enabled()

Scsaver state change to enabled state.  
Used if the option is [`autoStart: false`](/options.md?id=autoStart) or if the state is disabled by the `disabled()` method.

### disabled()

Scsaver state change to disabled state.  
The cancel event will be unregistered, the wait state will be canceled, and the screen saver will fade out if it is displayed.  
Scsaver will not work unless you execute `enabled()` again.

