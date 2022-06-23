# Accessor-TS

In TypeScript, there are two supported methods getter and setter to access and set the class members. The greater method control over how a member is accessed on each object.

when you define accessor you should have to be sure that your decorator access to which parameter in your class.

for example:

**code:**

```js
class Product {

    @Log
    private _price: number
    title: string //! that's other propertyName but this is shown when be closest to @Log

    constructor ( t: string, p: number ) {
        this.title = t
        this._price = p
    }


    set price ( val: number ) {
        if ( val > 0 ) this._price = val
        else throw new Error( 'Invalid price - should be positive!' )
    }



    getPriceWithTax ( tax: number ) {
        return this._price * ( 1 + tax )
    }

}

```

when you define your decorator like:

**code:**

```js
function Log(target: any, name: string | symbol) {
  console.log("Property decorator:");
  console.log(target);
  console.log(name);
}
```

- you can access to target (which in include all functions in your class, constructor too)
- also you can get name of closest property of decorator assigned to this like:

  **code:**

```js
    private _price: number
```

private environment variable called `_price`.

we can define other accessor method named: `Log2` like that:

**code:**

```js
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Access decorator:");
  console.log(target);
  console.log(name);
  console.log(descriptor, "2");
}
```

and define it before `set price` like that:

**code:**

```js
class Product {
    @Log
    private _price: number
    title: string //! that's other propertyName but this is shown when be closest to @Log

    constructor ( t: string, p: number ) {
        this.title = t
        this._price = p
    }

    @Log2
    set price ( val: number ) {
        if ( val > 0 ) this._price = val
        else throw new Error( 'Invalid price - should be positive!' )
    }



    getPriceWithTax ( tax: number ) {
        return this._price * ( 1 + tax )
    }
}
```

in vanilla javascript we have `PropertyDescriptor`.
a `PropertyDescriptor` describes a property on an Object. Any JavaScript object can be used as a PropertyDescriptor where unspecified properties will be treated as undefined or false.

`PropertyDescriptor` has above keys.

- configurable (boolean)
- enumerable (boolean)
- get (getFunction)
- set (setFunction)
- value (object)
- writable (boolean)

## Configurable

if configurable key sets to true, `PropertyDescriptor` can be changed later. `Object.freeze()` and `Object.seal()` methods for ways to set configurable to false on all properties on an object.

**code:**

```js
var x = {};
Object.defineProperty(x, "foo", {
  value: 1,
  writable: false,
  enumerable: true,
  configurable: false,
});

try {
  // Attempt to override non-configurable property descriptor
  Object.defineProperty(x, "foo", {
    value: 1,
    writable: true,
    enumerable: true,
    configurable: false,
  });
} catch (e) {
  console.log("Error:");
  console.log(e);
}
```

description above code:
<br>
we defined object `x`. when we define configurable property 'false', we can't redefined selected property and change it!

<span style="color: red"> - The following lines are for those who are not very familiar with the two methods mentioned</span>

### Object.freeze()

when for an object we set this method (like method name), it freeze the object and we can't add or change property or key | value in the object after definition them like below code:

**code:**

```js
var x = { foo: 1 };
Object.freeze(x);
x.foo = 3;
console.log(x.foo); // 1
x.bar = 1;
console.log(x.bar); // undefined
```

### Object.seal()

this method is very similar to the freeze method, except that, we can change property in an object but we can't `add` property to an object after definition Object.seal() to current object.

**code:**

```js
var x = { foo: 1 };
Object.seal(x);
x.foo = 3;
console.log(x.foo); //3
x.bar = 1;
console.log(x.bar); //undefined
```

## Enumerable

**code:**

```js
var x = { foo: 1 };
Object.defineProperty(x, "bar", {
  value: 2,
  writable: true,
  enumerable: false,
  configurable: true,
});

// 'foo' is enumerable. 'bar' in not enumerable
for (var propertyName in x) {
  console.log(propertyName + " is " + x[propertyName]);
}
```

when we define enumerable property to 'true', we accessed during for <span style="color: green">propertyName</span> in object. so for this reason, I draw your attention to the following method:

<br>

### propertyIsEnumerable()

with this <span style="color: pink">inside</span> function we can set which properties can be counted in the object we defined.

**code:**

```js
var x = { foo: 1 };
Object.defineProperty(x, "bar", {
  value: 2,
  writable: true,
  enumerable: false,
  configurable: true,
});
console.log(x.propertyIsEnumerable("foo")); // true
console.log(x.propertyIsEnumerable("bar")); // false

for (var propertyName in x) /* propertyName is key in object x */ {
  console.log(propertyName + " is " + x[propertyName]); //foo is 1
}
```

if we do that, we let the decorator know that "hey let me target, name, description of price accessor".
so decorator passes these:

**code:**

```js
{ constructor, getPriceWithTax, set price }
price
{ get: undefined, enumerable: false, configurable: true, set: ƒ }
```

we can deduce this from the above lines:
