## shortcutkeyReact

```javascript
import React from 'react'
import useKeyboardShortcut from 'use-keyboard-shortcut'

const App = () => {
  const { flushHeldKeys } = useKeyboardShortcut(
    ["Shift", "H"],
    shortcutKeys => console.log("Shift + H has been pressed."),
    { 
      overrideSystem: false,
      ignoreInputFields: false, 
      repeatOnHold: false 
    }
  );

  return (
    <div>Hello World</div>
  )
}
```

### Documentation
```javascript
const { flushHeldKeys } = useKeyboardShortcut(shortcutArray, callback, options)
```
| Hook Return | Type | Description |
|--------------|-----------|------------|
| `flushHeldKeys` | `Function` | Function to flush the array of held keys used for keydown tracking. This can help fixing "stuck" keys. |

| Hook Parameter | Type | Description |
|--------------|-----------|------------|
| `shortcutArray` | `Array` | Array of `KeyboardEvent.key` strings. A full list of strings can be seen [here](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) |
| `callback` | `Function` | Function that is called once the keys have been pressed. |
| `options` | `Object` | Object containing some configuration options. [See options section](https://github.com/arthurtyukayev/use-keyboard-shortcut#options) |

### Options

A list of possible options to put in the options object passed as the third parameters to the hook.

| Option | Default | Description |
|--------------|-----------|------------|
| `overrideSystem` | `false` | Overrides the default browser behavior for that specific keyboard shortcut. [See caveats section](https://github.com/arthurtyukayev/use-keyboard-shortcut#caveats) |
| `ignoreInputFields` | `true` | Allows enabling and disabling the keyboard shortcuts when pressed inside of input fields. |
| `repeatOnHold` | `true` | Determines whether the callback function should fire on repeat when keyboard shortcut is held down. |

