#  Essage

A more elegant way to show message.

## Installaion

```
npm i --save sune-essage
```

## Usage

**show(message, duration)** show message

```js
// The argument message can be html(string)
Essage.show('<b>Hello</b>, I am a message.')

// Or an object:
const message = {
 message: 'message body',
 status: 'success',
 placement: 'bottom'
}

Essage.show(message, 3000)
```

**hide()** hide message

```js
Essage.hide()
```

## Licence

Licensed under MIT. [liccese.txt](./license.txt)
