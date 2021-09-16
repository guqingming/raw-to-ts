# Raw to TS

### Convert json object to typescript interfaces

# Example

### Code

```javascript
const RawToTs = require('raw-to-ts')

const json = {
  cats: [
    {name: 'Kittin'},
    {name: 'Mittin'}
  ],
  favoriteNumber: 42,
  favoriteWord: 'Hello'
}

RawToTs(json).forEach( typeInterface => {
  console.log(typeInterface)
})
```

### Output:

```typescript
interface Request {
  cats: Cat[];
  favoriteNumber: number;
  favoriteWord: string;
}
interface Cat {
  name: string;
}
```

## Converter
- Array type merging (**Big deal**)
- Union types
- Duplicate type prevention
- Optional types
- Array types

# Setup

```sh
$ npm install --save raw-to-ts
```
