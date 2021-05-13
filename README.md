# Rust Map

A class that extends the basic JS Map with some of the Rust HashMap api's.

## Example

The `entry` method returns an object representing an entry into the map.

### `orInsert`

If the entry does not exist, then the value passed to `orInsert` is returned. It is also inserted into the map for
future accesss.

```javascript
import { RustMap } from "rust-map";

const m = new RustMap();
const v = m.entry("key").orInsert(10);

console.assert(v === 10);
console.assert(m.get("key") === 10);
```

If the entry already exists, then the existing value will be returned.

```javascript
import { RustMap } from "rust-map";

const m = new RustMap();

m.set("key", 40);

const v = m.entry("key").orInsert(10);

console.assert(v === 40);
```

### `orInsertWith`

`orInsertWith` is the same as `orInsert` except that it takes a function that returns the value to insert. It won't call
the function if the entry already existed. This is ideal for situations where calculate for the default value is complex.

```javascript
import { RustMap } from "rust-map";

function reallyComplicatedCalculation() {
    // Lots of code...
    return "value";
}

const m = new RustMap();

// Bad!
// const v = m.entry("key").orInsert(reallyComplicatedCalculation());

// Good!
const v = m.entry("key").orInsertWith(reallyComplicatedCalculation);
```

`orInsertWith` can also accept function arguments if your calculation requires arguments

```javascript
import { RustMap } from "rust-map";

function calculationWithArguments(numberOfGeeseInTheWorld, nameOfTheKing) {
    // lots of code...
    return "value";
}

const m = new RustMap();
const v = m.entry("key").orInsertWith(reallyComplicatedCalculation, 100, "Jim Bob");
```

### `orConstruct`

If your map values are classes, you can use `orConstruct` instead of `orInsertWith`. It will call `new` on the type
passed. It also accepts arguments incase your class requires constructor arguments.

```javascript
import { RustMap } from "rust-map";

class MyMapValue {
    constructor(theFirstArgument) {
        // constructor code...
    }
}

const m = new RustMap();
const v = m.entry("key").orConstruct(MyMapValue, "This is the first argument");
```

### `retain`

```javascript
import { RustMap } from "rust-map";

const m = new RustMap([
    ["one", 1],
    ["two", 2],
    ["three", 3],
    ["four", 4],
    ["five", 5],
    ["six", 6],
    ["seven", 7],
]);

console.assert(m.size === 7);

// Remove all the entries that have odd values.
m.retain((_key, value) => value % 2 === 0);

console.assert(m.size === 3);
```
